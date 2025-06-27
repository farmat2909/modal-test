import { generateVenueData, generateSchemeData } from './data.js';

export const ITEMS_PER_PAGE = 15;

export let state = {
    currentStep: 1,
    steps: {}
};

export function initializeState() {
    state.steps = {
        1: {
            element: document.getElementById('step1'),
            title: 'Шаг 1: Выбор места проведения',
            tableBody: document.getElementById('venuesTable').querySelector('tbody'),
            pagination: document.getElementById('venuesPagination'),
            data: generateVenueData(497),
            filteredData: [],
            selected: null,
            infoEl: document.getElementById('selectedVenueInfo'),
            filters: { name: '', city: '', type: 'all' }
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
            filters: { type: 'cabinet' }
        }
    };
    state.steps[1].filteredData = state.steps[1].data;
    state.steps[2].filteredData = state.steps[2].data;
}

export function setCurrentStep(step) {
    state.currentStep = step;
}

export function selectItem(stepNum, item) {
    state.steps[stepNum].selected = item;
}

export function deselectItem(stepNum) {
    state.steps[stepNum].selected = null;
}

export function setVenueFilters(filters) {
    state.steps[1].filters = { ...state.steps[1].filters, ...filters };
}

export function setSchemeFilters(filters) {
    state.steps[2].filters = { ...state.steps[2].filters, ...filters };
}