/**
 * RESPONSIVE TABLE HELPER
 * ========================
 * Adds `data-label` attributes to each <td> based on its column header.
 * This enables the CSS mobile card layout where each cell shows its label.
 *
 * USAGE: Call this function every time you render/update the table rows.
 *
 *   addTableDataLabels();
 *
 * Or integrate into your existing row-rendering function.
 */

function addTableDataLabels() {
  const table = document.querySelector('.data-table');
  if (!table) return;

  const headers = Array.from(table.querySelectorAll('thead th'));
  const labels = headers.map(th => th.textContent.trim());

  table.querySelectorAll('tbody tr').forEach(row => {
    row.querySelectorAll('td').forEach((td, index) => {
      if (labels[index]) {
        td.setAttribute('data-label', labels[index]);
      }
    });
  });
}

// Run on DOM ready
document.addEventListener('DOMContentLoaded', addTableDataLabels);

// Also export for manual calls after dynamic table updates
if (typeof window !== 'undefined') {
  window.addTableDataLabels = addTableDataLabels;
}