import { elements } from 'app/dom.js';
import { initializeState } from 'app/state.js';
import { attachEventListeners } from 'app/events.js';
import { resetState } from 'app/handlers.js';

let previewedScheme = null;
export const getPreviewedScheme = () => previewedScheme;
export const setPreviewedScheme = (scheme) => {
    previewedScheme = scheme;
};

document.addEventListener('DOMContentLoaded', () => {
    initializeState();

    elements.openModalBtn.addEventListener('click', () => {
        elements.modal.style.display = 'block';
        resetState();
    });

    attachEventListeners();
});

