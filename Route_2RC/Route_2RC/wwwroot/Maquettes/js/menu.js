function toggleMenu() { document.body.classList.toggle('menu-open'); }

function closeMenu() { document.body.classList.remove('menu-open'); }

function openModal(id) { const m = document.getElementById(id); if (m) m.classList.add('is-open'); }

function closeModal(id) {

&#x20;   const m = document.getElementById(id);

&#x20;   if (!m) return;

&#x20;   m.classList.remove('is-open');

&#x20;   const f = m.querySelector('form');

&#x20;   if (f) f.reset();

}

function addRow(event, tableId, modalId) {

&#x20;   event.preventDefault();

&#x20;   const form = event.target;

&#x20;   const fields = form.querySelectorAll('input, select, textarea');

&#x20;   const tbody = document.querySelector('#' + tableId + ' tbody');

&#x20;   if (!tbody) return;

&#x20;   const tr = document.createElement('tr');

&#x20;   fields.forEach(function (f, i) {

&#x20;       const td = document.createElement('td');

&#x20;       if (i === 0) td.className = 'strong';

&#x20;       td.textContent = f.value;

&#x20;       tr.appendChild(td);

&#x20;   });

&#x20;   const act = document.createElement('td');

&#x20;   act.className = 'text-right';

&#x20;   act.innerHTML = '<a href="#" class="action-delete" onclick="removeRow(event, this)">Supprimer</a>';

&#x20;   tr.appendChild(act);

&#x20;   tbody.appendChild(tr);

&#x20;   form.reset();

&#x20;   if (modalId) closeModal(modalId);

}

function removeRow(event, el) {

&#x20;   event.preventDefault();

&#x20;   if (confirm('Supprimer cette ligne ?')) el.closest('tr').remove();

}

document.addEventListener('DOMContentLoaded', function () {

&#x20;   document.querySelectorAll('.sidebar .nav-link, .sidebar .logout').forEach(function (link) {

&#x20;       link.addEventListener('click', closeMenu);

&#x20;   });

});
