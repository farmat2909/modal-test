import { elements } from 'app/dom.js';
import { state, setCurrentStep, setVenueFilters, setSchemeFilters } from 'app/state.js';
import { updateStepView } from 'app/ui.js';
import {
    applyVenueFilters,
    applySchemeFilters,
    handleBack,
    handleNext,
} from 'app/handlers.js';

export function attachEventListeners() {
    elements.closeBtn.addEventListener('click', () => {
        elements.modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === elements.modal) {
            elements.modal.style.display = 'none';
        }
    });

    elements.backBtn.addEventListener('click', handleBack);
    elements.nextBtn.addEventListener('click', handleNext);

    // Filter event listeners
    elements.venueNameFilter.addEventListener('input', (e) => {
        setVenueFilters({ name: e.target.value });
        applyVenueFilters();
    });
    elements.venueCityFilter.addEventListener('input', (e) => {
        setVenueFilters({ city: e.target.value });
        applyVenueFilters();
    });
    elements.venueTypeRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            setVenueFilters({ type: e.target.value });
            applyVenueFilters();
        });
    });

    // Scheme filter listener
    elements.schemeTypeRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            setSchemeFilters({ type: e.target.value });
            applySchemeFilters();
        });
    });
}

