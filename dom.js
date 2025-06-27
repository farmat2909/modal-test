export const elements = {
    // Modal
    openModalBtn: document.getElementById('openModalBtn'),
    modal: document.getElementById('stepperModal'),
    closeBtn: document.querySelector('.close-button'),

    // Stepper
    stepperItem1: document.getElementById('stepper-item-1'),
    stepperCircle1: document.getElementById('stepper-circle-1'),
    stepperItem2: document.getElementById('stepper-item-2'),
    stepperCircle2: document.getElementById('stepper-circle-2'),

    // Steps
    step1: document.getElementById('step1'),
    step2: document.getElementById('step2'),

    // Step 1: Venues
    venueNameFilter: document.getElementById('venueNameFilter'),
    venueCityFilter: document.getElementById('venueCityFilter'),
    venueTypeRadios: document.querySelectorAll('input[name="venueType"]'),
    venuesTableBody: document.getElementById('venuesTable').querySelector('tbody'),
    venuesPagination: document.getElementById('venuesPagination'),
    selectedVenueInfo: document.getElementById('selectedVenueInfo'),

    // Step 2: Schemes
    schemeTypeRadios: document.querySelectorAll('input[name="schemeType"]'),
    schemesTableBody: document.getElementById('schemesTable').querySelector('tbody'),
    schemesPagination: document.getElementById('schemesPagination'),
    selectedSchemeInfo: document.getElementById('selectedSchemeInfo'),

    // Footer
    backBtn: document.getElementById('backBtn'),
    nextBtn: document.getElementById('nextBtn'),
    selectedVenueTitle: document.getElementById('selectedVenueTitle'),
};