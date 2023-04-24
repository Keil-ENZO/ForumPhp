const textArea = document.getElementById("textArea");
const messageContainer = document.getElementById("message");
const shareBtn = document.getElementById("shareBtn");

function formatDate(date) {
  const daysOfWeek = [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ];
  const monthsOfYear = [
    "janvier",
    "février",
    "mars",
    "avril",
    "mai",
    "juin",
    "juillet",
    "août",
    "septembre",
    "octobre",
    "novembre",
    "décembre",
  ];

  const dayOfWeek = daysOfWeek[date.getDay()];
  const dayOfMonth = date.getDate();
  const monthOfYear = monthsOfYear[date.getMonth()];
  const year = date.getFullYear();
  const hour = date.getHours().toString().padStart(2, "0");
  const minute = date.getMinutes().toString().padStart(2, "0");

  return `${dayOfWeek} ${dayOfMonth} ${monthOfYear} ${year} - ${hour}:${minute}`;
}

// Déclarez la variable currentTopicId en tant que variable globale
let currentTopicId;
window.addEventListener("load", function () {
  function getMessages() {
    const text = textArea.value;
    textArea.value = "";

    if (text === "") {
      return;
    }

    const topics = document.querySelectorAll(".topic");

    topics.forEach((topic) => {
      topic.addEventListener("click", () => {
        currentTopicId = topic.getAttribute("data-id");
        console.log(currentTopicId);
        // Vous pouvez ensuite utiliser la variable currentTopicId pour envoyer les messages à ce sujet
      });
    });

    if (!currentTopicId) {
      // Si aucun sujet n'est sélectionné, affichez un message d'erreur
      alert("Veuillez sélectionner un sujet avant d'envoyer un message.");
      return;
    }

    const message = text;
    const userId = "<?php echo $_SESSION['id'] ?>";
    const pseudo = "<?php echo $_SESSION['pseudo'] ?>";
    const topicId = currentTopicId;

    fetch(
      `http://localhost:8888/ForumPhp/Api/msg.php?message=${message}&user_id=${userId}&pseudo=${pseudo}&topic_id=${topicId}`,
      {
        method: "POST",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          const date = new Date(data.results.date_envoi);
          const dateNow = formatDate(date);
          const pseudo = data.results.pseudo;

          const messages = document.querySelector("#message");
          if (!messages) {
            console.log("L'élément avec l'ID 'messages' n'a pas été trouvé.");
            return;
          }

          messages.insertAdjacentHTML(
            "afterbegin",
            `
    <div class="card">
      <p class="author">${pseudo}</p>
      <p>${text}</p>
      <p class="date">${dateNow}</p>
    </div>
  `
          );
        } else {
          console.log(data.message);
        }
      })
      .catch((error) => {
        console.log("Une erreur est survenue : " + error);
      });
  }

  shareBtn.addEventListener("click", getMessages);
});
