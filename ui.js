import { elements } from 'app/dom.js';
import { state, ITEMS_PER_PAGE } from 'app/state.js';
import { handleRowClick, handleVenueLinkClick } from 'app/handlers.js';



export function updateStepView() {
    const { currentStep, steps } = state;

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
        elements.stepperItem1.classList.add('completed');
        elements.stepperCircle1.innerHTML = '✓';

        elements.stepperItem2.classList.add('active');
    }

    elements.backBtn.style.display = currentStep === 1 ? 'none' : 'inline-block';
    elements.nextBtn.textContent = currentStep === Object.keys(steps).length ? 'Подтвердить' : 'Далее';

    updateNextButtonState();
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
            row.innerHTML = `<td>${item.region}</td><td>${item.city}</td><td>${item.timezone}</td><td><span class="venue-link">${item.name}</span></td><td>${item.address}</td>`;
            const venueLink = row.querySelector('.venue-link');
            venueLink.addEventListener('click', (e) => {
                e.stopPropagation(); // prevent row click from firing twice
                handleVenueLinkClick(item, row);
            });
        } else if (stepNum === 2) {
             row.innerHTML = `
                <td>${item.hallName}</td>
                <td><span>${item.name}</span></td>
                <td>${item.totalSectors} / ${item.totalSeats}</td>
                <td>– / –</td>
                <td>${item.unnumberedSectors} / ${item.unnumberedSeats}</td>
                <td class="dt-center">${item.usageCount}</td>
                <td><a href="#">Предпросмотр</a></td>
            `;
        }

        if (step.selected && step.selected.id === item.id) {
            row.classList.add('selected');
        }

        row.addEventListener('click', () => handleRowClick(stepNum, item, row));
        step.tableBody.appendChild(row);
    });

    renderPagination(stepNum, page);
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
