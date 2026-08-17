window.addEventListener('DOMContentLoaded', () => updateEmptyState());

function filterHistorique() {
    const search = document.getElementById('searchInput').value.toLowerCase();
    const type = document.getElementById('typeFilter').value;
    const rows = document.querySelectorAll('#tableBodyContent tr');

    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        const rowType = row.getAttribute('data-type');
        const matchesSearch = text.includes(search);
        const matchesType = type === 'all' || rowType === type;
        row.style.display = (matchesSearch && matchesType) ? '' : 'none';
    });
}

function updateEmptyState() {
    const tbody = document.getElementById('tableBodyContent');
    const emptyMsg = document.getElementById('emptyStateMsg');
    if (!tbody || !emptyMsg) return;

    const rows = tbody.querySelectorAll('tr');
    emptyMsg.style.display = rows.length === 0 ? 'block' : 'none';

    const kpiTopo = document.getElementById('kpiTopo');
    const kpiPluvio = document.getElementById('kpiPluvio');
    if (kpiTopo) kpiTopo.textContent = Array.from(rows).filter(r => r.getAttribute('data-type') === 'topo').length;
    if (kpiPluvio) kpiPluvio.textContent = Array.from(rows).filter(r => r.getAttribute('data-type') === 'pluvio').length;
}