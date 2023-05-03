const textArea = document.getElementById("textArea");
const messageContainer = document.getElementById("message");
const shareBtn = document.getElementById("shareBtn");

function displayMessagesByTopicId(topicId) {
  fetch(
    `http://localhost:8888/ForumPhp/Api/Display/displayMsg.php?topic_id=${topicId}`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        const messages = data.Messages.reverse(); // Inverser l'ordre des messages
        const messagesContainer = document.getElementById("message");
        messagesContainer.innerHTML = "";

        messages.forEach((message) => {
          const messageCard = document.createElement("div");
          messageCard.classList.add("card");

          const author = document.createElement("p");
          author.classList.add("author");
          author.textContent = message.pseudo;

          const content = document.createElement("p");
          content.textContent = message.message;

          const dateElement = document.createElement("p");
          dateElement.classList.add("date");
          dateElement.textContent = message.date_envoi;

          messageCard.appendChild(author);
          messageCard.appendChild(content);
          messageCard.appendChild(dateElement);

          messagesContainer.appendChild(messageCard);
        });
      } else {
        console.log(data.message);
      }
    })
    .catch((error) => {
      console.log("Une erreur est survenue : " + error);
    });
}

function formatDate(date) {
  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  };

  return date.toLocaleString(undefined, options);
}

let currentTopicId; // Déclarez la variable currentTopicId en tant que variable globale

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
        displayMessagesByTopicId(currentTopicId);
        console.log(currentTopicId);
        // Vous pouvez ensuite utiliser la variable currentTopicId pour envoyer les messages à ce sujet
        // Ajouter la classe "selected" au topic sélectionné
        const selectedTopic = document.querySelector(".selected2");
        if (selectedTopic) {
          selectedTopic.classList.remove("selected2");
        }
        topic.classList.add("selected2");
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
      `http://localhost:8888/ForumPhp/Api/msg.php?message=${encodeURIComponent(
        message
      )}&user_id=${userId}&pseudo=${encodeURIComponent(
        pseudo
      )}&topic_id=${topicId}`,
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
            console.log("L'élément avec l'ID 'message' n'a pas été trouvé.");
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

          // Ajouter la classe "selected" au topic sélectionné
          const selectedTopic = document.querySelector(".selected2");
          if (selectedTopic) {
            selectedTopic.classList.remove("selected2");
          }
          const currentTopic = document.querySelector(
            `.topic[data-id="${topicId}"]`
          );
          if (currentTopic) {
            currentTopic.classList.add("selected2");
          }
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
