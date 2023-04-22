const textArea = document.getElementById("textArea");
const message = document.getElementById("message");

// Fonction pour afficher les messages
function displayMsg() {
  fetch(`http://localhost:8888/ForumPhp/Api/Display/displayMsg.php`)
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        const messages = data.Messages;
        messages.forEach((msg) => {
          const date = new Date(msg.date_envoi);
          const dateNow = formatDate(date);
          const pseudo = msg.pseudo;
          const text = msg.message;

          message.insertAdjacentHTML(
            "afterbegin",
            `
            <div class="card">
              <p class="author">${pseudo}</p>
              <p>${text}</p>
              <p class="date">${dateNow}</p>
            </div>
          `
          );
        });
      } else {
        alert(data.message);
      }
    })
    .catch((error) => {
      alert("Une erreur est survenue : " + error);
    });
}

displayMsg();

// // Fonction pour affucher un topic
// const displayTopics = (tagId) => {
//   fetch(
//     `http://localhost:8888/ForumPhp/Api/Display/displayTopics.php?tag_id=${tagId}`
//   )
//     .then((response) => response.json())
//     .then((data) => {
//       const topics = data.results;
//       const topicsList = document.getElementById("topics-list");
//       topicsList.innerHTML = ""; // Efface la liste des topics actuels
//       if (topics.length > 0) {
//         for (let i = 0; i < topics.length; i++) {
//           const topic = topics[i];
//           const li = document.createElement("li");
//           const a = document.createElement("a");
//           a.setAttribute("href", `topic.php?id=${topic.id}`);
//           a.textContent = topic.topic;
//           li.appendChild(a);
//           topicsList.appendChild(li);
//         }
//       } else {
//         const li = document.createElement("li");
//         li.textContent = "Aucun sujet de discussion pour ce tag.";
//         topicsList.appendChild(li);
//       }
//     })
//     .catch((error) => console.error(error));
// };

// displayTopics();
