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
