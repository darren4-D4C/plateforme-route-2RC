document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');
    if (!form) return;

    form.addEventListener('submit', handleLoginSubmit);
});

function handleLoginSubmit(event) {
    event.preventDefault();

    const identifiant = document.getElementById('identifiant');
    const password = document.getElementById('password');
    let hasError = false;

    identifiant.classList.remove('is-invalid');
    password.classList.remove('is-invalid');

    if (identifiant.value.trim() === '') {
        identifiant.classList.add('is-invalid');
        hasError = true;
    }

    if (password.value.trim() === '') {
        password.classList.add('is-invalid');
        hasError = true;
    }

    if (!hasError) {
        window.location.href = event.target.action;
    }
}
