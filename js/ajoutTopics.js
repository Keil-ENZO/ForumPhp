function AddTopics() {
  const topics = document.getElementById("topic");
  const li = document.createElement("li");
  const a = document.createElement("a");
  a.setAttribute("href", "#");
  a.setAttribute("data-id", "");
  a.textContent = "Entrer le nom du Topic";

  let tag_id = "";

  const inputHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("placeholder", "Entrer le nom du Topic");
    input.setAttribute("class", "inputTopic");
    input.setAttribute("autofocus", "true");
    input.setAttribute("maxlength", "100");
    a.replaceWith(input);

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

    const tagClickHandler = (e) => {
      tag_id = e.target.dataset.id;
      const selectedTag = document.querySelector(".selected");
      if (selectedTag) {
        selectedTag.classList.remove("selected");
      }
      e.target.classList.add("selected");
    };

    input.addEventListener("keypress", enterHandler);

    const tags = document.querySelectorAll(".tag a");
    tags.forEach((tag) => {
      tag.addEventListener("click", tagClickHandler);
    });

    a.removeEventListener("click", inputHandler);
  };

  a.addEventListener("click", inputHandler);

  li.appendChild(a);
  topics.appendChild(li);
}
