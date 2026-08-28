function toggleMenu() { document.body.classList.toggle('menu-open'); }

function closeMenu() { document.body.classList.remove('menu-open'); }

function openModal(id) { const m = document.getElementById(id); if (m) m.classList.add('is-open'); }

function closeModal(id) {
    const m = document.getElementById(id);
    if (!m) return;
    m.classList.remove('is-open');
    const f = m.querySelector('form');
    if (f) f.reset();
}

function addRow(event, tableId, modalId) {
    event.preventDefault();
    const form = event.target;
    const fields = form.querySelectorAll('input, select, textarea');
    const tbody = document.querySelector('#' + tableId + ' tbody');
    if (!tbody) return;
    const tr = document.createElement('tr');
    fields.forEach(function (f, i) {
        const td = document.createElement('td');
        if (i === 0) td.className = 'strong';
        td.textContent = f.value;
        tr.appendChild(td);
    });
    const act = document.createElement('td');
    act.className = 'text-right';
    act.innerHTML = '<a href="#" class="action-delete" onclick="removeRow(event, this)">Supprimer</a>';
    tr.appendChild(act);
    tbody.appendChild(tr);
    form.reset();
    if (modalId) closeModal(modalId);
}

function validateLogin(event) {
    const form = event.target;
    let valid = true;
    form.querySelectorAll('.form-input-custom[required]').forEach(function (input) {
        const group = input.closest('.form-group-custom');
        if (!input.value.trim()) {
            valid = false;
            if (group) group.classList.add('has-error');
        } else if (group) {
            group.classList.remove('has-error');
        }
    });
    return valid;
}

function addMember(event, tableId, modalId) {
    event.preventDefault();
    const form = event.target;
    const nom = form.querySelector('#inputNom').value;
    const email = form.querySelector('#inputEmail').value;
    const role = form.querySelector('#inputRole').value;
    const tbody = document.querySelector('#' + tableId + ' tbody');
    if (!tbody) return;
    const tr = document.createElement('tr');
    tr.innerHTML = '<td class="strong">' + nom + '</td><td>' + role + '</td><td>' + email +
        '</td><td><span class="pill pill-done"><span class="icon icon-check-circle"></span> Actif</span></td>' +
        '<td class="text-right"><a href="#" class="action-delete" onclick="removeRow(event, this)">Retirer</a></td>';
    tbody.appendChild(tr);
    const empty = document.getElementById('emptyStateMsg');
    if (empty) empty.style.display = 'none';
    form.reset();
    if (modalId) closeModal(modalId);
}

function detectLocation() {
    const status = document.getElementById('locationStatus');
    const btn = document.getElementById('btnLocate');
    const latInput = document.getElementById('latitude');
    const lonInput = document.getElementById('longitude');
    if (!status || !btn || !latInput || !lonInput) return;

    if (!navigator.geolocation) {
        status.innerHTML = '<span class="icon icon-warning"></span> Géolocalisation non supportée par ce navigateur.';
        return;
    }

    status.innerHTML = '<span class="icon icon-pin"></span> Localisation en cours...';
    btn.disabled = true;

    navigator.geolocation.getCurrentPosition(
        function (position) {
            const lat = position.coords.latitude.toFixed(6);
            const lon = position.coords.longitude.toFixed(6);
            latInput.value = lat;
            lonInput.value = lon;
            status.innerHTML = '<span class="icon icon-check-circle"></span> Position détectée (' + lat + ', ' + lon + ')';
            btn.disabled = false;
        },
        function (error) {
            let message = 'Position non détectée.';
            if (error.code === error.PERMISSION_DENIED) {
                message = 'Localisation refusée. Autorisez l\'accès à la position, ou laissez ce champ vide.';
            } else if (error.code === error.POSITION_UNAVAILABLE) {
                message = 'Position indisponible pour le moment.';
            } else if (error.code === error.TIMEOUT) {
                message = 'La détection a pris trop de temps. Réessayez.';
            }
            status.innerHTML = '<span class="icon icon-warning"></span> ' + message;
            btn.disabled = false;
        },
        { enableHighAccuracy: true, timeout: 10000 }
    );
}

function filterHistorique() {
    const table = document.getElementById('tableBodyContent');
    if (!table) return;
    const search = (document.getElementById('searchInput').value || '').toLowerCase();
    const type = document.getElementById('typeFilter').value;
    table.querySelectorAll('tr').forEach(function (row) {
        const matchesSearch = row.textContent.toLowerCase().includes(search);
        const matchesType = type === 'all' || row.dataset.type === type;
        row.style.display = (matchesSearch && matchesType) ? '' : 'none';
    });
}

function setStatus(btn) {
    const group = btn.closest('.status-actions');
    if (!group) return;
    group.querySelectorAll('.btn-status').forEach(function (b) { b.classList.remove('current'); });
    btn.classList.add('current');

    const label = btn.textContent.trim();
    const statusLine = document.querySelector('.page-head p');
    if (statusLine) {
        statusLine.textContent = statusLine.textContent.replace(/Statut\s*:\s*.+$/, 'Statut : ' + label);
    }
}

function removeRow(event, el) {
    event.preventDefault();
    if (confirm('Supprimer cette ligne ?')) el.closest('tr').remove();
}

document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.sidebar .nav-link, .sidebar .logout').forEach(function (link) {
        link.addEventListener('click', closeMenu);
    });

    const photoInput = document.getElementById('photoInput');
    const photoPreview = document.getElementById('photoPreview');
    if (photoInput && photoPreview) {
        photoInput.addEventListener('change', function () {
            const file = photoInput.files && photoInput.files[0];
            if (!file) {
                photoPreview.style.display = 'none';
                return;
            }
            const reader = new FileReader();
            reader.onload = function (e) {
                photoPreview.src = e.target.result;
                photoPreview.style.display = 'block';
            };
            reader.readAsDataURL(file);
        });
    }

    const reportForm = document.getElementById('reportForm');
    if (reportForm) {
        reportForm.addEventListener('submit', function (event) {
            event.preventDefault();
            if (!reportForm.checkValidity()) {
                reportForm.reportValidity();
                return;
            }
            reportForm.style.display = 'none';
            document.getElementById('reportConfirmation').style.display = 'block';
        });
    }
});