console.log("Rishav Thapliyal is the best in the world ");
const arrows = document.querySelectorAll(".arrow");
const movieLists = document.querySelectorAll(".movie-list");

// arrows.forEach((arrow, i) => {
//   const itemNumber = movieLists[i].querySelectorAll("img").length;
  
//   let clickCounter = 0;
//   arrow.addEventListener("click", () => {
//     console.log(itemNumber)
//     const ratio = Math.floor(window.innerWidth / 270);
//     clickCounter++;
//     if (itemNumber - (3 + clickCounter) + (3 - ratio) >= 0) {
//       movieLists[i].style.transform = `translateX(${
//         movieLists[i].computedStyleMap().get("transform")[0].x.value - 300
//       }px)`;
//     } else {
//       movieLists[i].style.transform = "translateX(0)";
//       clickCounter = 0;
//     }
//   });

//   console.log(Math.floor(window.innerWidth / 270));
// });

const profile=document.querySelector('.profile-container');
const contents=document.querySelector('.profile-content');
profile.addEventListener('click',()=>{
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
  // pagination: {
  //   el: ".swiper-pagination",
  //   clickable: true,
  // },
});
const navbar=document.querySelector(".navbar");
console.log(navbar);
window.addEventListener('scroll',()=>{
  console.log("Here")
  navbar.classList.toggle("shadow",window.scrollY>0);
});