import { initStars } from '../components/stars.js';
import { $ } from '../utils/dom.js';
import { fetchAllUsers } from '../services/users.service.js';
import { validateUser } from '../services/auth.service.js';
import { setItem, getItem, removeItem } from '../utils/storage.js';

let currentUser = null;

const showPanel = (user) => {
  currentUser = user;
  $('#login-view').classList.add('hidden');
  $('#panel-view').classList.remove('hidden');
  const userName = user.userName || 'Usuario';
  const userPuesto = user.puesto || '';
  $('#user-name-pill').textContent = userName;
  $('#user-greeting').textContent = `${userName}${userPuesto !== '-' ? ' - ' + userPuesto : ''}, aquí están tus evaluaciones habilitadas.`;
  let enabledTests = user.tests || [];
  document.querySelectorAll('.eval-card').forEach(card => card.classList.remove('visible'));
  if (enabledTests.length > 0) {
    enabledTests.forEach(testNumber => {
      const testCard = $(`#test-${testNumber}`);
      if (testCard) testCard.classList.add('visible');
    });
    $('#no-tests-message').style.display = 'none';
  } else {
    $('#no-tests-message').style.display = 'block';
  }
};

const showError = (message) => {
  $('#error-message').textContent = message;
  $('#error-message').classList.add('show');
  setTimeout(() => $('#error-message').classList.remove('show'), 5000);
};

const clearSession = () => {
  removeItem('sessionLoggedIn');
  removeItem('sessionUser');
};

const restoreSessionIfAny = () => {
  const logged = getItem('sessionLoggedIn') === '1';
  const raw = getItem('sessionUser');
  if (!logged || !raw) return;
  try {
    showPanel(raw);
  } catch (e) {
    clearSession();
  }
};

export const initUsuariosPage = () => {
  initStars();
  $('#login-view').classList.remove('hidden');
  $('#panel-view').classList.add('hidden');

  $('#login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = $('#username').value.trim();
    const password = $('#password').value.trim();
    if (!username || !password) {
      showError('Por favor completa todos los campos');
      return;
    }
    $('#login-btn').disabled = true;
    $('#login-btn').textContent = 'Verificando...';
    $('#error-message').classList.remove('show');
    $('#loading-message').classList.add('show');
    try {
      const users = await fetchAllUsers();
      const authenticatedUser = validateUser(username, password, users);
      if (authenticatedUser) {
        const sessionUser = {
          userName: authenticatedUser.userName,
          puesto: authenticatedUser.puesto,
          tests: authenticatedUser.tests
        };
        setItem('sessionUser', sessionUser);
        setItem('sessionLoggedIn', '1');
        showPanel(authenticatedUser);
      } else {
        showError('Usuario o contraseña incorrectos');
        $('#login-btn').disabled = false;
        $('#login-btn').innerHTML = '<span>Iniciar sesión</span>';
        $('#loading-message').classList.remove('show');
      }
    } catch (error) {
      showError('Error al conectar con el servidor. Intenta nuevamente.');
      $('#login-btn').disabled = false;
      $('#login-btn').innerHTML = '<span>Iniciar sesión</span>';
      $('#loading-message').classList.remove('show');
    }
  });

  $('#logout-button').addEventListener('click', () => {
    clearSession();
    document.querySelectorAll('.eval-card').forEach(card => card.classList.remove('visible'));
    $('#panel-view').classList.add('hidden');
    $('#login-view').classList.remove('hidden');
    $('#login-form').reset();
    currentUser = null;
    $('#login-btn').disabled = false;
    $('#login-btn').innerHTML = '<span>Iniciar sesión</span>';
    $('#loading-message').classList.remove('show');
    $('#error-message').classList.remove('show');
  });

  $('#back-to-participant').addEventListener('click', () => window.location.href = 'index.html');

  restoreSessionIfAny();
};