window.addEventListener('DOMContentLoaded', () => {
    updateEmptyState();
});

let sortAsc = {};

function sortBy(colIndex) {
    const tbody = document.getElementById('tableBodyContent');
    if (!tbody) return;
    const rows = Array.from(tbody.querySelectorAll('tr'));

    sortAsc[colIndex] = !sortAsc[colIndex];
    const dir = sortAsc[colIndex] ? 1 : -1;

    rows.sort((a, b) => {
        const valA = a.children[colIndex]?.textContent.trim().toLowerCase() || '';
        const valB = b.children[colIndex]?.textContent.trim().toLowerCase() || '';
        return valA.localeCompare(valB) * dir;
    });

    rows.forEach(row => tbody.appendChild(row));
}

function filterSignalements() {
    const search = document.getElementById('searchInput').value.toLowerCase();
    const statut = document.getElementById('statutFilter').value;
    const rows = document.querySelectorAll('#tableBodyContent tr');

    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        const rowStatut = row.getAttribute('data-statut');
        const matchesSearch = text.includes(search);
        const matchesStatut = statut === 'all' || rowStatut === statut;
        row.style.display = (matchesSearch && matchesStatut) ? '' : 'none';
    });
}

function updateEmptyState() {
    const tbody = document.getElementById('tableBodyContent');
    const emptyMsg = document.getElementById('emptyStateMsg');
    const kpiTotal = document.getElementById('kpiTotal');
    const kpiPending = document.getElementById('kpiPending');
    if (!tbody || !emptyMsg) return;

    const rows = tbody.querySelectorAll('tr');
    emptyMsg.style.display = rows.length === 0 ? 'block' : 'none';

    if (kpiTotal) kpiTotal.textContent = rows.length;
    if (kpiPending) {
        const pending = Array.from(rows).filter(r => r.getAttribute('data-statut') !== 'traite' && r.getAttribute('data-statut') !== 'rejete').length;
        kpiPending.textContent = pending;
    }
}