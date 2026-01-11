document.addEventListener("DOMContentLoaded", function () {

  //========== NAVBAR =========//
  const navbarToggler = document.querySelector(".navbar-toggler");
  if (navbarToggler) {
    navbarToggler.addEventListener("click", function () {
      this.classList.toggle("active");
    });
  }

  //========== HERO SWIPER =========//
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

  //========== PROJECT SWIPER =========//
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

//============ BLOG SWIPER (HOME PAGE ) ==========//
let blogSwiper = null;

if (
  document.querySelector(".mySwiper") &&
  !document.querySelector(".blog-main") &&
  typeof Swiper !== "undefined"
) {
  blogSwiper = new Swiper(".mySwiper", {
    slidesPerView: 3,
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
      pauseOnMouseEnter: true
    },
    navigation: {
      nextEl: ".blog-right-arrow",
      prevEl: ".blog-left-arrow"
    },
    breakpoints: {
      0: { slidesPerView: 1 },
      576: { slidesPerView: 2 },
      1200: { slidesPerView: 3 }
    }
  });
}


//============ BLOG SWIPER (MAIN PAGE) ==========//
let blogMainSwiper = null;

if (document.querySelector(".blog-main") && typeof Swiper !== "undefined") {
  blogMainSwiper = new Swiper(".blog-main", {
    slidesPerView: 3,
    spaceBetween: 30,

    grid: {
      rows: 3,
      fill: "row",
    },

    allowTouchMove: false,
    loop: false,

    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      renderBullet: (index, className) =>
        `<span class="${className}">${index + 1}</span>`,
    },

    breakpoints: {
      0: { slidesPerView: 1, grid: { rows: 9 } },
      576: { slidesPerView: 2, grid: { rows: 5 } },
      992: { slidesPerView: 3, grid: { rows: 3 } },
    },
  });

  // ===== PREV & NEXT BUTTON =====
  const prevBtn = document.querySelector(".page-prev");
  const nextBtn = document.querySelector(".page-next");

  function updateArrowState() {
    if (prevBtn) {
      prevBtn.classList.toggle("disabled", blogMainSwiper.isBeginning);
    }
    if (nextBtn) {
      nextBtn.classList.toggle("disabled", blogMainSwiper.isEnd);
    }
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      blogMainSwiper.slidePrev();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      blogMainSwiper.slideNext();
    });
  }

  blogMainSwiper.on("slideChange", updateArrowState);
  updateArrowState();

  // PAGINATION CHANGE
  blogMainSwiper.on("slideChange", () => {
    if (typeof Fancybox !== "undefined") {
      Fancybox.bind('[data-fancybox]', {});
    }
  });
}


//============ FANCYBOX ==========//
if (typeof Fancybox !== "undefined") {
  Fancybox.bind('[data-fancybox]', {
    on: {
      reveal: (fancybox, slide) => {

        // VIDEO AUTOPLAY
        if (slide.src && slide.src.includes("youtube")) {
          slide.src = slide.src.includes("?")
            ? slide.src + "&autoplay=1"
            : slide.src + "?autoplay=1";
        }

        if (blogSwiper && blogSwiper.autoplay) {
          blogSwiper.autoplay.stop();
        }
      },

      closing: () => {
        if (blogSwiper && blogSwiper.autoplay) {
          blogSwiper.autoplay.start();
        }
      }
    }
  });
}




  //============ CONTACT FORM ==========//
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

  //============ COUNTER SECTION ==========//
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


// MODAL PART
document.addEventListener("DOMContentLoaded", function () {
  const openBtn = document.getElementById("openLogin");
  const modalEl = document.getElementById("loginModal");

  if (openBtn && modalEl) {
    const modal = new bootstrap.Modal(modalEl);

    openBtn.addEventListener("click", function (e) {
      e.preventDefault();
      modal.show();
    });
  }
});




// PAGE LOADER
window.addEventListener("load", function () {
  setTimeout(function () {
    const loader = document.getElementById("page-loader");
    if (loader) loader.style.display = "none";
  }, 2000); // 
});




// mouse

 const cursor = document.querySelector('.cursor');
  const dot = document.querySelector('.cursor-dot');

  let mouseX = 0, mouseY = 0;
  let dotX = 0, dotY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
  });

  function animateDot(){
    dotX += (mouseX - dotX) * 0.15;
    dotY += (mouseY - dotY) * 0.15;
    dot.style.transform = `translate(${dotX - mouseX}px, ${dotY - mouseY}px)`;
    requestAnimationFrame(animateDot);
  }

  animateDot();



  // luxy

document.addEventListener("DOMContentLoaded", function () {
  luxy.init({
    wrapper: '#luxy',
    smooth: true,
    smoothSpeed: 10
  });
});



