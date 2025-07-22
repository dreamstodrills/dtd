// email.js — Define config at the top
const EMAILJS_SERVICE_ID = "service_t62sir8";
const EMAILJS_TEMPLATE_ID = "template_w9y0jd6";
const EMAILJS_PUBLIC_KEY = "EYWoRrZuHPeZEctHt";
const RECEIVER_EMAIL = "info@dreamstodrills.com";

// Initialize EmailJS
(function() {
  emailjs.init(EMAILJS_PUBLIC_KEY);
})();

document.addEventListener("DOMContentLoaded", function () {
   // ===================
  // UPDATE HEADER SPACER
  // ===================
  function updateHeaderSpacer() {
    var header = document.querySelector(".site-header");
    var spacer = document.getElementById("header-spacer");
    if (header && spacer) {
      spacer.style.height = header.offsetHeight + "px";
    }
  }
  updateHeaderSpacer();
  window.addEventListener("resize", updateHeaderSpacer);

  // And if you show/hide header on scroll, call it after toggling the header!
  window.addEventListener("scroll", function () {
    // ... your header show/hide logic ...
    updateHeaderSpacer();
  });

  // ===================
  // EMAIL FUNCTIONALITY
  // ===================
  const emailLink = document.getElementById("email-link");
  const emailContainer = document.getElementById("email-container");

  if (emailLink && emailContainer) {
    emailLink.href = `mailto:${RECEIVER_EMAIL}`;
    emailLink.textContent = RECEIVER_EMAIL;
  }

  // Footer section
  const footerEmailLink = document.getElementById("footer-email-link");
  if (footerEmailLink) {
    footerEmailLink.href = `mailto:${RECEIVER_EMAIL}`;
    footerEmailLink.textContent = RECEIVER_EMAIL;
  }
  // ===================
  // MOVING HEADER FUNCTIONALITY
  // ===================
  let lastScrollTop = 0;
  const header = document.querySelector("header");
  const showThreshold = 100; // Show header only if scroll is near top
  const scrollUpTolerance = 20; // Minimum scroll up distance to show header

  window.addEventListener("scroll", function () {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    const scrollDelta = lastScrollTop - currentScroll;

    if (currentScroll > lastScrollTop  && currentScroll > showThreshold) {
      // scrolling down → hide header
      header.classList.add("header-hidden");
      document.body.classList.add("header-is-hidden");     // <--- add this line
    } else if (scrollDelta > scrollUpTolerance || currentScroll < showThreshold) {
      // scrolling up → show header
      header.classList.remove("header-hidden");
      document.body.classList.remove("header-is-hidden");  // <--- add this line
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // prevent negative
  });
  // ===================
  // SLIDESHOW FUNCTIONALITY
  // ===================
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");
  let currentIndex = 0;

  function showSlide(index) {
    if (index === currentIndex) return;

    slides.forEach((slide, i) => {
      slide.classList.remove("active", "slide-left", "slide-right");

      if (i === index) {
        slide.classList.add("active", index > currentIndex ? "slide-left" : "slide-right");
      }
    });

    dots.forEach(dot => dot.classList.remove("active"));
    dots[index].classList.add("active");

    currentIndex = index;
  }

  dots.forEach(dot => {
    dot.addEventListener("click", () => {
      const slideIndex = parseInt(dot.getAttribute("data-slide"));
      showSlide(slideIndex);
    });
  });

  // Auto-slide
  setInterval(() => {
    const nextIndex = (currentIndex + 1) % slides.length;
    showSlide(nextIndex);
  }, 3000);

  // ===================
  // ACCORDION FUNCTIONALITY FOR A LA CARTE SECTION
  // ===================
  const accordionHeaders = document.querySelectorAll('.accordion-header');

  accordionHeaders.forEach(header => {
    header.addEventListener("click", () => {
      const item = header.closest(".accordion-item");
      const icon = header.querySelector(".icon");
      const content = item.querySelector(".accordion-content");
      const isOpen = item.classList.contains("open");

      // Close all items
      document.querySelectorAll(".accordion-item").forEach(i => {
        i.classList.remove("open");
        const iIcon = i.querySelector(".icon");
        const iContent = i.querySelector(".accordion-content");
        if (iIcon) {
          iIcon.classList.remove("icon-minus");
          iIcon.classList.add("icon-plus");
          iIcon.textContent = "+";
        }
        if (iContent) {
          iContent.style.maxHeight = null;
        }
      });

      // If it was not already open, open the clicked one
      if (!isOpen) {
        item.classList.add("open");
        if (icon) {
          icon.textContent = "–";
          icon.classList.remove("icon-plus");
          icon.classList.add("icon-minus");
        }
        if (content) {
          content.style.maxHeight = content.scrollHeight + "px";
        }
      }
    });
  });

  // ===================
  // EMAILJS CONTACT FORM
  // ===================
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();
      emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, this)
        .then(function() {
          document.getElementById("form-status").innerText = "Message sent successfully!";
          contactForm.reset();
        }, function(error) {
          document.getElementById("form-status").innerText = "Error sending message. Please try again.";
          console.error("FAILED...", error);
        });
    });
  }
});