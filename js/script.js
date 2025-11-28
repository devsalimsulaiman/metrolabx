// MOTIVATION ON SOFTWARE, AI, ARCHITECTURE. Counter animation
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".counter");
  const speed = 200; // lower value = faster animation
  const section = document.querySelector("#ai-change");

  const animateCounters = () => {
    counters.forEach(counter => {
      const updateCount = () => {
        const target = +counter.getAttribute("data-target");
        const count = +counter.innerText;
        const increment = target / speed;

        if (count < target) {
          counter.innerText = Math.ceil(count + increment);
          setTimeout(updateCount, 20);
        } else {
          counter.innerText = target + "%";
        }
      };
      updateCount();
    });
  };

  const resetCounters = () => {
    counters.forEach(counter => (counter.innerText = "0"));
  };

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounters(); // start animation when section enters view
        } else {
          resetCounters(); // reset when it leaves view
        }
      });
    },
    { threshold: 0.3 } // triggers when ~30% of section is visible
  );

  observer.observe(section);
});


// contact form
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const inputs = form.querySelectorAll("input, textarea");
  const submitBtn = form.querySelector("button[type='submit']");
  const titleBtn = document.getElementById("titleDropdown");
  const titleFeedback = document.getElementById("titleFeedback");
  let titleSelected = false;

  // Handle dropdown title selection
  form.querySelectorAll(".dropdown-item").forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      titleBtn.textContent = e.target.textContent;
      titleSelected = true;
      titleFeedback.style.display = "none";
      validateForm();
    });
  });

  const validateForm = () => {
    let allValid = titleSelected;
    inputs.forEach((input) => {
      if (!input.checkValidity()) allValid = false;
    });
    submitBtn.disabled = !allValid;
    submitBtn.classList.toggle("active", allValid);
  };

  // Validate text inputs
  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      if (input.checkValidity()) {
        input.classList.remove("is-invalid");
        input.classList.add("is-valid");
      } else {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
      }
      validateForm();
    });
  });

  // On submit
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!titleSelected) {
      titleFeedback.style.display = "block";
      return;
    }

    form.classList.add("was-validated");
    if (form.checkValidity() && titleSelected) {
      alert("Message sent successfully!");
      form.reset();
      titleBtn.textContent = "Choose...";
      titleSelected = false;
      submitBtn.disabled = true;
      submitBtn.classList.remove("active");
    }
  });
});


// header toggling class
window.addEventListener('scroll', () => {
  const header = document.getElementById('mainHeader');
  
  if (window.scrollY > 80) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});




/**
 * script.js
 * Handles responsive navigation menu toggling and smooth scrolling for internal page links.
 *
 * Features:
 * 1. Mobile menu toggle (open/close on click)
 * 2. Locks body scroll when menu is open
 * 3. Smooth scrolling to anchor links (#about, #projects, etc.)
 * 4. Auto-close menu when a navigation link is clicked
 *
 * Author: Salim Sulaiman Liman
 * Year: 2025
 */

// Select key DOM elements
const menuToggle = document.getElementById('menu-btn');
const navbar = document.getElementById('navbar');
const body = document.body;

// ---- Menu Toggle (☰ / ✕) ----
menuToggle.addEventListener('click', () => {
  const isActive = navbar.classList.toggle('active');

  // Prevent background scroll when menu is active
  body.style.overflow = isActive ? 'hidden' : 'auto';

  // Toggle button icon between open and close
  menuToggle.textContent = isActive ? '✕' : '☰';
});

// ---- Close Menu on Nav Link Click ----
document.querySelectorAll('.navbar a').forEach(link => {
  link.addEventListener('click', () => {
    navbar.classList.remove('active');
    body.style.overflow = 'auto';
    menuToggle.textContent = '☰';
  });
});

// ---- Smooth Scrolling for Anchor Links ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));

    if (target) {
      // Adjust scroll position to account for fixed header height
      window.scrollTo({
        top: target.offsetTop - 100,
        behavior: 'smooth'
      });
    }
  });
});
