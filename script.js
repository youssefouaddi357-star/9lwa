function calculate() {
    let adl = 0;
    document.querySelectorAll('.score-adl').forEach(i => adl += parseInt(i.value || 0));
    document.getElementById('val-adl').innerText = adl;
    document.getElementById('V26').value = adl;

    let fes = 0;
    document.querySelectorAll('.score-fes').forEach(i => fes += parseInt(i.value || 0));
    document.getElementById('val-fes').innerText = fes;
    document.getElementById('V34').value = fes;
}

document.querySelectorAll('.score-adl, .score-fes').forEach(el => el.addEventListener('input', calculate));

document.getElementById('data-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString(),
    }).then(() => {
        document.getElementById('response-msg').innerText = "✅ Succès ! Données enregistrées.";
        this.reset();
        calculate();
    }).catch(error => alert(error));
});

calculate(); // Initialise les scores
