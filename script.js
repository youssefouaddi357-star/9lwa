function updateScores() {
    // Calcul ADL (V26)
    let adl = 0;
    document.querySelectorAll('.adl').forEach(i => adl += parseInt(i.value || 0));
    document.getElementById('res-adl').innerText = adl;
    document.getElementById('V26_hid').value = adl;

    // Calcul FES-I (V34)
    let fes = 0;
    document.querySelectorAll('.fes').forEach(i => fes += parseInt(i.value || 0));
    document.getElementById('res-fes').innerText = fes;
    document.getElementById('V34_hid').value = fes;
}

document.querySelectorAll('.adl, .fes').forEach(el => el.addEventListener('input', updateScores));

document.getElementById('main-survey').addEventListener('submit', function(e) {
    e.preventDefault();
    const status = document.getElementById('status');
    status.innerHTML = "Envoi en cours...";
    
    const formData = new FormData(this);
    fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString(),
    }).then(() => {
        status.innerHTML = "<p style='color:green; text-align:center; padding:20px;'>✅ Rapport envoyé avec succès !</p>";
        this.reset();
        updateScores();
    }).catch(err => status.innerHTML = "❌ Erreur : " + err);
});

updateScores();
