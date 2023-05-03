document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("#connexion-form");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      const formData = new FormData(event.target);
      const pseudo = document.querySelector("#pseudo").value;
      const mdp = document.querySelector("#mdp").value;

      fetch(
        `http://localhost:8888/ForumPhp/api/connexion.php?pseudo=${pseudo}&mdp=${mdp}`,
        {
          method: "POST",
          body: formData,
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            // Connexion réussie
            // message.innerHTML = data.message;
            document.getElementById("pseudo").value = "";
            document.getElementById("mdp").value = "";
            window.location.href =
              "http://localhost:8888/ForumPhp/pages/conversation";
          } else {
            // Erreur de connexion
            console.error(data.message);
            document.querySelector("#message").textContent = data.message;
          }
        })
        .catch((error) => {
          console.error(error);
        });
    });
  }
});
