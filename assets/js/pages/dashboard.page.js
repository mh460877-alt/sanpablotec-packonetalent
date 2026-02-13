import { initStars } from '../components/stars.js';
import { $ } from '../utils/dom.js';
import { fetchAllUsers, saveUser, updateUser, saveUserToDB } from '../services/users.service.js';
import { validateAdmin } from '../services/auth.service.js';
import { showMessage } from '../components/toast.js';
import { setItem, getItem, removeItem } from '../utils/storage.js';
import { escapeHtml, normalize } from '../utils/format.js';

const EYE_ICON = `<svg class="icon-eye" viewBox="0 0 24 24" aria-hidden="true"><ellipse cx="12" cy="12" rx="7" ry="5" fill="none" stroke="currentColor" stroke-width="1.8" /><circle cx="12" cy="12" r="2.4" fill="none" stroke="currentColor" stroke-width="1.8" /></svg>`;
const EYE_OFF_ICON = `<svg class="icon-eye" viewBox="0 0 24 24" aria-hidden="true"><ellipse cx="12" cy="12" rx="7" ry="5" fill="none" stroke="currentColor" stroke-width="1.8" /><circle cx="12" cy="12" r="2.4" fill="none" stroke="currentColor" stroke-width="1.8" /><line x1="5" y1="5" x2="19" y2="19" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" /></svg>`;

let users = [];
let filteredUsers = [];
let isEditMode = false;
let editingUsername = null;

const showView = (viewName) => {
  $('#admin-login-view').classList.add('hidden');
  $('#admin-panel-view').classList.remove('hidden');
  if (viewName === 'login') {
    $('#admin-login-view').classList.remove('hidden');
    $('#admin-panel-view').classList.add('hidden');
  }
};

const getSelectedTests = () => {
  const checkboxes = document.querySelectorAll('input[name="test"]:checked');
  return Array.from(checkboxes).map(cb => cb.value);
};

const setSelectedTests = (testsArr) => {
  const set = new Set((testsArr || []).map(String));
  document.querySelectorAll('input[name="test"]').forEach(cb => {
    cb.checked = set.has(String(cb.value));
  });
};

const matchesUser = (user, q) => {
  const qq = normalize(q);
  if (!qq) return true;
  const uname = normalize(user.userName);
  const puesto = normalize(user.puesto);
  const tests = (user.tests || []).map(t => normalize(t)).join(' ');
  const testsLabel = (user.tests || []).map(t => `test ${normalize(t)}`).join(' ');
  return uname.includes(qq) || puesto.includes(qq) || tests.includes(qq) || testsLabel.includes(qq);
};

const applySearch = () => {
  const q = $('#user-search').value;
  filteredUsers = users.filter(u => matchesUser(u, q));
  renderUsers(filteredUsers);
};

const enterEditMode = (user) => {
  isEditMode = true;
  editingUsername = user.userName;
  $('#form-title').textContent = 'Editar usuario';
  $('#form-subtitle').textContent = 'Modifica contraseña, puesto y tests. El usuario (username) no se puede cambiar.';
  $('#edit-indicator').classList.remove('hidden');
  $('#edit-actions').classList.remove('hidden');
  $('#edit-username').textContent = user.userName;
  $('#userName').value = user.userName;
  $('#userName').disabled = true;
  $('#userPassword').value = user.userPassword || '';
  $('#userPassword').type = 'text';
  $('#userPuesto').value = user.puesto && user.puesto !== '-' ? user.puesto : '';
  setSelectedTests(user.tests || []);

  // --- NUEVO: Cargar estado del checkbox Reenvío ---
  const valReenvio = user.reenvio || user.reenvioSimultaneo || user['Reenvío Simultaneo'] || "NO";
  const chkReenvio = $('#chkReenvio');
  if (chkReenvio) {
    chkReenvio.checked = (valReenvio === "SI");
  }
  // -------------------------------------------------

  $('#submit-button').innerHTML = '<span><span class="btn-icon">💾</span> Guardar cambios</span>';
  $('#form-error').textContent = '';
  $('#form-status').textContent = '';
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const exitEditMode = () => {
  isEditMode = false;
  editingUsername = null;
  $('#form-title').textContent = 'Agregar nuevo usuario';
  $('#form-subtitle').textContent = 'Completa los datos para crear un nuevo usuario participante y selecciona los tests que tendrá habilitados.';
  $('#edit-indicator').classList.add('hidden');
  $('#edit-actions').classList.add('hidden');
  $('#edit-username').textContent = '';
  $('#userName').disabled = false;
  $('#user-form').reset();
  setSelectedTests([]);

  // Resetear checkbox
  const chkReenvio = $('#chkReenvio');
  if (chkReenvio) chkReenvio.checked = false;

  $('#submit-button').innerHTML = '<span><span class="btn-icon">＋</span> Guardar usuario</span>';
  $('#form-error').textContent = '';
  $('#form-status').textContent = '';
};

const renderUsers = (list) => {
  const data = Array.isArray(list) ? list : users;
  const tbody = $('#user-table-body');
  tbody.innerHTML = '';
  if (data.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align: center; padding: 2rem; color: rgba(198,201,215,.75);">${users.length === 0 ? 'No hay usuarios registrados aún' : 'No se encontraron resultados'}</td></tr>`;
    const q = $('#user-search').value.trim();
    $('#user-count-text').textContent = users.length === 0 ? '0 usuarios registrados' : `0 resultados de ${users.length}`;
    return;
  }
  data.forEach((user) => {
    const row = document.createElement('tr');
    let testsDisplay = '';
    if (Array.isArray(user.tests) && user.tests.length > 0) {
      testsDisplay = user.tests.map(testNum => `<span class="test-badge test-badge-${escapeHtml(String(testNum))}">Test N°${escapeHtml(String(testNum))}</span>`).join(' ');
    } else {
      testsDisplay = '<span style="opacity: 0.6">Sin asignar</span>';
    }
    row.innerHTML = `
      <td class="col-username">${escapeHtml(user.userName)}</td>
      <td class="col-password">
        <span class="password-mask">••••••••</span>
        <span class="password-text hidden">${escapeHtml(user.userPassword || '')}</span>
        <button type="button" class="btn btn-small btn-eye" data-action="toggle-password" aria-pressed="false" title="Ver contraseña">${EYE_ICON}</button>
      </td>
      <td style="color: rgba(198,201,215,.8); font-size: 0.9rem;">${escapeHtml(user.puesto || '-')}</td>
      <td class="col-tests">${testsDisplay}</td>
      <td class="col-actions">
        <button class="btn btn-small btn-edit" data-action="edit" data-username="${escapeHtml(user.userName)}"><span>Editar</span></button>
      </td>
    `;
    tbody.appendChild(row);
  });
  const q = $('#user-search').value.trim();
  if (q) {
    $('#user-count-text').textContent = `${data.length} resultados de ${users.length}`;
  } else {
    const count = users.length;
    $('#user-count-text').textContent = count === 1 ? '1 usuario registrado' : `${count} usuarios registrados`;
  }
};

export const initDashboardPage = async () => {
  initStars();
  showView('login');

  // Login form
  $('#admin-login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const user = $('#admin-user').value.trim();
    const pass = $('#admin-pass').value.trim();
    $('#login-error').textContent = '';
    try {
      const result = await validateAdmin(user, pass);
      if (result.estado === 'exito' && result.valido) {
        const datosAdmin = result.datos || { nombre: user };
        console.log('✅ Admin validado:', datosAdmin);
        localStorage.setItem('adminData', JSON.stringify(datosAdmin));
        showView('panel');
        showMessage('Bienvenido, Administrador', 'success');
        $('#admin-login-form').reset();
        users = await fetchAllUsers();
        applySearch();
      } else {
        $('#login-error').textContent = result.mensaje || 'Credenciales incorrectas.';
      }
    } catch (error) {
      $('#login-error').textContent = 'Error al conectar con el servidor.';
    }
  });

  $('#back-to-participant').addEventListener('click', () => window.location.href = 'index.html');
  $('#admin-logout').addEventListener('click', () => {
    showView('login');
    showMessage('Sesión cerrada', 'info');
    exitEditMode();
    $('#user-search').value = '';
  });

  // User form
  $('#user-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    $('#form-error').textContent = '';
    $('#form-status').textContent = '';
    const userNameValue = $('#userName').value.trim();
    const userPasswordValue = $('#userPassword').value.trim();
    const userPuestoValue = $('#userPuesto').value.trim();
    const selectedTests = getSelectedTests();

    // --- NUEVO: Capturar valor del checkbox ---
    const chkReenvio = $('#chkReenvio');
    const valorReenvio = (chkReenvio && chkReenvio.checked) ? "SI" : "NO";
    // ------------------------------------------

    if (!userNameValue || !userPuestoValue) {
      $('#form-error').textContent = 'Por favor completa Usuario y Puesto.';
      return;
    }
    if (selectedTests.length === 0) {
      $('#form-error').textContent = 'Debes seleccionar al menos un test habilitado.';
      return;
    }

    // MODO EDICIÓN
    if (isEditMode) {
      const updatePayload = {
        username: editingUsername,
        puesto: userPuestoValue,
        tests: selectedTests,
        reenvio: valorReenvio,
        reenvioSimultaneo: valorReenvio, // ✅ compat
      };

      if (userPasswordValue) updatePayload.password = userPasswordValue;

      $('#submit-button').disabled = true;
      $('#submit-button').textContent = 'Guardando...';
      $('#form-status').textContent = 'Actualizando usuario en Google Sheets...';
      try {
        await updateUser(updatePayload);
        users = await fetchAllUsers();
        applySearch();
        showMessage('Usuario actualizado correctamente', 'success');
        exitEditMode();
      } catch (err) {
        showMessage(err.message || 'Error al actualizar usuario', 'error');
        $('#form-status').textContent = 'Error al actualizar.';
      } finally {
        $('#submit-button').disabled = false;
        $('#submit-button').innerHTML = '<span><span class="btn-icon">💾</span> Guardar cambios</span>';
      }
      return;
    }

    // MODO CREACIÓN
    if (!userPasswordValue) {
      $('#form-error').textContent = 'Por favor completa Contraseña.';
      return;
    }
    const userExists = users.some(u => String(u.userName || '').toLowerCase() === String(userNameValue).toLowerCase());
    if (userExists) {
      $('#form-error').textContent = 'Ya existe un usuario con ese nombre de usuario.';
      return;
    }

    const newUser = {
      username: userNameValue,
      password: userPasswordValue,
      puesto: userPuestoValue,
      tests: selectedTests,
      idAdmin: getItem('adminData')?.id || null,
      reenvio: valorReenvio // Enviamos el valor SI/NO
    };

    $('#submit-button').disabled = true;
    $('#submit-button').textContent = 'Enviando...';
    $('#form-status').textContent = 'Guardando usuario en Google Sheets...';

    try {
      await saveUser(newUser);
    } catch (error) {
      if (error.message.includes('Límite')) {
        showMessage(error.message, 'error');
        $('#form-status').textContent = 'Se alcanzó el límite máximo de usuarios permitidos.';
      } else {
        showMessage('Error al registrar usuario en Google Sheets', 'error');
        $('#form-status').textContent = 'Error al guardar en Google Sheets.';
      }
      $('#submit-button').disabled = false;
      $('#submit-button').innerHTML = '<span><span class="btn-icon">＋</span> Guardar usuario</span>';
      return;
    }

    try {
      const adminData = getItem('adminData');
      let admin = { nombre: 'Desconocido' };
      if (adminData) admin = adminData;

      const userWithExtras = {
        ...newUser,
        pack: 2,
        admin: admin.nombre,
        reenvio: valorReenvio // Para el backup también
      };

      await saveUserToDB(userWithExtras);
      showMessage('Usuario registrado exitosamente', 'success');
      users = await fetchAllUsers();
      $('#user-form').reset();
      setSelectedTests([]);

      if (chkReenvio) chkReenvio.checked = false;

      $('#form-status').textContent = '';
      applySearch();
    } catch (error) {
      showMessage('Error al registrar usuario en la Base de Datos', 'error');
      $('#form-status').textContent = 'Error al guardar en la Base de Datos.';
    } finally {
      $('#submit-button').disabled = false;
      $('#submit-button').innerHTML = '<span><span class="btn-icon">＋</span> Guardar usuario</span>';
    }
  });

  $('#cancel-edit').addEventListener('click', () => {
    exitEditMode();
    showMessage('Edición cancelada', 'info');
  });

  // Search
  $('#user-search').addEventListener('input', applySearch);
  $('#user-search').addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      $('#user-search').value = '';
      applySearch();
    }
  });
  $('#clear-search').addEventListener('click', () => {
    $('#user-search').value = '';
    applySearch();
    $('#user-search').focus();
  });

  // Table delegation
  $('#user-table-body').addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-action="edit"]');
    if (!btn) return;
    const uname = btn.getAttribute('data-username');
    const user = users.find(u => u.userName.toLowerCase() === uname.toLowerCase());
    if (!user) {
      showMessage('No se pudo cargar el usuario para editar', 'error');
      return;
    }
    enterEditMode(user);
  });
  $('#user-table-body').addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-action="toggle-password"]');
    if (!btn) return;
    const row = btn.closest('tr');
    if (!row) return;
    const maskSpan = row.querySelector('.password-mask');
    const textSpan = row.querySelector('.password-text');
    if (!maskSpan || !textSpan) return;
    const isVisible = !textSpan.classList.contains('hidden');
    if (isVisible) {
      textSpan.classList.add('hidden');
      maskSpan.classList.remove('hidden');
      btn.innerHTML = EYE_ICON;
      btn.setAttribute('aria-pressed', 'false');
      btn.setAttribute('title', 'Ver contraseña');
    } else {
      textSpan.classList.remove('hidden');
      maskSpan.classList.add('hidden');
      btn.innerHTML = EYE_OFF_ICON;
      btn.setAttribute('aria-pressed', 'true');
      btn.setAttribute('title', 'Ocultar contraseña');
    }
  });
};