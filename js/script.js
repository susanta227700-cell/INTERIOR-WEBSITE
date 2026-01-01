document.addEventListener("DOMContentLoaded", function () {

  /* NAVBAR */
  var navbarToggler = document.querySelector(".navbar-toggler");
  if (navbarToggler) {
    navbarToggler.addEventListener("click", function () {
      navbarToggler.classList.toggle("active");
    });
  }

  /* HERO SWIPER */
  var heroSwiperEl = document.querySelector(".heroBgSwiper");
  if (heroSwiperEl && typeof Swiper !== "undefined") {
    new Swiper(".heroBgSwiper", {
      loop: true,
      speed: 1500,
      effect: "fade",
      fadeEffect: { crossFade: true },
      autoplay: { delay: 2000, disableOnInteraction: false },
      allowTouchMove: false
    });
  }

  /* PROJECT SECTION SWIPER */
  var projectSwiperEl = document.querySelector(".projectSwiper");
  if (projectSwiperEl && typeof Swiper !== "undefined") {
    new Swiper(".projectSwiper", {
      loop: true,
      spaceBetween: 16,
      speed: 900,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
      },
      navigation: { nextEl: ".right-arrow", prevEl: ".left-arrow" },
      breakpoints: {
        0: { slidesPerView: 1 },
        576: { slidesPerView: 2 },
        992: { slidesPerView: 3 },
        1200: { slidesPerView: 4 }
      }
    });
    



// BLOG

   var swiper = new Swiper(".mySwiper", {
      slidesPerView: 3,
      spaceBetween: 30,
        loop: true,
       autoplay: {
        delay: 2500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },


        navigation: { nextEl: ".blog-right-arrow", prevEl: ".blog-left-arrow" },
      breakpoints: {
        0: { slidesPerView: 1 },
        576: { slidesPerView: 2 },
        992: { slidesPerView: 2 },
        1200: { slidesPerView: 3 }
      }
    });





  }
















  

});
