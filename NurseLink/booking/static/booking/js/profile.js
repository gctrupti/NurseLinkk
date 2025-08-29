document.addEventListener("DOMContentLoaded", () => {
  // ===== Header scroll effect (from booking) =====
  const header = document.querySelector(".site-header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.style.background = "#ffffff";
      header.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
    } else {
      header.style.background = "rgba(255,255,255,0.95)";
      header.style.boxShadow = "var(--shadow-light)";
    }
  });

  // ===== Mobile nav toggle (from booking) =====
  const menuToggle = document.querySelector(".mobile-menu-toggle");
  const mainNav = document.querySelector(".main-nav");
  menuToggle.addEventListener("click", () => {
    mainNav.classList.toggle("active");
  });

  // ===== Testimonial Slider (from profile) =====
  const slides = document.querySelectorAll(".testimonial-slide");
  const dots = document.querySelectorAll(".dot");
  let currentIndex = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
      dots[i].classList.toggle("active", i === index);
    });
  }

  document.querySelector(".testimonial-btn.next").addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  });

  document.querySelector(".testimonial-btn.prev").addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
  });

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      currentIndex = i;
      showSlide(currentIndex);
    });
  });

  // Auto rotate every 5s
  setInterval(() => {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  }, 5000);
});
