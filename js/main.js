const textArea = document.getElementById("textArea");
const message = document.getElementById("message");

// Fonction pour afficher les messages
function displayMsg() {
  fetch(`http://localhost:8888/ForumPhp/Api/displayMsg.php`)
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
