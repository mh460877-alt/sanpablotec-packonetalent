export const $ = (selector, context = document) => context.querySelector(selector);
export const $$ = (selector, context = document) => context.querySelectorAll(selector);

export const createEl = (tag, attrs = {}, text = '') => {
  const el = document.createElement(tag);
  Object.keys(attrs).forEach(key => el.setAttribute(key, attrs[key]));
  if (text) el.textContent = text;
  return el;
};

export const on = (element, event, handler, options = {}) => {
  element.addEventListener(event, handler, options);
  return () => element.removeEventListener(event, handler, options);
};

export const delegate = (parent, selector, event, handler) => {
  return on(parent, event, e => {
    const target = e.target.closest(selector);
    if (target) handler.call(target, e);
  });
};

export const toggleClass = (element, className, force) => {
  element.classList.toggle(className, force);
};