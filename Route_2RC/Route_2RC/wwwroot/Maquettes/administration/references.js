window.addEventListener('DOMContentLoaded', () => {
    ['degradation', 'materiau', 'engin'].forEach(updateEmptyState);
});

function switchTab(tab) {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.toggle('is-active', btn.getAttribute('data-tab') === tab);
    });
    document.querySelectorAll('.tab-panel').forEach(panel => {
        panel.classList.toggle('is-active', panel.id === `panel-${tab}`);
    });
}

function openModal(name) {
    document.getElementById(`modal-${name}`)?.classList.add('is-open');
}

function closeModal(name) {
    document.getElementById(`modal-${name}`)?.classList.remove('is-open');
}

function submitDegradation(event) {
    event.preventDefault();
    const libelle = document.getElementById('degLibelle').value.trim();
    const description = document.getElementById('degDescription').value.trim();
    if (!libelle || !description) return;

    addRow('degradation', `
        <td class="user-name">${escapeHTML(libelle)}</td>
        <td class="user-matricule">${escapeHTML(description)}</td>
        <td class="text-right">${actionLinks('degradation')}</td>
    `);
    event.target.reset();
    closeModal('degradation');
}

function submitMateriau(event) {
    event.preventDefault();
    const nom = document.getElementById('matNom').value.trim();
    const unite = document.getElementById('matUnite').value;
    const cout = document.getElementById('matCout').value;
    if (!nom || !cout) return;

    addRow('materiau', `
        <td class="user-name">${escapeHTML(nom)}</td>
        <td class="user-matricule">${escapeHTML(unite)}</td>
        <td class="user-matricule">${Number(cout).toLocaleString('fr-FR')}</td>
        <td class="text-right">${actionLinks('materiau')}</td>
    `);
    event.target.reset();
    closeModal('materiau');
}

function submitEngin(event) {
    event.preventDefault();
    const nom = document.getElementById('engNom').value.trim();
    const type = document.getElementById('engType').value.trim();
    const cout = document.getElementById('engCout').value;
    if (!nom || !type || !cout) return;

    addRow('engin', `
        <td class="user-name">${escapeHTML(nom)}</td>
        <td class="user-matricule">${escapeHTML(type)}</td>
        <td class="user-matricule">${Number(cout).toLocaleString('fr-FR')}</td>
        <td class="text-right">${actionLinks('engin')}</td>
    `);
    event.target.reset();
    closeModal('engin');
}

function actionLinks(name) {
    return `<a href="#" class="action-link">Modifier</a> | <a href="#" class="action-delete" onclick="removeRow(event, this, '${name}')">Supprimer</a>`;
}

function addRow(name, innerHtml) {
    const tbody = document.getElementById(`table-${name}`);
    if (!tbody) return;
    const row = document.createElement('tr');
    row.innerHTML = innerHtml;
    tbody.appendChild(row);
    updateEmptyState(name);
}

function removeRow(event, linkEl, name) {
    event.preventDefault();
    if (!confirm('Retirer cette ligne ?')) return;
    linkEl.closest('tr')?.remove();
    updateEmptyState(name);
}

function updateEmptyState(name) {
    const tbody = document.getElementById(`table-${name}`);
    const msg = document.querySelector(`.empty-msg[data-for="${name}"]`);
    if (!tbody || !msg) return;
    msg.style.display = tbody.querySelectorAll('tr').length === 0 ? 'block' : 'none';
}

function escapeHTML(str) {
    if (!str) return '';
    return str.toString().replace(/[&<>'"]/g,
        tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
}