function AddTopics(tag_id) {
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

        // Envoi de la requête POST pour ajouter le topic à la base de données
        fetch(`http://localhost:8888/ForumPhp/Api/topics.php`, {
          method: "POST",
          body: JSON.stringify({
            tag_id: tag_id,
            topic: newTopic,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
              console.log(data.message);
            } else {
              console.error(data.message);
            }
          })
          .catch((error) => console.error(error));
      }
    };
    input.addEventListener("keypress", enterHandler);
    a.removeEventListener("click", inputHandler);
  };
  a.addEventListener("click", inputHandler);

  li.appendChild(a);
  topic.appendChild(li);
}
