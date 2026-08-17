document.addEventListener('DOMContentLoaded', () => {
    const photoInput = document.getElementById('photoInput');
    const photoPreview = document.getElementById('photoPreview');
    const form = document.getElementById('reportForm');

    if (photoInput) {
        photoInput.addEventListener('change', () => handlePhotoSelected(photoInput, photoPreview));
    }

    if (form) {
        form.addEventListener('submit', handleReportSubmit);
    }
});


function detectLocation() {
    const statusEl = document.getElementById('locationStatus');
    const btn = document.getElementById('btnLocate');

    if (!navigator.geolocation) {
        statusEl.textContent = "La géolocalisation n'est pas supportée par ce navigateur.";
        statusEl.className = 'location-status is-error';
        return;
    }

    statusEl.textContent = 'Détection en cours...';
    statusEl.className = 'location-status';
    btn.disabled = true;

    navigator.geolocation.getCurrentPosition(
        (position) => {
            const lat = position.coords.latitude.toFixed(6);
            const lng = position.coords.longitude.toFixed(6);
            document.getElementById('latitude').value = lat;
            document.getElementById('longitude').value = lng;
            statusEl.textContent = `Position détectée (${lat}, ${lng})`;
            statusEl.className = 'location-status is-ok';
            btn.disabled = false;
        },
        (error) => {
            statusEl.textContent = "Impossible de détecter votre position. Vérifiez que la localisation est activée.";
            statusEl.className = 'location-status is-error';
            btn.disabled = false;
        },
        { enableHighAccuracy: true, timeout: 10000 }
    );
}


function handlePhotoSelected(input, previewEl) {
    const file = input.files && input.files[0];
    if (!file) {
        previewEl.classList.remove('is-visible');
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        previewEl.src = e.target.result;
        previewEl.classList.add('is-visible');
    };
    reader.readAsDataURL(file);
}


function handleReportSubmit(event) {
    event.preventDefault();

    const typeChosen = document.querySelector('input[name="typeDegradation"]:checked');
    const latitude = document.getElementById('latitude').value;
    const longitude = document.getElementById('longitude').value;
    const photoInput = document.getElementById('photoInput');

    if (!typeChosen) {
        alert('Veuillez choisir un type de dégradation.');
        return;
    }

    if (!latitude || !longitude) {
        alert('Veuillez localiser la dégradation avant d\'envoyer.');
        return;
    }

    if (!photoInput.files || photoInput.files.length === 0) {
        alert('Veuillez ajouter une photo.');
        return;
    }


    document.getElementById('reportForm').style.display = 'none';
    document.getElementById('reportConfirmation').classList.add('is-visible');
}