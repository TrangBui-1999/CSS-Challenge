function openNav() {
  document.getElementById("openMenu").style.width = "370px";
  document.getElementById("openMenu").style.height = "100vh";
}

function closeNav() {
  document.getElementById("openMenu").style.width = "0";
}
window.scroll({
  behavior: "smooth",
});

const toggle = document.querySelector(".toggle");
const nav = document.querySelector(".nav-row");
const items = document.querySelectorAll(".item");

/* Toggle mobile menu */
function toggleMenu() {
  if (nav.classList.contains("active")) {
    nav.classList.remove("active");
    toggle.querySelector("a").innerHTML = "<i class='fas fa-bars'></i>";
  } else {
    nav.classList.add("active");
    toggle.querySelector("a").innerHTML = "<i class='fas fa-times'></i>";
  }
}
/* Event Listeners */
toggle.addEventListener("click", toggleMenu, false);
