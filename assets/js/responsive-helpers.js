/**
 * RESPONSIVE TABLE + SCROLL-TO-FORM HELPER v2
 * =============================================
 *
 * 1. Agrega `data-label` a cada <td> para el layout de tarjetas móvil
 * 2. En móvil, al hacer click en "Editar", hace scroll automático al formulario
 *
 * INTEGRACIÓN:
 *   - Agrega este script al HTML: <script src="./assets/js/responsive-helpers.js"></script>
 *   - Llama addTableDataLabels() cada vez que renderizas filas nuevas
 *   - El scroll al editar se engancha automáticamente via event delegation
 */

(function () {
  'use strict';

  /* ───────────────────────────────
     1. DATA-LABEL INJECTION
     ─────────────────────────────── */
  function addTableDataLabels() {
    const table = document.querySelector('.data-table');
    if (!table) return;

    const headers = Array.from(table.querySelectorAll('thead th'));
    const labels = headers.map(th => th.textContent.trim());

    table.querySelectorAll('tbody tr').forEach(row => {
      row.querySelectorAll('td').forEach((td, i) => {
        if (labels[i]) {
          td.setAttribute('data-label', labels[i]);
        }
      });
    });
  }

  /* ───────────────────────────────
     2. SCROLL TO FORM ON EDIT (mobile)
     ─────────────────────────────── */
  const MOBILE_BREAKPOINT = 768;

  function isMobile() {
    return window.innerWidth <= MOBILE_BREAKPOINT;
  }

  function scrollToForm() {
    const formPanel = document.querySelector('.form-panel');
    if (!formPanel) return;

    // Pequeño delay para que el form se actualice con los datos del usuario
    setTimeout(() => {
      formPanel.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });

      // Agregar clase de highlight temporal
      formPanel.classList.add('highlight-scroll');

      // Remover highlight después de la animación
      setTimeout(() => {
        formPanel.classList.remove('highlight-scroll');
      }, 2000);

      // Focus en el primer input del form
      const firstInput = formPanel.querySelector('input:not([type="checkbox"]):not([type="hidden"])');
      if (firstInput) {
        setTimeout(() => firstInput.focus(), 500);
      }
    }, 150);
  }

  // Event delegation: detectar clicks en botones de editar
  function initEditScrollListener() {
    document.addEventListener('click', function (e) {
      if (!isMobile()) return;

      // Buscar si el click fue en un botón de editar (o dentro de él)
      const editBtn = e.target.closest('.btn-edit, [data-action="edit"]');
      if (!editBtn) return;

      // También detectar botones que contengan "Editar" en su texto
      const btnText = editBtn.textContent.trim().toLowerCase();
      if (editBtn.classList.contains('btn-edit') || btnText.includes('editar') || btnText.includes('edit')) {
        scrollToForm();
      }
    });
  }

  /* ───────────────────────────────
     3. INIT
     ─────────────────────────────── */
  function init() {
    addTableDataLabels();
    initEditScrollListener();

    // Observer para re-aplicar data-labels cuando cambie el tbody
    const tbody = document.querySelector('.data-table tbody');
    if (tbody) {
      const observer = new MutationObserver(() => {
        addTableDataLabels();
      });
      observer.observe(tbody, { childList: true, subtree: true });
    }
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose globally for manual use
  window.addTableDataLabels = addTableDataLabels;
  window.scrollToEditForm = scrollToForm;

})();