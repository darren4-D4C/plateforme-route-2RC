const SUBDIR_LABELS = {
    'Études et Contrôle': 'Chef Études & Contrôle',
    'Operations': 'Chef Opérations',
    'MaterielAppro': 'Chef Matériel & Approvisionnements',
    'AdminBudget': 'Chef Admin. Générale & Budget'
};

window.addEventListener('DOMContentLoaded', () => {
    updateEmptyState();
});


function filterByService(element, category) {
    document.querySelectorAll('.sidebar-item').forEach(el => el.classList.remove('active'));
    element.classList.add('active');

    const rows = document.querySelectorAll('#tableBodyContent tr');
    let visibleCount = 0;

    rows.forEach(row => {
        const rowCat = row.getAttribute('data-category');
        if (category === 'all' || rowCat === category) {
            row.style.display = '';
            visibleCount++;
        } else {
            row.style.display = 'none';
        }
    });

    const subCountEl = document.getElementById('kpiSubCount');
    const adminCountEl = document.getElementById('kpiAdminCount');

    if (category === 'all') {
        if (subCountEl) subCountEl.textContent = '4';
        if (adminCountEl) adminCountEl.textContent = rows.length;
    } else {
        if (subCountEl) subCountEl.textContent = '1';
        if (adminCountEl) adminCountEl.textContent = visibleCount;
    }
}


function filterServices() {
    const input = document.getElementById('serviceFilterInput');
    if (!input) return;
    const query = input.value.toLowerCase();
    const items = document.querySelectorAll('#servicesListContainer .sidebar-item');
    items.forEach(item => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(query) ? 'flex' : 'none';
    });
}


function openNewAdminModal() {
    document.getElementById('newAdminModal')?.classList.add('is-open');
}

function closeNewAdminModal() {
    const modal = document.getElementById('newAdminModal');
    if (!modal) return;
    modal.classList.remove('is-open');
    document.getElementById('createAdminForm')?.reset();
}

function openProfileModal() {
    document.getElementById('profileModal')?.classList.add('is-open');
}

function closeProfileModal() {
    document.getElementById('profileModal')?.classList.remove('is-open');
}


function submitNewAdmin(event) {
    if (event) event.preventDefault();

    const nameInput = document.getElementById('inputAdminName');
    const emailInput = document.getElementById('inputAdminEmail');
    const passwordInput = document.getElementById('inputPassword');
    const subDirSelect = document.getElementById('adminSubDirSelect');
    const serviceInput = document.getElementById('inputAdminService');

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const subDirKey = subDirSelect.value;
    const service = serviceInput.value.trim();

    if (!name || !email || !password || !service) {
        alert("Veuillez remplir tous les champs du formulaire !");
        return;
    }

    const roleLabel = SUBDIR_LABELS[subDirKey] || subDirKey;

    appendAdminRow({ name, email, role: roleLabel, service, category: subDirKey });
    sortAdminTable();
    updateKpis();
    updateEmptyState();
    closeNewAdminModal();

    alert(`Compte prêt pour ${email}.\nUn identifiant sera généré et envoyé par email avec le mot de passe choisi, dès que le backend sera connecté.`);
}


function appendAdminRow(data) {
    const tbody = document.getElementById('tableBodyContent');
    if (!tbody) return;

    const newRow = document.createElement('tr');
    newRow.setAttribute('data-category', data.category);
    newRow.innerHTML = `
        <td class="user-name">${escapeHTML(data.name)}</td>
        <td class="user-matricule">${escapeHTML(data.role)} - ${escapeHTML(data.service)}</td>
        <td class="user-matricule">${escapeHTML(data.email)}</td>
        <td><span class="badge badge-admin-logistique">En attente d'envoi</span></td>
        <td class="text-right">
            <a href="#" class="action-link">Modifier</a> |
            <a href="#" class="action-delete" onclick="deleteAdmin(event, this)">Supprimer</a>
        </td>
    `;
    tbody.appendChild(newRow);
}


function sortAdminTable() {
    const tbody = document.getElementById('tableBodyContent');
    if (!tbody) return;
    const rows = Array.from(tbody.querySelectorAll('tr'));

    rows.sort((a, b) => {
        const nameA = a.querySelector('.user-name')?.textContent.toLowerCase() || '';
        const nameB = b.querySelector('.user-name')?.textContent.toLowerCase() || '';
        return nameA.localeCompare(nameB);
    });

    rows.forEach(row => tbody.appendChild(row));
}


function deleteAdmin(event, linkEl) {
    event.preventDefault();
    if (!confirm("Retirer ce chef de la liste ?")) return;

    const row = linkEl.closest('tr');
    if (row) row.remove();

    updateKpis();
    updateEmptyState();
}


function updateKpis() {
    const tbody = document.getElementById('tableBodyContent');
    const adminCountEl = document.getElementById('kpiAdminCount');
    if (tbody && adminCountEl) {
        adminCountEl.textContent = tbody.querySelectorAll('tr').length;
    }
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