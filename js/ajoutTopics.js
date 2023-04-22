function displayTopicsByTagId(tagId) {
  const topicsList = document.getElementById("topics");
  const url = `http://localhost:8888/ForumPhp/Api/Display/displayTopics.php?tag_id=${tagId}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // Afficher les résultats ici
      topicsList.innerHTML = "";
      data.results.forEach((topic) => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.setAttribute("href", `topic.php?id=${topic.id}`);
        a.textContent = topic.topic;
        li.setAttribute("data-id", tagId);
        li.appendChild(a);
        topicsList.appendChild(li);
      });
    })
    .catch((error) => console.error(error));
}

const tagsContainer = document.getElementById("tags");
tagsContainer.addEventListener("click", (event) => {
  const tag = event.target.closest(".tag");
  if (tag) {
    const tagId = tag.dataset.id;
    displayTopicsByTagId(tagId);
  }
});

function AddTopics() {
  const topics = document.getElementById("topic");
  const li = document.createElement("li");
  const a = document.createElement("a");
  a.setAttribute("href", "#");
  a.setAttribute("data-id", "");
  a.textContent = "Secltionner un tag";

  let tag_id = ""; // Initialize tag_id to an empty string

  function selectTag() {
    const selectedTag = document.querySelector(".selected");
    if (selectedTag) {
      selectedTag.classList.remove("selected");
    }
    this.classList.add("selected");
    tag_id = this.dataset.id;
  }

  function createInput() {
    const input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("placeholder", "Nom du Topic");
    input.setAttribute("class", "inputTopic");
    input.setAttribute("autofocus", "true");
    input.setAttribute("maxlength", "100");
    this.replaceWith(input);

    const enterHandler = (e) => {
      if (e.key === "Enter") {
        const newTopic = input.value;
        input.replaceWith(a);
        a.textContent = newTopic;
        input.removeEventListener("keypress", enterHandler);

        if (!newTopic || !tag_id) {
          alert("Veuillez remplir tous les champs.");
          return;
        }

        fetch(
          `http://localhost:8888/ForumPhp/Api/topics.php?tag_id=${tag_id}&topic=${newTopic}`,
          {
            method: "POST",
          }
        )
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
          })
          .catch((error) => console.error(error));
      }
    };

    input.addEventListener("keypress", enterHandler);
  }

  a.addEventListener("click", createInput);

  li.appendChild(a);
  topics.appendChild(li);

  const tags = document.querySelectorAll(".tag");
  tags.forEach((tag) => {
    tag.addEventListener("click", selectTag);
  });
  // Ajoutez ceci après avoir attaché les écouteurs d'événements aux tags
  const defaultTag = document.querySelector(".tag");
  selectTag.call(defaultTag);
}
