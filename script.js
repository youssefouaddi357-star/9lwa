function updateCalculations() {
    // Score ADL (V20 à V25 -> Somme dans V26)
    let adlTotal = 0;
    document.querySelectorAll('.adl').forEach(input => {
        adlTotal += parseInt(input.value) || 0;
    });
    document.getElementById('val-v26').innerText = adlTotal;
    document.getElementById('V26_hid').value = adlTotal;

    // Score FES-I (V27 à V33 -> Somme dans V34)
    let fesTotal = 0;
    document.querySelectorAll('.fes').forEach(input => {
        fesTotal += parseInt(input.value) || 0;
    });
    document.getElementById('val-v34').innerText = fesTotal;
    document.getElementById('V34_hid').value = fesTotal;
}

// Écouteurs pour mise à jour en temps réel
document.querySelectorAll('.adl, .fes').forEach(el => {
    el.addEventListener('input', updateCalculations);
});

// Gestion de l'envoi du formulaire via Netlify
document.getElementById('clinical-survey').addEventListener('submit', function(e) {
    e.preventDefault();
    const status = document.getElementById('status');
    status.innerHTML = "<span style='color: #0369a1;'>Transmission sécurisée...</span>";

    const formData = new FormData(this);
    fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString(),
    }).then(() => {
        status.innerHTML = "<div style='background:#dcfce7; color:#166534; padding:15px; border-radius:8px; font-weight:bold;'>✅ Évaluation enregistrée avec succès.</div>";
        this.reset();
        updateCalculations();
    }).catch(error => {
        status.innerHTML = "<div style='color:#991b1b;'>❌ Erreur technique : " + error + "</div>";
    });
});

// Initialisation au chargement
updateCalculations();
