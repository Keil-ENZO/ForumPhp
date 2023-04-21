function addTopics() {
  const topics = document.getElementById("topic");
  const li = document.createElement("li");
  const a = document.createElement("a");
  a.setAttribute("href", "#");
  a.setAttribute("data-id", "");
  a.textContent = "Entrer le nom du Topic";

  const inputHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("placeholder", "Entrer le nom du Topic");
    input.setAttribute("class", "inputTopic");
    input.setAttribute("autofocus", "true");
    input.setAttribute("maxlength", "100");
    a.replaceWith(input);

    let tag_id = ""; // Initialize tag_id to an empty string

    const enterHandler = (e) => {
      if (e.key === "Enter") {
        const newTopic = input.value;
        input.replaceWith(a);
        a.textContent = newTopic;
        input.removeEventListener("keypress", enterHandler);
        a.removeEventListener("click", inputHandler);

        fetch(
          `http://localhost:8888/ForumPhp/Api/topics.php?tag_id=${tag_id}&topic=${newTopic}`,
          {
            method: "POST",
          }
        )
          .then((response) => response.json())
          .then((data) => console.log(data))
          .catch((error) => console.error(error));
      }
    };

    const tagClickHandler = (e) => {
      tag_id = e.target.getAttribute("data-id");
      a.setAttribute("data-id", tag_id);
      const selectedTag = document.querySelector(".selected");
      if (selectedTag) {
        selectedTag.classList.remove("selected");
      }
      e.target.classList.add("selected");
    };

    input.addEventListener("keypress", enterHandler);

    const tags = document.querySelectorAll(".tag");
    tags.forEach((tag) => {
      tag.addEventListener("click", tagClickHandler);
    });

    a.removeEventListener("click", inputHandler);
  };

  a.addEventListener("click", inputHandler);

  li.appendChild(a);
  topics.appendChild(li);

  // loop to dynamically generate tags
  const tags = document.querySelectorAll(".tag");
  const tagsList = document.createElement("ul");
  tagsList.classList.add("tags-list");
  tags.forEach((tag) => {
    const tagLi = document.createElement("li");
    const tagA = document.createElement("a");
    tagA.classList.add("tag");
    tagA.setAttribute("href", "#");
    tagA.textContent = tag.textContent;
    tagA.dataset.id = tag.dataset.id; // Utiliser la propriété dataset pour récupérer l'attribut data-id
    tagLi.appendChild(tagA);
    tagsList.appendChild(tagLi);

    tagA.addEventListener("click", (e) => {
      const selectedTag = document.querySelector(".selected");
      if (selectedTag) {
        selectedTag.classList.remove("selected");
      }
      e.target.classList.add("selected");
      const tagId = e.target.dataset.id; // Utiliser la propriété dataset pour récupérer l'attribut data-id
      console.log(tagId);
    });
  });

  li.appendChild(tagsList);
}

// Call the addTopics() function to initialize the form element
addTopics();
