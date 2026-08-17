window.addEventListener('DOMContentLoaded', () => updateEmptyState());

function openProfileModal() {
    document.getElementById('profileModal')?.classList.add('is-open');
}

function closeProfileModal() {
    document.getElementById('profileModal')?.classList.remove('is-open');
}

function submitPasswordChange(event) {
    event.preventDefault();
    alert('Mot de passe mis à jour (une fois le backend connecté, ceci enverra une requête sécurisée).');
    event.target.reset();
    closeProfileModal();
}

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
    const email = document.getElementById('inputEmail').value.trim();
    const password = document.getElementById('inputPassword').value;
    const role = document.getElementById('inputRole').value;

    if (!nom || !email || !password) return;

    const tbody = document.getElementById('tableBodyContent');
    const row = document.createElement('tr');
    row.innerHTML = `
        <td class="user-name">${escapeHTML(nom)}</td>
        <td><span class="badge badge-admin-metier">${escapeHTML(role)}</span></td>
        <td class="user-matricule">${escapeHTML(email)}</td>
        <td><span class="badge badge-admin-logistique">En attente d'envoi</span></td>
        <td class="text-right">
            <a href="#" class="action-link">Modifier</a> |
            <a href="#" class="action-delete" onclick="removeRow(event, this)">Supprimer</a>
        </td>
    `;
    tbody.appendChild(row);

    updateEmptyState();
    closeModal();

    alert(`Compte prêt pour ${email}.\nUn identifiant sera généré et envoyé par email avec le mot de passe choisi, dès que le backend sera connecté.`);
}

function removeRow(event, linkEl) {
    event.preventDefault();
    if (!confirm('Retirer ce membre ?')) return;
    linkEl.closest('tr')?.remove();
    updateEmptyState();
}

function updateEmptyState() {
    const tbody = document.getElementById('tableBodyContent');
    const emptyMsg = document.getElementById('emptyStateMsg');
    if (!tbody || !emptyMsg) return;
    emptyMsg.style.display = tbody.querySelectorAll('tr').length === 0 ? 'block' : 'none';
}

function escapeHTML(str) {
    if (!str) return '';
    return str.toString().replace(/[&<>'"]/g,
        tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
}