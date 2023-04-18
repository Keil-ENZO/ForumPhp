const iconSearch = document.getElementById("iconSearch");
const search = document.getElementById("search");
const mode = document.querySelector(".mode");
const body = document.querySelector("body");
const cardInfo = document.getElementById("cardInfo");
const compte = document.getElementById("compte");
const btnClose = document.querySelector(".close");

// Fait apparaitre les informations du compte
compte.addEventListener("click", () => {
  console.log("Click");
  cardInfo.classList.add("cardInfo");
  cardInfo.style.transform = "translateX(0)";
  compte.style.transform = "translateX(-200%)";
});

// Ferme les informations du compte
btnClose.addEventListener("click", () => {
  console.log("Close");
  cardInfo.classList.remove("cardInfo");
  cardInfo.style.transform = "translateX(-200%)";
  compte.style.transform = "translateX(0)";
});

// Dark mode
mode.addEventListener("click", () => {
  body.classList.toggle("dark");
  cardInfo.classList.toggle("dark");
  if (body.classList.contains("dark")) {
    mode.innerHTML = '<img id="iconMode" src="../Assets/img/sun.svg" alt="">';
  } else {
    mode.innerHTML = '<img id="iconMode" src="../Assets/img/moon.svg" alt="">';
  }
});

function searchHandler() {
  iconSearch.replaceWith(search);
  search.style.width = "100%";
  search.style.opacity = "1";
  search.focus();
}

//Permet de ce deconnecter
document.addEventListener("DOMContentLoaded", () => {
  const btnDeconnexion = document.getElementById("deconnexion");
  btnDeconnexion.addEventListener("click", () => {
    fetch(`http://localhost:8888/ForumPhp/Api/deconnexion.php`, {
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Déconnexion réussie
          console.log(data.message);
          window.location.href =
            "http://localhost:8888/ForumPhp/pages/connexion.php";
        } else {
          // Erreur de déconnexion
          console.error(data.message);
        }
      })
      .catch((error) => console.error(error));
  });
});