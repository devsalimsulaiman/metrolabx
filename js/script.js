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



// MOBILE MENU
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobileMenu');
const closeMenu = document.getElementById('close-menu');
const mobileOverlay = document.getElementById('mobileOverlay');
const menuLinks = document.querySelectorAll('.mobile-menu-links a');
const freeBtn = document.querySelector('.mobile-free-consultation');

function openMenu() {
    mobileMenu.classList.add('open');
    mobileOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Animate links with stagger
    menuLinks.forEach((link, i) => {
        setTimeout(() => {
            link.style.opacity = '1';
            link.style.transform = 'translateX(0)';
        }, i * 200); // 100ms delay per link
    });

    // Animate button last
    setTimeout(() => {
        freeBtn.style.opacity = '1';
        freeBtn.style.transform = 'translateX(0)';
    }, menuLinks.length * 100);
}

function closeMenuFunc() {
    // Reset links & button
    menuLinks.forEach(link => {
        link.style.opacity = '0';
        link.style.transform = 'translateX(-20px)';
    });
    freeBtn.style.opacity = '0';
    freeBtn.style.transform = 'translateX(-20px)';

    mobileMenu.classList.remove('open');
    mobileOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

menuToggle.addEventListener('click', openMenu);
closeMenu.addEventListener('click', closeMenuFunc);
mobileOverlay.addEventListener('click', closeMenuFunc);

// Close mobile menu when clicking any link & set active link
menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        closeMenuFunc();
        menuLinks.forEach(l => l.classList.remove('active-link'));
        link.classList.add('active-link');
    });
});
