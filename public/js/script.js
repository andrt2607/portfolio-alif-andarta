import PhotoSwipeLightbox from "https://unpkg.com/photoswipe@5/dist/photoswipe-lightbox.esm.min.js";
import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs'

const lightbox = new PhotoSwipeLightbox({
  gallery: ".gallery",
  children: "a",
  pswpModule: () =>
    import("https://unpkg.com/photoswipe@5/dist/photoswipe.esm.js"),
});

lightbox.init();

// navbar fixed
window.onscroll = function () {
  const header = document.querySelector("header");
  const fixedNav = header.offsetTop;

  if (window.pageYOffset > fixedNav) {
    header.classList.add("navbar-fixed");
  } else {
    header.classList.remove("navbar-fixed");
  }
  // console.log(pageYOffset);
  // console.log(fixedNav);
};

// hamburger button
const hamburger = document.querySelector("#hamburger");
const navMenu = document.querySelector("#nav-menu");

hamburger.addEventListener("click", function () {
  hamburger.classList.toggle("hamburger-active");
  navMenu.classList.toggle("hidden");
});

// Typewriter initialization after DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  var app = document.getElementById("my-fullname");
  console.log("app : ", app);

  if (app) {
    var typewriter = new Typewriter(app, {
      loop: true,
      delay: 40,
      cursor: null,
    });

    typewriter
      .pauseFor(2000)
      .typeString(
        `<h1 class="text-base font-semibold text-primary md:text-xl">Hello World, I'm <span class="mt-1 block text-4xl font-bold text-dark lg:text-5xl">Alif Andarta Al Falah</span></h1>`
      )
      .typeString(
        `<h2 class="mb-5 text-lg font-medium text-secondary lg:text-2xl">
                Web and
                <span class="text-dark">Android Development</span></h2>`
      )
      // .callFunction(() => typewriter.stop())
      .pauseFor(700)
      .start();
  } else {
    console.error("Typewriter target element not found.");
  }
});

// const lightbox = new PhotoSwipeLightbox({
//     gallery: '#my-gallery',
//     children: 'a',
//     pswpModule: () => import('photoswipe/dist/photoswipe.esm.js')
//   });
//   lightbox.init();

document.addEventListener('DOMContentLoaded', () => {
  const swiper = new Swiper('.swiper', {
    direction: 'horizontal',
    centeredSlides: true,
    grabCursor: true,
    // effect: 'fade',
    effect: 'cards',
    keyboard: {
      enabled: true,
    },
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      // dynamicBullets: true,
    },
  });
});