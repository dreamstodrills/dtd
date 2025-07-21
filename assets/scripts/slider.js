document.addEventListener("DOMContentLoaded", function () {
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
      emailjs.sendForm("service_t62sir8", "template_w9y0jd6", this)
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