function displayConnection() {
  const champInfo = document.getElementById("champInfo");
  champInfo.style.order = "1";

  champInfo.innerHTML = `<h2>Connectez-vous</h2>
    <input class="input" type="email" placeholder="Email">
    <input class="input" type="password" placeholder="Mot de passe">
    <input class="btn" type="submit" value="Se connecter">
    <p>Vous n'avez pas de compte ? <a href="#" class="inscriptions" onclick="displayInscription()">Inscrivez-vous</a></p>
    <a href="#">
    <img class="open" src="../Assets/img/info.svg" alt="btnOpen">
    </a>
  `;

  const btnOpen = document.querySelector(".open");
  const btnClose = document.querySelector(".close");
  const modal = document.querySelector(".modal");
  btnOpen.addEventListener("click", () => {
    modal.classList.add("active");
    modal.classList.remove("animation");
    champInfo.classList.add("animation");
    btnOpen.style.opacity = "0";

    console.log("open");
  });
  btnClose.addEventListener("click", () => {
    modal.classList.add("animation");
    champInfo.classList.remove("animation");
    champInfo.classList.add("active");
    btnOpen.style.opacity = "1";
    console.log("close");
  });
}

displayConnection();

function displayInscription() {
  const champInfo = document.getElementById("champInfo");
  champInfo.style.order = "0";

  champInfo.innerHTML = `<h2>Inscrivez-vous</h2>
    <input class="input" type="text" placeholder="Prenom">
    <input class="input" type="email" placeholder="Email">
    <input class="input" type="password" placeholder="Mot de passe">
    <input class="btn" type="submit" value="S'inscrire">
    <p>Vous avez deja un compte ? <a href="#" class="inscriptions" onclick="displayConnection()">Connectez-vous</a></p>
    <a href="#">
    <img class="open" src="../Assets/img/info.svg" alt="btnOpen">
    </a>
  `;
  const btnOpen = document.querySelector(".open");
  const btnClose = document.querySelector(".close");
  const modal = document.querySelector(".modal");
  btnOpen.addEventListener("click", () => {
    modal.classList.add("active");
    modal.classList.remove("animation");
    champInfo.classList.add("animation");
    btnOpen.style.opacity = "0";
    console.log("open");
  });
  btnClose.addEventListener("click", () => {
    modal.classList.add("animation");
    champInfo.classList.remove("animation");
    champInfo.classList.add("active");
    btnOpen.style.opacity = "1";
    console.log("close");
  });
}
