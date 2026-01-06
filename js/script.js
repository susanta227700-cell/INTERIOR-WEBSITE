document.addEventListener("DOMContentLoaded", function () {

  // NAVBAR
  const navbarToggler = document.querySelector(".navbar-toggler");
  if (navbarToggler) {
    navbarToggler.addEventListener("click", function () {
      this.classList.toggle("active");
    });
  }

//  HERO SWIPER
  if (document.querySelector(".heroBgSwiper") && typeof Swiper !== "undefined") {
    new Swiper(".heroBgSwiper", {
      loop: true,
      speed: 1500,
      effect: "fade",
      fadeEffect: { crossFade: true },
      autoplay: {
        delay: 2000,
        disableOnInteraction: false
      },
      allowTouchMove: false
    });
  }

// PROJECT SWIPER 
if (document.querySelector(".projectSwiper") && typeof Swiper !== "undefined") {
  const isProjectPage = document.querySelector(
    ".projects-section[data-project-page]"
  );

  new Swiper(".projectSwiper", {
    loop: !isProjectPage,    
    speed: 900,
    spaceBetween: 16,

    autoplay: !isProjectPage
      ? { delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }
      : false,

    navigation: {
      nextEl: ".right-arrow",
      prevEl: ".left-arrow"
    },

    slidesPerView: 4,
    slidesPerGroup: isProjectPage ? 4 : 1,

    grid: {
      rows: isProjectPage ? 2 : 1,
      fill: "row"
    },

    breakpoints: {
      0:   { slidesPerView: 1, grid: { rows: 1 } },
      576: { slidesPerView: 2, grid: { rows: isProjectPage ? 2 : 1 } },
      992: { slidesPerView: 4, grid: { rows: isProjectPage ? 2 : 1 } }
    }
  });
}


      // BLOG SWIPER
  if (document.querySelector(".mySwiper") && typeof Swiper !== "undefined") {
    new Swiper(".mySwiper", {
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
        clickable: true
      },
      navigation: {
        nextEl: ".blog-right-arrow",
        prevEl: ".blog-left-arrow"
      },
      breakpoints: {
        0: { slidesPerView: 1 },
        576: { slidesPerView: 2 },
        992: { slidesPerView: 2 },
        1200: { slidesPerView: 3 }
      }
    });
  }

// CONTACT FORM
  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      let valid = true;

      form.querySelectorAll(".form-control").forEach(input => {
        const error = input.nextElementSibling;

        if (!input.value.trim()) {
          input.classList.add("error");
          if (error) error.style.display = "block";
          valid = false;
        } else {
          input.classList.remove("error");
          if (error) error.style.display = "none";
        }
      });

      if (valid) {
        alert("Form submitted successfully!");
        form.reset();
      }
    });
  }

    //  COUNTER SECTION
  const counters = document.querySelectorAll(".counter");
  const section = document.querySelector(".counter-section");
  let hasAnimated = false;

  if (counters.length && section) {
    const startCounting = () => {
      counters.forEach(counter => {
        const target = +counter.getAttribute("data-target");
        let count = 0;
        const increment = target / 200;

        const updateCount = () => {
          if (count < target) {
            count += increment;
            counter.innerText = Math.ceil(count).toLocaleString();
            requestAnimationFrame(updateCount);
          } else {
            counter.innerText = target.toLocaleString();
          }
        };

        updateCount();
      });
    };

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated) {
          startCounting();
          hasAnimated = true;
        }
      });
    }, { threshold: 0.5 });

    observer.observe(section);
  }

});
