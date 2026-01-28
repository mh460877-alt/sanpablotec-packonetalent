import { initIndexPage } from './pages/index.page.js';
import { initDashboardPage } from './pages/dashboard.page.js';
import { initUsuariosPage } from './pages/usuarios.page.js';

const page = document.body.dataset.page;

if (page === 'index') {
  initIndexPage();
} else if (page === 'dashboard') {
  initDashboardPage();
} else if (page === 'usuarios') {
  initUsuariosPage();
}