function AddTags() {
  const tags = document.getElementById("tags");
  const li = document.createElement("li");
  const a = document.createElement("a");
  a.setAttribute("href", "#");
  a.setAttribute("class", "tag");
  a.textContent = "Enter your tag";

  const inputHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("placeholder", "Enter your tag");
    input.setAttribute("class", "inputTag");
    input.setAttribute("autofocus", "true");
    input.setAttribute("maxlength", "20");
    a.replaceWith(input);

    const enterHandler = (e) => {
      if (e.key === "Enter") {
        const newTag = input.value;
        input.replaceWith(a);
        a.textContent = newTag;
        input.removeEventListener("keypress", enterHandler);
        a.removeEventListener("click", inputHandler);

        fetch(`http://localhost:8888/ForumPhp/Api/tags.php?tag=${newTag}`, {
          method: "POST",
        })
          .then((response) => response.json())
          .then((data) => {
            const tagId = data.results.id;
            a.setAttribute("data-id", tagId);
            console.log(data);
          })
          .catch((error) => console.error(error));
      }
    };

    input.addEventListener("keypress", enterHandler);
    a.removeEventListener("click", inputHandler);
  };

  a.addEventListener("click", inputHandler);

  li.appendChild(a);
  tags.appendChild(li);
}
