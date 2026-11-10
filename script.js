const form = document.getElementById("download-form");
const statusEl = document.getElementById("form-status");
const submitBtn = form.querySelector("button[type='submit']");

function setStatus(message, type) {
    statusEl.textContent = message;
    statusEl.className = "form-status" + (type ? " " + type : "");
}

form.addEventListener("submit", function(event) {
    event.preventDefault(); // Empêche la redirection vers Formspree

    let formData = new FormData(this);

    submitBtn.disabled = true;
    setStatus("Envoi en cours…");

    // Envoyer les données à Formspree en AJAX
    fetch("https://formspree.io/f/xkgplylv", {
        method: "POST",
        body: formData,
        headers: { "Accept": "application/json" }
    })
    .then(response => {
        if (response.ok) {
            // Télécharger le CV PDF après l'envoi réussi
            let link = document.createElement("a");
            link.href = "cv_joy.pdf";
            link.download = "cv_joy.pdf";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            setStatus("Merci ! Le CV a été téléchargé.", "success");
            form.reset();
        } else {
            setStatus("Une erreur s'est produite. Veuillez réessayer.", "error");
        }
    })
    .catch(() => setStatus("Erreur lors de l'envoi du formulaire.", "error"))
    .finally(() => { submitBtn.disabled = false; });
});
