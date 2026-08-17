const STATUS_LABELS = {
    nouveau: 'Nouveau',
    encours: 'En cours',
    traite: 'Traité',
    rejete: 'Rejeté'
};

function setStatus(status, btnEl) {
    document.querySelectorAll('.btn-status').forEach(btn => btn.classList.remove('is-current'));
    btnEl.classList.add('is-current');

    const label = document.getElementById('statutLabel');
    if (label) label.textContent = STATUS_LABELS[status] || status;

   
}