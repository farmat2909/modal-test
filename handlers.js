import { elements } from 'app/dom.js';
import { state, setCurrentStep, selectItem, deselectItem, setVenueFilters, setSchemeFilters, setView, ITEMS_PER_PAGE } from 'app/state.js';
import { updateStepView, renderTableForStep, updateNextButtonState, renderSchemaPreview } from 'app/ui.js';
import { setPreviewedScheme, getPreviewedScheme } from 'app/app.js';

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

    if (stepNum === 1 && state.steps[1].selected) {
        const venue = state.steps[1].selected;
        elements.selectedVenueTitle.textContent = `${venue.name}`;
        elements.selectedVenueTitle.style.display = 'block';
    }

    updateNextButtonState();
}

export function handlePreviewClick(item) {
    setPreviewedScheme(item);
    renderSchemaPreview(item);
    setView('preview');
    // document.getElementById('scheme-test').classList.add('visually-hidden');
    // document.getElementById('step-head').classList.add('visually-hidden');
    updateStepView();
}

export function handleSelectSchemeFromPreview() {
    const item = getPreviewedScheme();
    if (!item) return;

    const stepNum = 2;
    const step = state.steps[stepNum];

    // Select the item
    selectItem(stepNum, item);
    step.infoEl.textContent = `${item.name} (ID: ${item.id})`;

    // Calculate which page the selected item is on
    const itemIndex = step.filteredData.findIndex(d => d.id === item.id);
    const page = itemIndex > -1 ? Math.floor(itemIndex / ITEMS_PER_PAGE) + 1 : 1;

    // Switch back to stepper view and update UI
    setView('stepper');
    updateStepView();

    // Render the table on the correct page *after* updating the view
    renderTableForStep(stepNum, page);

    // Update button states
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
    if (state.view === 'preview') {
        setView('stepper');
        updateStepView();
        return;
    }

    if (state.currentStep > 1) {
        setCurrentStep(state.currentStep - 1);
        updateStepView();
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
        elements.selectedVenueTitle.style.display = 'none';
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

    elements.selectedVenueTitle.style.display = 'none';
    setVenueFilters({ name: '', city: '', type: 'all' });
    elements.venueNameFilter.value = '';
    elements.venueCityFilter.value = '';
    document.querySelector('input[name="venueType"][value="all"]').checked = true;

    setSchemeFilters({ type: 'cabinet' });
    document.querySelector('input[name="schemeType"][value="cabinet"]').checked = true;

    applyVenueFilters();
    updateStepView();
}