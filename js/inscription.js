// const pseudo = document.getElementById("pseudo");
// const email = document.getElementById("email");
// const password = document.getElementById("mdp");
const message = document.getElementById("message");

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("#inscription-form");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      const pseudo = document.querySelector("#pseudo").value;
      const email = document.querySelector("#email").value;
      const password = document.querySelector("#mdp").value;
      fetch(
        `http://localhost:8888/ForumPhp/api/inscription.php?pseudo=${pseudo}&email=${email}&mdp=${password}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            message.innerHTML = data.message;

            document.getElementById("pseudo").value = "";
            document.getElementById("email").value = "";
            document.getElementById("mdp").value = "";
            window.location.href =
              "http://localhost:8888/ForumPhp/pages/Conversation";
          } else {
            message.innerHTML = data.message;
          }
        })
        .catch((error) => console.error(error));
    });
  } else {
    console.error("Formulaire non trouvé !");
  }
});
