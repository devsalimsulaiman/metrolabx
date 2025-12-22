document.addEventListener("DOMContentLoaded", () => {




  /* -------------------------------------------------
     PAGE DETECTION
  -------------------------------------------------- */
  const isHomePage =
    location.pathname === "/" ||
    location.pathname.endsWith("index.html");

  /* -------------------------------------------------
     HEADER SCROLL BEHAVIOR
     - Other pages: scrolled by default
     - Index page: scrolled only after scroll
  -------------------------------------------------- */
  const header = document.getElementById("mainHeader");

  if (header) {
    if (!isHomePage) {
      header.classList.add("scrolled");
    }

    window.addEventListener("scroll", () => {
      if (!isHomePage) return;

      header.classList.toggle("scrolled", window.scrollY > 80);
    });
  }






  /* -------------------------------------------------
     COUNTER ANIMATION (IntersectionObserver)
  -------------------------------------------------- */
  const counters = document.querySelectorAll(".counter");
  const section = document.querySelector("#ai-change");

  if (counters.length && section) {
    const speed = 200;

    const animateCounters = () => {
      counters.forEach(counter => {
        const target = +counter.dataset.target;
        let count = 0;

        const update = () => {
          const increment = target / speed;
          count += increment;

          if (count < target) {
            counter.innerText = Math.ceil(count);
            requestAnimationFrame(update);
          } else {
            counter.innerText = target + "%";
          }
        };

        update();
      });
    };

    const resetCounters = () => {
      counters.forEach(counter => (counter.innerText = "0"));
    };

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          entry.isIntersecting ? animateCounters() : resetCounters();
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(section);
  }

  /* -------------------------------------------------
     CONTACT FORM VALIDATION
  -------------------------------------------------- */
  const form = document.getElementById("contactForm");

  if (form) {
    const inputs = form.querySelectorAll("input, textarea");
    const submitBtn = form.querySelector("button[type='submit']");
    const titleBtn = document.getElementById("titleDropdown");
    const titleFeedback = document.getElementById("titleFeedback");
    let titleSelected = false;

    const validateForm = () => {
      const validInputs = [...inputs].every(input => input.checkValidity());
      submitBtn.disabled = !(validInputs && titleSelected);
      submitBtn.classList.toggle("active", validInputs && titleSelected);
    };

    // Dropdown selection
    form.querySelectorAll(".dropdown-item").forEach(item => {
      item.addEventListener("click", e => {
        e.preventDefault();
        titleBtn.textContent = item.textContent;
        titleSelected = true;
        titleFeedback.style.display = "none";
        validateForm();
      });
    });

    // Input validation
    inputs.forEach(input => {
      input.addEventListener("input", () => {
        input.classList.toggle("is-valid", input.checkValidity());
        input.classList.toggle("is-invalid", !input.checkValidity());
        validateForm();
      });
    });

    // Submit
    form.addEventListener("submit", e => {
      e.preventDefault();

      if (!titleSelected) {
        titleFeedback.style.display = "block";
        return;
      }

      if (form.checkValidity()) {
        alert("Message sent successfully!");
        form.reset();
        titleBtn.textContent = "Choose...";
        titleSelected = false;
        submitBtn.disabled = true;
        submitBtn.classList.remove("active");
      }
    });
  }

  /* -------------------------------------------------
     MOBILE MENU
  -------------------------------------------------- */
  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobileMenu");
  const closeMenu = document.getElementById("close-menu");
  const mobileOverlay = document.getElementById("mobileOverlay");
  const menuLinks = document.querySelectorAll(".mobile-menu-links a");
  const freeBtn = document.querySelector(".mobile-free-consultation");

  if (menuToggle && mobileMenu) {
    const resetMenuItems = () => {
      menuLinks.forEach(link => {
        link.style.opacity = "0";
        link.style.transform = "translateX(-20px)";
      });
      if (freeBtn) {
        freeBtn.style.opacity = "0";
        freeBtn.style.transform = "translateX(-20px)";
      }
    };

    const openMenu = () => {
      mobileMenu.classList.add("open");
      mobileOverlay.classList.add("active");
      document.body.style.overflow = "hidden";

      menuLinks.forEach((link, i) => {
        setTimeout(() => {
          link.style.opacity = "1";
          link.style.transform = "translateX(0)";
        }, i * 150);
      });

      if (freeBtn) {
        setTimeout(() => {
          freeBtn.style.opacity = "1";
          freeBtn.style.transform = "translateX(0)";
        }, menuLinks.length * 150);
      }
    };

    const closeMenuFunc = () => {
      resetMenuItems();
      mobileMenu.classList.remove("open");
      mobileOverlay.classList.remove("active");
      document.body.style.overflow = "auto";
    };

    menuToggle.addEventListener("click", openMenu);
    closeMenu?.addEventListener("click", closeMenuFunc);
    mobileOverlay?.addEventListener("click", closeMenuFunc);

    menuLinks.forEach(link => {
      link.addEventListener("click", () => {
        closeMenuFunc();
        menuLinks.forEach(l => l.classList.remove("active-link"));
        link.classList.add("active-link");
      });
    });
  }

});
