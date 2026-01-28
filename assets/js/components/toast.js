import { $ } from '../utils/dom.js';

export const showMessage = (message, type = 'info') => {
  const box = $('#message-box');
  if (!box) return;
  box.textContent = message;
  box.className = `show ${type}`;
  setTimeout(() => box.classList.remove('show'), 3000);
};