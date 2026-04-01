// Calcul des scores
function calculateScores() {
    // ADL
    let adlTotal = 0;
    document.querySelectorAll('.adl-input').forEach(i => adlTotal += parseInt(i.value || 0));
    document.getElementById('adl-result').innerText = adlTotal;
    document.getElementById('hidden-adl').value = adlTotal;

    // FES-I
    let fesTotal = 0;
    document.querySelectorAll('.fes-input').forEach(i => fesTotal += parseInt(i.value || 1));
    document.getElementById('fes-result').innerText = fesTotal;
    document.getElementById('hidden-fes').value = fesTotal;
}

// Écouteurs pour les scores
document.querySelectorAll('.adl-input, .fes-input').forEach(el => {
    el.addEventListener('input', calculateScores);
});

// Envoi Netlify
document.getElementById('data-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString(),
    }).then(() => {
        document.getElementById('response-msg').innerHTML = "✅ Questionnaire envoyé avec succès !";
        this.reset();
        calculateScores();
    }).catch(err => alert(err));
});
