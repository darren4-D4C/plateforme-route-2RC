function switchTab(tab) {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.toggle('is-active', btn.getAttribute('data-tab') === tab);
    });
    document.querySelectorAll('.tab-panel').forEach(panel => {
        panel.classList.toggle('is-active', panel.id === `panel-${tab}`);
    });
}

function submitTopo(event) {
    event.preventDefault();
    
    showConfirmation();
}

function submitPluvio(event) {
    event.preventDefault();
    
    showConfirmation();
}

function showConfirmation() {
    document.getElementById('panel-topo').classList.remove('is-active');
    document.getElementById('panel-pluvio').classList.remove('is-active');
    document.querySelector('.tab-nav').style.display = 'none';
    document.getElementById('fieldConfirmation').classList.add('is-visible');
}

function resetConfirmation() {
    document.getElementById('topoForm').reset();
    document.getElementById('pluvioForm').reset();
    document.getElementById('fieldConfirmation').classList.remove('is-visible');
    document.querySelector('.tab-nav').style.display = 'flex';
    switchTab('topo');
}