const arrows = document.querySelectorAll(".arrow");
const movieLists = document.querySelectorAll(".movie-list");

const profile = document.querySelector(".profile-container");
const contents = document.querySelector(".profile-content");
profile.addEventListener("click", () => {
  contents.classList.toggle("active");
  profile.classList.toggle("active");
});

var swiper = new Swiper(".mySwiper", {
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
});

const navbar = document.querySelector(".navbar");
window.addEventListener("scroll", () => {
  console.log("Here");
  navbar.classList.toggle("shadow", window.scrollY > 0);
});

function avg(arr) {
  const sum = arr.reduce((sum, number) => sum + number);
  return sum;
}
