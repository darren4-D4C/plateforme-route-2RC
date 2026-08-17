const STATUS_LABELS = {
    planifie: 'Planifié',
    encours: 'En cours',
    termine: 'Terminé'
};

function openEditModal(event) {
    if (event) event.preventDefault();
    document.getElementById('inputTroncon').value = document.getElementById('tronconValue').textContent;
    document.getElementById('inputEquipe').value = document.getElementById('equipeValue').textContent;
    document.getElementById('editModal')?.classList.add('is-open');
}

function closeEditModal() {
    document.getElementById('editModal')?.classList.remove('is-open');
}

function submitEdit(event) {
    event.preventDefault();
    document.getElementById('tronconValue').textContent = document.getElementById('inputTroncon').value.trim();
    document.getElementById('equipeValue').textContent = document.getElementById('inputEquipe').value.trim();
    addHistoryEntry('Tronçon / équipe réassignés');
    closeEditModal();
    
}

function setStatus(status, btnEl) {
    document.querySelectorAll('.btn-status').forEach(btn => btn.classList.remove('is-current'));
    btnEl.classList.add('is-current');

    const label = document.getElementById('statutLabel');
    if (label) label.textContent = STATUS_LABELS[status] || status;

    addHistoryEntry(`Statut changé : ${STATUS_LABELS[status] || status}`);

    
}

function addHistoryEntry(text) {
    const timeline = document.getElementById('historyTimeline');
    if (!timeline) return;

    const today = new Date().toLocaleDateString('fr-FR');
    const entry = document.createElement('div');
    entry.className = 'history-item';
    entry.innerHTML = `
        <div class="h-dot"></div>
        <div>
            <div class="h-text">${escapeHTML(text)}</div>
            <div class="h-date">${today}</div>
        </div>
    `;
    timeline.appendChild(entry);
}

function escapeHTML(str) {
    if (!str) return '';
    return str.toString().replace(/[&<>'"]/g,
        tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
}