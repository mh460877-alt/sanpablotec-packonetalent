import { initStars } from '../components/stars.js';
import { initHeaderScroll } from '../components/header.js';
import { initParallax } from '../components/parallax.js';

export const initIndexPage = () => {
  initHeaderScroll();
  initStars();
  initParallax();
};