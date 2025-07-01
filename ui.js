import { elements } from 'app/dom.js';
import { state, ITEMS_PER_PAGE } from 'app/state.js';
import { handleRowClick, handleVenueLinkClick, handlePreviewClick, handleSelectSchemeFromPreview } from 'app/handlers.js';

function toggleCollapsible(fieldset) {
    fieldset.classList.toggle('collapsed');
}

export function updateStepView() {
    const { currentStep, steps, view } = state;
    const schemaPreviewEl = document.getElementById('schemaPreview');

    if (view === 'preview') {
        Object.values(steps).forEach(step => step.element.classList.remove('active'));
        document.getElementById('scheme-test').classList.add('visually-hidden');
        document.getElementById('step-head').classList.add('visually-hidden');
        schemaPreviewEl.classList.add('active');

        elements.stepperItem1.classList.add('completed');
        elements.stepperItem2.classList.add('active');
        elements.nextBtn.style.display = 'none';
        elements.backBtn.style.display = 'inline-block';
        elements.backBtn.textContent = 'Назад к выбору схемы';
    } else { // stepper view
        schemaPreviewEl.classList.remove('active');
        Object.values(steps).forEach(step => step.element.classList.remove('active'));
        steps[currentStep].element.classList.add('active');

        // Update stepper header UI
        if (currentStep === 1) {
            elements.stepperItem1.classList.add('active');
            elements.stepperItem1.classList.remove('completed');
            elements.stepperCircle1.innerHTML = '1';

            elements.stepperItem2.classList.remove('active');
            elements.stepperItem2.classList.remove('completed');
        } else if (currentStep === 2) {
            elements.stepperItem1.classList.remove('active');
            document.getElementById('scheme-test').classList.remove('visually-hidden');
            document.getElementById('step-head').classList.remove('visually-hidden');
            elements.stepperItem1.classList.add('completed');
            elements.stepperCircle1.innerHTML = '✓';

            elements.stepperItem2.classList.add('active');
            if(state.steps[1].selected){
                elements.selectedVenueTitle.textContent = `${state.steps[1].selected.name}`;
                elements.selectedVenueTitle.style.display = 'block';
            } else {
                 elements.selectedVenueTitle.style.display = 'none';
            }
        }

        elements.backBtn.style.display = currentStep === 1 ? 'none' : 'inline-block';
        elements.backBtn.textContent = 'Назад';
        elements.nextBtn.style.display = 'inline-block';
        elements.nextBtn.textContent = currentStep === Object.keys(steps).length ? 'Подтвердить' : 'Далее';
        updateNextButtonState();
    }
}

export function renderTableForStep(stepNum, page = 1) {
    const step = state.steps[stepNum];
    step.tableBody.innerHTML = '';

    const data = step.filteredData;
    const start = (page - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    const paginatedItems = data.slice(start, end);
    let itemIndex = start;

    paginatedItems.forEach(item => {
        const row = document.createElement('tr');
        row.dataset.id = item.id;
        row.classList.add(itemIndex % 2 === 0 ? 'even' : 'odd');
        itemIndex++;

        if (stepNum === 1) {
            row.innerHTML = `<td>${item.region}</td><td>${item.city}</td><td><span class="venue-link">${item.name}</span></td><td>${item.address}</td>`;
            const venueLink = row.querySelector('.venue-link');
            venueLink.addEventListener('click', (e) => {
                e.stopPropagation(); // prevent row click from firing twice
                handleVenueLinkClick(item, row);
            });
        } else if (stepNum === 2) {
             row.innerHTML = `
                <td>${'25.01.2025'}</td>
                <td>${item.hallName}</td>
                <td><span>${item.name}</span></td>
                <td>${item.totalSectors} / ${item.totalSeats}</td>
                <td>– / –</td>
                <td>${item.unnumberedSectors} / ${item.unnumberedSeats}</td>
                <td class="dt-center">${item.usageCount}</td>
                <td><a href="#">Предпросмотр</a></td>
            `;
            const previewLink = row.querySelector('a');
            previewLink.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                handlePreviewClick(item);
            });
        }

        if (step.selected && step.selected.id === item.id) {
            row.classList.add('selected');
        }

        row.addEventListener('click', () => handleRowClick(stepNum, item, row));
        step.tableBody.appendChild(row);
    });

    renderPagination(stepNum, page);
}

export function renderSchemaPreview(item) {
    const container = document.getElementById('schemaPreview');

    container.innerHTML = `
        <div class="popup-container">
            <h3 class="hall-title">${item.name}</h3>
            <div class="preview-content">
                <div class="preview-sectors">
                    <p><strong>Всего мест: 1043</strong></p>
                    <p><strong>Всего нумерованных: 643</strong></p>
                    <p><strong>Всего ненумерованных: 400</strong></p>
                    <fieldset class="collapsible collapsed mtop-20" id="numbered-sectors-fieldset">
                        <legend class="collapse-processed"><a href="#">Нумерованные секторы: 27</a></legend>
                        <div class="fieldset-wrapper">
                            <ul>
                                <li>VIP LINE 2 (2 этаж): 58</li>
                                <li>VIP LINE 3 (3 этаж): 39</li>
                                <li>VIP LINE 4 (4 этаж): 52</li>
                                <li>VIP LINE 1 (2 этаж) Ложа 207: 5</li>
                                <li>Партер: 369</li>
                                <li>... и еще 22</li>
                            </ul>
                        </div>
                    </fieldset>
                    <fieldset class="collapsible collapsed mtop-20" id="unnumbered-sectors-fieldset">
                        <legend class="collapse-processed"><a href="#">Ненумерованные секторы: 3</a></legend>
                        <div class="fieldset-wrapper">
                            <ul>
                                <li>Танцевальный партер 300</li>
                                <li>VIP Terminal 2 входной 50</li>
                                <li>VIP Terminal 3 входной 50</li>
                            </ul>
                        </div>
                    </fieldset>
                </div>
                <div class="preview-schema">
                    <div class="preview-controls">
                        <button class="form-submit" id="zoomOutBtn">Уменьшить</button>
                        <button class="form-submit" id="zoomResetBtn">Оригинал</button>
                        <button class="form-submit" id="zoomInBtn">Увеличить</button>
                        <button class="form-submit select-schema" id="selectSchemaFromPreviewBtn">Выбрать схему зала</button>
                    </div>
                    <div class="schema-map-wrapper">
                        <div class="schema-map">
                            <div id="preview" data-view-mode="PIXELS" style="transform-origin: 0px 0px; transform: scale(0.3); width: 2000px; height: 1382px;">
                                <!-- Seats would be rendered here for a real implementation -->
                                <img src="/schema_map.png" alt="Schema preview" style="width: 100%; height: 100%; object-fit: contain;">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Re-attach event listeners for the new content
    document.getElementById('selectSchemaFromPreviewBtn').addEventListener('click', handleSelectSchemeFromPreview);

    document.querySelectorAll('#schemaPreview fieldset.collapsible legend a').forEach(legendLink => {
        legendLink.addEventListener('click', (e) => {
            e.preventDefault();
            toggleCollapsible(e.target.closest('fieldset'));
        });
    });

    const schemaPreview = document.getElementById('preview');
    let scale = 0.3;

    const updateTransform = () => {
        schemaPreview.style.transform = `scale(${scale})`;
    };

    document.getElementById('zoomInBtn').addEventListener('click', () => {
        scale = Math.min(2, scale + 0.1);
        updateTransform();
    });

    document.getElementById('zoomOutBtn').addEventListener('click', () => {
        scale = Math.max(0.1, scale - 0.1);
        updateTransform();
    });

    document.getElementById('zoomResetBtn').addEventListener('click', () => {
        scale = 0.3;
        updateTransform();
    });

    let isPanning = false;
    let startX, startY, scrollLeft, scrollTop;
    const mapWrapper = container.querySelector('.schema-map-wrapper');
    mapWrapper.style.cursor = 'grab';

    mapWrapper.addEventListener('mousedown', (e) => {
        isPanning = true;
        mapWrapper.style.cursor = 'grabbing';
        startX = e.pageX - mapWrapper.offsetLeft;
        startY = e.pageY - mapWrapper.offsetTop;
        scrollLeft = mapWrapper.scrollLeft;
        scrollTop = mapWrapper.scrollTop;
    });
    mapWrapper.addEventListener('mouseleave', () => { isPanning = false; mapWrapper.style.cursor = 'grab'; });
    mapWrapper.addEventListener('mouseup', () => { isPanning = false; mapWrapper.style.cursor = 'grab'; });
    mapWrapper.addEventListener('mousemove', (e) => {
        if (!isPanning) return;
        e.preventDefault();
        const x = e.pageX - mapWrapper.offsetLeft;
        const y = e.pageY - mapWrapper.offsetTop;
        const walkX = (x - startX) * 2;
        const walkY = (y - startY) * 2;
        mapWrapper.scrollLeft = scrollLeft - walkX;
        mapWrapper.scrollTop = scrollTop - walkY;
    });

}

export function renderPagination(stepNum, currentPage) {
    const step = state.steps[stepNum];
    const data = step.filteredData;
    step.pagination.innerHTML = '';
    const pageCount = Math.ceil(data.length / ITEMS_PER_PAGE);
    if (pageCount <= 1) return;

    const createBtn = (text, page, isDisabled = false, isCurrent = false) => {
        const btn = document.createElement('button');
        btn.textContent = text;
        btn.disabled = isDisabled;
        if (isCurrent) btn.classList.add('active');
        btn.addEventListener('click', () => renderTableForStep(stepNum, page));
        return btn;
    };

    const createSpan = (text) => {
        const span = document.createElement('span');
        span.className = 'ellipsis';
        span.textContent = text;
        return span;
    };

    step.pagination.appendChild(createBtn('Первая', 1, currentPage === 1));
    step.pagination.appendChild(createBtn('Предыдущая', currentPage - 1, currentPage === 1));

    const MAX_PAGES_SHOWN = 5;
    if (pageCount <= MAX_PAGES_SHOWN + 2) {
        for (let i = 1; i <= pageCount; i++) {
            step.pagination.appendChild(createBtn(i, i, false, i === currentPage));
        }
    } else {
        if (currentPage <= MAX_PAGES_SHOWN - 2) {
            for (let i = 1; i <= MAX_PAGES_SHOWN - 1; i++) {
                step.pagination.appendChild(createBtn(i, i, false, i === currentPage));
            }
            step.pagination.appendChild(createSpan('...'));
            step.pagination.appendChild(createBtn(pageCount, pageCount));
        } else if (currentPage > pageCount - (MAX_PAGES_SHOWN - 2)) {
            step.pagination.appendChild(createBtn(1, 1));
            step.pagination.appendChild(createSpan('...'));
            for (let i = pageCount - (MAX_PAGES_SHOWN - 2); i <= pageCount; i++) {
                step.pagination.appendChild(createBtn(i, i, false, i === currentPage));
            }
        } else {
            step.pagination.appendChild(createBtn(1, 1));
            step.pagination.appendChild(createSpan('...'));
            step.pagination.appendChild(createBtn(currentPage - 1, currentPage - 1));
            step.pagination.appendChild(createBtn(currentPage, currentPage, false, true));
            step.pagination.appendChild(createBtn(currentPage + 1, currentPage + 1));
            step.pagination.appendChild(createSpan('...'));
            step.pagination.appendChild(createBtn(pageCount, pageCount));
        }
    }

    step.pagination.appendChild(createBtn('Следующая', currentPage + 1, currentPage === pageCount));
    step.pagination.appendChild(createBtn('Последняя', pageCount, currentPage === pageCount));
}

export function updateNextButtonState() {
    elements.nextBtn.disabled = !state.steps[state.currentStep].selected;
}