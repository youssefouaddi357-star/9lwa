document.querySelector("#data-form").addEventListener("submit", function(e) {
  e.preventDefault();

  const myForm = e.target;
  const formData = new FormData(myForm);
  
  fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(formData).toString(),
  })
    .then(() => {
      document.getElementById("response-msg").innerHTML = "Merci ! Vos données ont été envoyées.";
      myForm.reset();
    })
    .catch((error) => alert(error));
});
