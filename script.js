document.addEventListener('DOMContentLoaded', () => {

    // --- DOM Elements ---
    const openModalBtn = document.getElementById('openModalBtn');
    const modal = document.getElementById('stepperModal');
    const closeBtn = document.querySelector('.close-button');
    const backBtn = document.getElementById('backBtn');
    const nextBtn = document.getElementById('nextBtn');
    const modalTitle = document.getElementById('modalTitle');
    const venueNameFilter = document.getElementById('venueNameFilter');
    const venueCityFilter = document.getElementById('venueCityFilter');
    const venueTypeRadios = document.querySelectorAll('input[name="venueType"]');

    // --- Mock Data Generator ---
    const MOCK_VENUES = [
        { id: 1, region: 'Абхазия', city: 'г Сухум', timezone: 'MSK+0 (UTC+3)', name: 'Абхазская государственная филармония имени Р.Д. Гумба', address: 'Сухум, проспект Леона, 18', isTypical: false },
        { id: 2, region: 'Алтайский край', city: 'г Барнаул', timezone: 'MSK+4 (UTC+7)', name: 'HAIRY LEMON PUB', address: 'г Барнаул, ул Лазурная, д 13', isTypical: true },
        { id: 3, region: 'Алтайский край', city: 'г Барнаул', timezone: 'MSK+4 (UTC+7)', name: 'HARATS PUB', address: 'г Барнаул, Красноармейский пр-кт, д 73А', isTypical: true },
        { id: 4, region: 'Алтайский край', city: 'г Барнаул', timezone: 'MSK+4 (UTC+7)', name: 'LIL BRAZIL', address: 'г Барнаул, Красноармейский пр-кт, д 47А', isTypical: true },
        { id: 5, region: 'Алтайский край', city: 'г Барнаул', timezone: 'MSK+4 (UTC+7)', name: 'StandUp Altai club', address: 'г Барнаул, ул Молодежная, д 25Б', isTypical: true },
        { id: 6, region: 'Алтайский край', city: 'г Барнаул', timezone: 'MSK+4 (UTC+7)', name: 'Urban', address: 'Барнаул, ул. 65 лет Победы, 20', isTypical: true },
        { id: 7, region: 'Алтайский край', city: 'г Барнаул', timezone: 'MSK+4 (UTC+7)', name: '«Барнаул Цирк Моретти»', address: 'г Барнаул, пр-кт Строителей, д 117', isTypical: false },
        { id: 8, region: 'Алтайский край', city: 'г Барнаул', timezone: 'MSK+4 (UTC+7)', name: 'АЛТАЙСКИЙ ГОСУДАРСТВЕННЫЙ ИНСТИТУТ КУЛЬТУРЫ', address: 'г. Барнаул, ул. Юрина, д. 277', isTypical: false },
        { id: 9, region: 'Алтайский край', city: 'г Барнаул', timezone: 'MSK+4 (UTC+7)', name: 'АЛТАЙСКИЙ ГОСУДАРСТВЕННЫЙ ИНСТИТУТ КУЛЬТУРЫ (учебный корпус №3)', address: 'г Барнаул, пр-кт Ленина, д 66', isTypical: false },
        { id: 10, region: 'Алтайский край', city: 'г Барнаул', timezone: 'MSK+4 (UTC+7)', name: 'Алтайский государственный краеведческий музей', address: 'г Барнаул, ул Ползунова, д 39', isTypical: false },
        { id: 11, region: 'Алтайский край', city: 'г Барнаул', timezone: 'MSK+4 (UTC+7)', name: 'Алтайский государственный краеведческий музей', address: 'г Барнаул, Красноармейский пр-кт, д 28', isTypical: false },
        { id: 12, region: 'Алтайский край', city: 'г Барнаул', timezone: 'MSK+4 (UTC+7)', name: 'Алтайский государственный музыкальный театр', address: 'г Барнаул, Комсомольский пр-кт, д 108', isTypical: false },
        { id: 13, region: 'Алтайский край', city: 'г Барнаул', timezone: 'MSK+4 (UTC+7)', name: 'Алтайский государственный педагогический университет, историко-краеведческий музей', address: 'г Барнаул, ул Молодежная, д 55', isTypical: false },
        { id: 14, region: 'Алтайский край', city: 'г Барнаул', timezone: 'MSK+4 (UTC+7)', name: 'Алтайский государственный педагогический университет, Музей истории образования им. П.П. Костенкова', address: 'г Барнаул, Социалистический пр-кт, д 126', isTypical: false },
        { id: 15, region: 'Алтайский край', city: 'г Барнаул', timezone: 'MSK+4 (UTC+7)', name: 'Алтайский государственный театр кукол Сказка', address: 'г. Барнаул, ул. Пушкина, д. 41', isTypical: false },
        { id: 16, region: 'Алтайский край', city: 'г Барнаул', timezone: 'MSK+4 (UTC+7)', name: 'Барнаул Цирк Моретти', address: 'г Барнаул, пр-кт Строителей, д 117', isTypical: false },
        { id: 17, region: 'Алтайский край', city: 'г Барнаул', timezone: 'MSK+4 (UTC+7)', name: 'Барнаул Цирк Моретти', address: 'г Барнаул, ул Власихинская, д 67', isTypical: false },
        { id: 18, region: 'Алтайский край', city: 'г Барнаул', timezone: 'MSK+4 (UTC+7)', name: 'Водный театр "Нерпинарий"', address: 'г. Барнаул, Георгия Исакова, 149а к7 (на территории "Арлекино парк")', isTypical: false },
        { id: 19, region: 'Алтайский край', city: 'г Барнаул', timezone: 'MSK+4 (UTC+7)', name: 'Горная Аптека, музей аптечного дела', address: 'г Барнаул, ул Ползунова, д 42', isTypical: false },
        { id: 20, region: 'Алтайский край', city: 'г Барнаул', timezone: 'MSK+4 (UTC+7)', name: 'Государственная филармония Алтайского края', address: 'г. Барнаул, ул. Ползунова, 35', isTypical: false },
    ];

    function generateVenueData(count) {
        const generatedData = [];
        for (let i = 0; i < count; i++) {
            const template = MOCK_VENUES[i % MOCK_VENUES.length];
            generatedData.push({
                ...template,
                id: i + 1,
                name: `${template.name} #${i + 1}`,
                isTypical: Math.random() > 0.5,
            });
        }
        return generatedData;
    }

    function generateSchemeData(count) {
        return Array.from({ length: count }, (_, i) => {
            const id = i + 1;
            const totalSectors = Math.floor(Math.random() * 4) + 1;
            const totalSeats = Math.floor(Math.random() * 2000) + 500;
            const unnumberedSectors = totalSectors;
            const unnumberedSeats = totalSeats;

            return {
                id,
                hallName: '',
                name: `Схема зала ${id}`,
                totalSectors,
                totalSeats,
                numberedSectors: 0,
                numberedSeats: 0,
                unnumberedSectors,
                unnumberedSeats,
                usageCount: Math.floor(Math.random() * 5),
                isPersonal: Math.random() > 0.3,
            };
        });
    }

    function generateMockData(prefix, count, extraFieldsFn) {
        return Array.from({ length: count }, (_, i) => {
            const id = i + 1;
            const extra = extraFieldsFn(id);
            return {
                id,
                name: `${prefix} ${id}`,
                ...extra
            };
        });
    }

    const steps = {
        1: {
            element: document.getElementById('step1'),
            title: 'Шаг 1: Выбор места проведения',
            tableBody: document.getElementById('venuesTable').querySelector('tbody'),
            pagination: document.getElementById('venuesPagination'),
            data: generateVenueData(497 * 2), // Simulate a larger dataset
            filteredData: [],
            selected: null,
            infoEl: document.getElementById('selectedVenueInfo'),
            filters: {
                name: '',
                city: '',
                type: 'all'
            }
        },
        2: {
            element: document.getElementById('step2'),
            title: 'Шаг 2: Выбор схемы зала',
            tableBody: document.getElementById('schemesTable').querySelector('tbody'),
            pagination: document.getElementById('schemesPagination'),
            data: generateSchemeData(45),
            filteredData: [],
            selected: null,
            infoEl: document.getElementById('selectedSchemeInfo'),
            filters: {
                type: 'cabinet'
            }
        }
    };
    steps[1].filteredData = steps[1].data;
    steps[2].filteredData = steps[2].data;

    // --- State ---
    let currentStep = 1;
    const ITEMS_PER_PAGE = 20;

    // --- Core Functions ---
    function updateStepView() {
        Object.values(steps).forEach(step => step.element.classList.remove('active'));
        steps[currentStep].element.classList.add('active');

        modalTitle.textContent = steps[currentStep].title;
        backBtn.style.display = currentStep === 1 ? 'none' : 'inline-block';
        nextBtn.textContent = currentStep === Object.keys(steps).length ? 'Подтвердить' : 'Далее';

        updateNextButtonState();
        if (currentStep === 1) {
            applyVenueFilters();
        } else if (currentStep === 2) {
            applySchemeFilters();
        } else {
            renderTableForStep(currentStep);
        }
    }

    function renderTableForStep(stepNum, page = 1) {
        const step = steps[stepNum];
        step.tableBody.innerHTML = '';

        const data = (stepNum === 1 || stepNum === 2) ? step.filteredData : step.data;
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
                row.innerHTML = `<td>${item.region}</td><td>${item.city}</td><td>${item.timezone}</td><td><a href="#" class="venue-link">${item.name}</a></td><td>${item.address}</td>`;
                const venueLink = row.querySelector('.venue-link');
                venueLink.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleRowClick(1, item, row);
                    // Transition to next step
                    currentStep = 2;
                    updateStepView();
                });
            } else if (stepNum === 2) {
                 row.innerHTML = `
                    <td>${item.hallName}</td>
                    <td><a href="#">${item.name}</a></td>
                    <td>${item.totalSectors} / ${item.totalSeats}</td>
                    <td>– / –</td>
                    <td>${item.unnumberedSectors} / ${item.unnumberedSeats}</td>
                    <td class="dt-center">${item.usageCount}</td>
                    <td><a href="#">Предпросмотр</a></td>
                `;
            } else {
                row.innerHTML = `<td>${item.id}</td><td>${item.name}</td><td>${item.capacity}</td>`;
            }

            if (step.selected && step.selected.id === item.id) {
                row.classList.add('selected');
            }

            row.addEventListener('click', () => handleRowClick(stepNum, item, row));
            step.tableBody.appendChild(row);
        });

        renderPagination(stepNum, page);
    }

    function renderPagination(stepNum, currentPage) {
        const step = steps[stepNum];
        const data = (stepNum === 1 || stepNum === 2) ? step.filteredData : step.data;
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

        // Complex pagination logic
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

    function handleRowClick(stepNum, item, rowElement) {
        const step = steps[stepNum];
        step.selected = item;

        // Update selection info display
        step.infoEl.textContent = `${item.name} (ID: ${item.id})`;

        // Update visual selection in table
        const allRows = step.tableBody.querySelectorAll('tr');
        allRows.forEach(row => row.classList.remove('selected'));
        // Find row in the current view to apply class
        const visibleRow = step.tableBody.querySelector(`tr[data-id='${item.id}']`);
        if(visibleRow) {
            visibleRow.classList.add('selected');
        }

        updateNextButtonState();
    }

    function updateNextButtonState() {
        nextBtn.disabled = !steps[currentStep].selected;
    }

    function applyVenueFilters() {
        const step = steps[1];
        const { name, city, type } = step.filters;

        step.filteredData = step.data.filter(venue => {
            const nameMatch = venue.name.toLowerCase().includes(name.toLowerCase());
            const cityMatch = venue.city.toLowerCase().includes(city.toLowerCase());
            const typeMatch = (type === 'all') || (type === 'typical' && venue.isTypical);
            return nameMatch && cityMatch && typeMatch;
        });

        renderTableForStep(1, 1);
        updateNextButtonState(); // This is needed in case filtering removes a selected item
    }

    function applySchemeFilters() {
        const step = steps[2];
        const { type } = step.filters;

        step.filteredData = step.data.filter(scheme => {
            return (type === 'all') || (type === 'cabinet' && scheme.isPersonal);
        });

        renderTableForStep(2, 1);
        updateNextButtonState();
    }

    function resetState() {
        currentStep = 1;
        Object.values(steps).forEach(step => {
            step.selected = null;
            step.infoEl.textContent = 'не выбрано';
        });
        // Reset filters
        steps[1].filters = { name: '', city: '', type: 'all' };
        venueNameFilter.value = '';
        venueCityFilter.value = '';
        document.querySelector('input[name="venueType"][value="all"]').checked = true;

        steps[2].filters = { type: 'cabinet' };
        document.querySelector('input[name="schemeType"][value="cabinet"]').checked = true;

        updateStepView();
    }

    // --- Event Listeners ---
    openModalBtn.addEventListener('click', () => {
        modal.style.display = 'block';
        resetState();
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    backBtn.addEventListener('click', () => {
        if (currentStep > 1) {
            currentStep--;
            updateStepView();
        }
    });

    nextBtn.addEventListener('click', () => {
        const maxSteps = Object.keys(steps).length;
        if (currentStep < maxSteps) {
            currentStep++;
            updateStepView();
        } else {
            alert(`Завершено! \nМесто: ${steps[1].selected.name}\nСхема: ${steps[2].selected.name}`);
            modal.style.display = 'none';
        }
    });

    // Filter event listeners
    venueNameFilter.addEventListener('input', (e) => {
        steps[1].filters.name = e.target.value;
        applyVenueFilters();
    });
    venueCityFilter.addEventListener('input', (e) => {
        steps[1].filters.city = e.target.value;
        applyVenueFilters();
    });
    venueTypeRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            steps[1].filters.type = e.target.value;
            applyVenueFilters();
        });
    });

    // Scheme filter listener
    document.querySelectorAll('input[name="schemeType"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            steps[2].filters.type = e.target.value;
            applySchemeFilters();
        });
    });
});