/**
 * Pagination Module for Admin Panel
 * 
 * Non-invasive: observes #user-table-body via MutationObserver.
 * When rows are added/removed (by main.js or search), it re-paginates.
 * Does NOT modify the original data or interfere with existing event handlers.
 */
(function () {
  'use strict';

  // --- Config ---
  const STORAGE_KEY = 'admin_rows_per_page';
  let rowsPerPage = parseInt(localStorage.getItem(STORAGE_KEY)) || 10;
  let currentPage = 1;
  let allRows = [];       // all <tr> currently in tbody (source of truth from main.js)
  let visibleRows = [];   // after search filter (subset of allRows)

  // --- DOM refs (resolved on init) ---
  let tbody, container, summary, pagesWrap, prevBtn, nextBtn, perPageSelect, searchInput;

  // ==============================
  // Core pagination logic
  // ==============================

  function collectRows() {
    // Grab ALL rows currently in the tbody (main.js manages these)
    allRows = Array.from(tbody.querySelectorAll('tr'));
    applyFilter();
  }

  function applyFilter() {
    // Check if search input has a value
    const query = searchInput ? searchInput.value.trim().toLowerCase() : '';

    if (!query) {
      visibleRows = [...allRows];
    } else {
      visibleRows = allRows.filter(row => {
        return row.textContent.toLowerCase().includes(query);
      });
    }

    // Clamp current page
    const totalPages = Math.max(1, Math.ceil(visibleRows.length / rowsPerPage));
    if (currentPage > totalPages) currentPage = totalPages;

    render();
  }

  function render() {
    const total = visibleRows.length;
    const totalPages = Math.max(1, Math.ceil(total / rowsPerPage));
    const start = (currentPage - 1) * rowsPerPage;
    const end = Math.min(start + rowsPerPage, total);

    // Hide/show rows
    allRows.forEach(row => row.style.display = 'none');
    for (let i = start; i < end; i++) {
      visibleRows[i].style.display = '';
    }

    // Update summary
    if (total === 0) {
      summary.textContent = 'Sin resultados';
    } else {
      summary.textContent = `Mostrando ${start + 1}–${end} de ${total} usuario${total !== 1 ? 's' : ''}`;
    }

    // Prev / Next state
    prevBtn.disabled = currentPage <= 1;
    nextBtn.disabled = currentPage >= totalPages;

    // Render page buttons
    renderPageButtons(totalPages);

    // Show/hide entire container
    container.classList.toggle('pagination-hidden', allRows.length === 0);
  }

  function renderPageButtons(totalPages) {
    pagesWrap.innerHTML = '';

    if (totalPages <= 1) return;

    // Determine which pages to show (smart ellipsis)
    const pages = buildPageNumbers(currentPage, totalPages);

    pages.forEach(p => {
      if (p === '...') {
        const el = document.createElement('span');
        el.className = 'pagination-ellipsis';
        el.textContent = '…';
        pagesWrap.appendChild(el);
      } else {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'pagination-page-btn' + (p === currentPage ? ' active' : '');
        btn.textContent = p;
        btn.addEventListener('click', () => goToPage(p));
        pagesWrap.appendChild(btn);
      }
    });
  }

  function buildPageNumbers(current, total) {
    // Always show: first, last, current, and neighbours
    if (total <= 7) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    const pages = new Set();
    pages.add(1);
    pages.add(total);
    for (let i = current - 1; i <= current + 1; i++) {
      if (i >= 1 && i <= total) pages.add(i);
    }

    const sorted = [...pages].sort((a, b) => a - b);
    const result = [];

    for (let i = 0; i < sorted.length; i++) {
      if (i > 0 && sorted[i] - sorted[i - 1] > 1) {
        result.push('...');
      }
      result.push(sorted[i]);
    }

    return result;
  }

  function goToPage(page) {
    const totalPages = Math.max(1, Math.ceil(visibleRows.length / rowsPerPage));
    currentPage = Math.max(1, Math.min(page, totalPages));
    render();
  }

  // ==============================
  // Event wiring
  // ==============================

  function init() {
    // Wait for DOM
    tbody = document.getElementById('user-table-body');
    container = document.getElementById('pagination-container');
    summary = document.getElementById('pagination-summary');
    pagesWrap = document.getElementById('pagination-pages');
    prevBtn = document.getElementById('pagination-prev');
    nextBtn = document.getElementById('pagination-next');
    perPageSelect = document.getElementById('rows-per-page');
    searchInput = document.getElementById('user-search');

    if (!tbody || !container) return; // safety

    // Set saved rows-per-page
    if (perPageSelect) {
      perPageSelect.value = rowsPerPage;
      // If the value doesn't exist in options, fall back to 10
      if (perPageSelect.value != rowsPerPage) {
        rowsPerPage = 10;
        perPageSelect.value = 10;
      }
    }

    // Prev / Next
    prevBtn.addEventListener('click', () => goToPage(currentPage - 1));
    nextBtn.addEventListener('click', () => goToPage(currentPage + 1));

    // Rows per page
    perPageSelect.addEventListener('change', () => {
      rowsPerPage = parseInt(perPageSelect.value) || 10;
      localStorage.setItem(STORAGE_KEY, rowsPerPage);
      currentPage = 1;
      applyFilter();
    });

    // Watch search input (existing search may also hide rows, but we override display)
    if (searchInput) {
      searchInput.addEventListener('input', () => {
        currentPage = 1;
        applyFilter();
      });

      // Also watch the clear button
      const clearBtn = document.getElementById('clear-search');
      if (clearBtn) {
        clearBtn.addEventListener('click', () => {
          // Give a tiny delay so main.js can clear the input first
          setTimeout(() => {
            currentPage = 1;
            applyFilter();
          }, 50);
        });
      }
    }

    // MutationObserver: re-collect rows whenever main.js modifies tbody
    const observer = new MutationObserver(() => {
      collectRows();
    });
    observer.observe(tbody, { childList: true, subtree: false });

    // Initial collection
    collectRows();
  }

  // Start when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();