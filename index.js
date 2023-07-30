function openNav() {
  document.getElementById("openMenu").style.width = "370px";
  document.getElementById("openMenu").style.height = "100vh";
  document.getElementById("openMenu").style.border = "solid white 5px";
}

function closeNav() {
  document.getElementById("openMenu").style.width = "0";
  document.getElementById("openMenu").style.border = "none";
}
window.scroll({
  behavior: "smooth",
});

const toggle = document.querySelector(".toggle");
console.log(toggle);
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

/* Mobile utils*/
const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const arrowIcon = document.querySelectorAll(".wrapper i");
const carouselCard = [...carousel.children];
console.log(carouselCard);
let isAutoPlay = true,
  isDragging = false,
  startX,
  startScrollLeft,
  timeoutId;

let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");

arrowIcon.forEach((icon) => {
  icon.addEventListener("click", () => {
    carousel.scrollLeft += icon.id == "left" ? -firstCardWidth : firstCardWidth;
  });
});
const dragStart = (e) => {
  e.preventDefault();
  isDragging = true;
  carousel.classList.add("dragging");
  startX = e.pageX;
  startScrollLeft = carousel.scrollLeft;
};
const dragging = (e) => {
  if (!isDragging) return;

  carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
};
const dragStop = (e) => {
  isDragging = false;
  carousel.classList.remove("dragging");
};

const infiniteScroll = () => {
  if (carousel.scrollLeft === 0) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.scrollWidth - 2 * carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  } else if (
    Math.ceil(carousel.scrollLeft) ===
    carousel.scrollWidth - carousel.offsetWidth
  ) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  }
  clearTimeout(timeoutId);
  if (!wrapper.matches(":hover")) autoPlay();
};
const autoPlay = () => {
  if (window.innerWidth < 500 || !isAutoPlay) return;
  timeoutId = setTimeout(
    () => (carousel.scrollLeft += firstCardWidth),

    2500
  );
};
autoPlay();
carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);

/* Change html base on screen */
function checkWidth() {
  console.log(window.innerWidth);
  if (window.innerWidth > 480) {
    $(".wrapper").contents().unwrap();
    $(".carousel").contents().unwrap();
  } else {
    window.location.reload();
  }
}
window.addEventListener("resize", checkWidth);
