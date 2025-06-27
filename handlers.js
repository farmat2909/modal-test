import { elements } from 'app/dom.js';
import { state, setCurrentStep, selectItem, deselectItem, setVenueFilters, setSchemeFilters } from 'app/state.js';
import { updateStepView, renderTableForStep, updateNextButtonState } from 'app/ui.js';

export function handleRowClick(stepNum, item, rowElement) {
    const step = state.steps[stepNum];

    if (step.selected && step.selected.id === item.id) {
        deselectItem(stepNum);
        step.infoEl.textContent = 'не выбрано';
        rowElement.classList.remove('selected');
    } else {
        selectItem(stepNum, item);
        step.infoEl.textContent = `${item.name} (ID: ${item.id})`;

        const allRows = step.tableBody.querySelectorAll('tr');
        allRows.forEach(row => row.classList.remove('selected'));

        const visibleRow = step.tableBody.querySelector(`tr[data-id='${item.id}']`);
        if (visibleRow) {
            visibleRow.classList.add('selected');
        }
    }

    updateNextButtonState();
}

export function handleVenueLinkClick(item, rowElement) {
    handleRowClick(1, item, rowElement);
    if (state.steps[1].selected) {
        // handleNext();
    }
}

export function handleNext() {
    const maxSteps = Object.keys(state.steps).length;
    if (state.currentStep < maxSteps) {
        setCurrentStep(state.currentStep + 1);
        updateStepView();
        if (state.currentStep === 2) {
            const noSchemesMsg = document.getElementById('noSchemesMessage');
            const schemesContent = document.getElementById('schemesContent');

            if (state.steps[1].selected?.id === 1) {
                noSchemesMsg.classList.remove('visually-hidden');
                schemesContent.classList.add('visually-hidden');
                elements.nextBtn.disabled = true;
            } else {
                noSchemesMsg.classList.add('visually-hidden');
                schemesContent.classList.remove('visually-hidden');
                applySchemeFilters();
            }
        }
    } else {
        alert(`Завершено! \nМесто: ${state.steps[1].selected.name}\nСхема: ${state.steps[2].selected.name}`);
        elements.modal.style.display = 'none';
    }
}

export function handleBack() {
    if (state.currentStep > 1) {
        setCurrentStep(state.currentStep - 1);
        updateStepView();
        resetState();
    }
}

export function applyVenueFilters() {
    const step = state.steps[1];
    const { name, city, type } = step.filters;

    step.filteredData = step.data.filter(venue => {
        const nameMatch = venue.name.toLowerCase().includes(name.toLowerCase());
        const cityMatch = venue.city.toLowerCase().includes(city.toLowerCase());
        const typeMatch = (type === 'all') || (type === 'typical' && venue.isTypical);
        return nameMatch && cityMatch && typeMatch;
    });

    if (step.selected && !step.filteredData.find(v => v.id === step.selected.id)) {
        deselectItem(1);
        step.infoEl.textContent = 'не выбрано';
    }

    renderTableForStep(1, 1);
    updateNextButtonState();
}

export function applySchemeFilters() {
    const step = state.steps[2];
    const { type } = step.filters;

    step.filteredData = step.data.filter(scheme => {
        return (type === 'all') || (type === 'cabinet' && scheme.isPersonal);
    });

    if (step.selected && !step.filteredData.find(s => s.id === step.selected.id)) {
        deselectItem(2);
        step.infoEl.textContent = 'не выбрано';
    }

    renderTableForStep(2, 1);
    updateNextButtonState();
}

export function resetState() {
    setCurrentStep(1);
    Object.values(state.steps).forEach((step, index) => {
        deselectItem(index + 1);
        step.infoEl.textContent = 'не выбрано';
    });

    setVenueFilters({ name: '', city: '', type: 'all' });
    elements.venueNameFilter.value = '';
    elements.venueCityFilter.value = '';
    document.querySelector('input[name="venueType"][value="all"]').checked = true;

    setSchemeFilters({ type: 'cabinet' });
    document.querySelector('input[name="schemeType"][value="cabinet"]').checked = true;

    document.getElementById('noSchemesMessage')?.classList.add('visually-hidden');
    document.getElementById('schemesContent')?.classList.remove('visually-hidden');

    applyVenueFilters();
    updateStepView();
}