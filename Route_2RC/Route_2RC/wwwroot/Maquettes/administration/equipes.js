window.addEventListener('DOMContentLoaded', () => updateEmptyState());

function openModal() {
    document.getElementById('newModal')?.classList.add('is-open');
}

function closeModal() {
    const modal = document.getElementById('newModal');
    if (!modal) return;
    modal.classList.remove('is-open');
    document.getElementById('newForm')?.reset();
}

function submitNew(event) {
    event.preventDefault();
    const nom = document.getElementById('inputNom').value.trim();
    const zone = document.getElementById('inputZone').value.trim();
    if (!nom || !zone) return;

    const tbody = document.getElementById('tableBodyContent');
    const row = document.createElement('tr');
    row.innerHTML = `
        <td class="user-name">${escapeHTML(nom)}</td>
        <td class="user-matricule">${escapeHTML(zone)}</td>
        <td><span class="badge-active">Active</span></td>
        <td class="text-right">
            <a href="#" class="action-link" onclick="editRow(event, this)">Modifier</a> |
            <a href="#" class="action-delete" onclick="removeRow(event, this)">Supprimer</a>
        </td>
    `;
    tbody.appendChild(row);

    updateKpi();
    updateEmptyState();
    closeModal();
}

function editRow(event, linkEl) {
    event.preventDefault();
    const row = linkEl.closest('tr');
    const cells = row.children;
    document.getElementById('inputNom').value = cells[0].textContent.trim();
    document.getElementById('inputZone').value = cells[1].textContent.trim();

    const form = document.getElementById('newForm');
    form.onsubmit = (e) => {
        e.preventDefault();
        cells[0].textContent = document.getElementById('inputNom').value.trim();
        cells[1].textContent = document.getElementById('inputZone').value.trim();
        form.onsubmit = submitNew;
        closeModal();
    };
    openModal();
}

function removeRow(event, linkEl) {
    event.preventDefault();
    if (!confirm('Retirer cette équipe ?')) return;
    linkEl.closest('tr')?.remove();
    updateKpi();
    updateEmptyState();
}

function updateKpi() {
    const count = document.querySelectorAll('#tableBodyContent tr').length;
    const kpiEl = document.getElementById('kpiCount');
    if (kpiEl) kpiEl.textContent = count;
}

function updateEmptyState() {
    const tbody = document.getElementById('tableBodyContent');
    const emptyMsg = document.getElementById('emptyStateMsg');
    if (!tbody || !emptyMsg) return;
    emptyMsg.style.display = tbody.querySelectorAll('tr').length === 0 ? 'block' : 'none';
    updateKpi();
}

function escapeHTML(str) {
    if (!str) return '';
    return str.toString().replace(/[&<>'"]/g,
        tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
}