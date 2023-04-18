const card = document.getElementById("message");
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

// Fonction pour partager un message
function partage() {
  const text = textArea.value;
  textArea.value = "";

  if (text === "") {
    return;
  }

  fetch(`http://localhost:8888/ForumPhp/Api/partage.php?message=${text}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        const date = new Date();
        const dateNow = formatDate(date);
        const pseudo = data.pseudo;

        card.insertAdjacentHTML(
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
        alert(data.message);
      }
    })
    .catch((error) => {
      alert("Une erreur est survenue : " + error);
    });
}

shareBtn.addEventListener("click", partage);
