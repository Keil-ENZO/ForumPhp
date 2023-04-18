const textArea = document.getElementById("textArea");
const card = document.getElementById("message");
const shareBtn = document.getElementById("shareBtn");


// Fonction pour partager un message
function partage() {
  const text = textArea.value;
  textArea.value = "";
  if (text === "") {
    return;
  } else {
    fetch(
      "http://localhost:8888/ForumPhp/Api/partage.php?message=" +
        encodeURIComponent(text)
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          let date = new Date();
          let daysOfWeek = [
            "Dimanche",
            "Lundi",
            "Mardi",
            "Mercredi",
            "Jeudi",
            "Vendredi",
            "Samedi",
          ];
          let dayOfWeek = daysOfWeek[date.getDay()];
          let dayOfMonth = date.getDate();
          let monthsOfYear = [
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
          let monthOfYear = monthsOfYear[date.getMonth()];
          let year = date.getFullYear();
          let hour = date.getHours().toString().padStart(2, "0");
          let minute = date.getMinutes().toString().padStart(2, "0");
          let dateNow = `${dayOfWeek} ${dayOfMonth} ${monthOfYear} ${year} - ${hour}:${minute}`;
          let pseudo = "<?php echo $_SESSION['pseudo']; ?>"; // récupération du pseudo depuis la session PHP

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
}

shareBtn.addEventListener("click", partage);



// Fonction pour ajouter un topic
function AddTopics() {
  const topic = document.getElementById("topic");
  const li = document.createElement("li");
  const a = document.createElement("a");
  a.setAttribute("href", "#");
  a.textContent = "Entrer votre topic";

  const inputHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("placeholder", "Entrer votre topic");
    input.setAttribute("class", "inputTopic");
    input.setAttribute("autofocus", "true");
    input.setAttribute("maxlength", "20");
    a.replaceWith(input);

    const enterHandler = (e) => {
      if (e.key === "Enter") {
        const newTopic = input.value;
        input.replaceWith(a);
        a.textContent = newTopic;
        input.removeEventListener("keypress", enterHandler);
        a.removeEventListener("click", inputHandler);
      }
    };
    input.addEventListener("keypress", enterHandler);
    a.removeEventListener("click", inputHandler);
  };
  a.addEventListener("click", inputHandler);

  li.appendChild(a);
  topic.appendChild(li);
}

// Fonction pour ajouter un tag
function AddTags() {
  const tags = document.getElementById("tags");
  const li = document.createElement("li");
  const a = document.createElement("a");
  a.setAttribute("href", "#");
  a.textContent = "Entrer votre tag";

  const inputHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("placeholder", "Entrer votre tag");
    input.setAttribute("class", "inputTag");
    input.setAttribute("autofocus", "true");
    input.setAttribute("maxlength", "20");
    input.setAttribute("value", "#");
    a.replaceWith(input);

    const enterHandler = (e) => {
      if (e.key === "Enter") {
        const newTag = input.value;
        input.replaceWith(a);
        a.textContent = newTag;
        input.removeEventListener("keypress", enterHandler);
        a.removeEventListener("click", inputHandler);
      }
    };
    input.addEventListener("keypress", enterHandler);
    a.removeEventListener("click", inputHandler);
  };
  a.addEventListener("click", inputHandler);

  li.appendChild(a);
  tags.appendChild(li);
}
