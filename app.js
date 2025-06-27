import { elements } from 'app/dom.js';
import { initializeState } from 'app/state.js';
import { attachEventListeners } from 'app/events.js';
import { resetState } from 'app/handlers.js';

document.addEventListener('DOMContentLoaded', () => {
    initializeState();

    elements.openModalBtn.addEventListener('click', () => {
        elements.modal.style.display = 'block';
        resetState();
    });

    attachEventListeners();
});

