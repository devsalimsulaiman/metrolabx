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
    // here, speed and value are inversly proportional. you get?
    const speed = 100; 

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

    freeBtn.addEventListener("click", closeMenuFunc);

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



    /* -------------------------------------------------
     CONTACT US MODAL FORM
  -------------------------------------------------- */
  const modal = document.getElementById("contactModal");
  const openBtn = document.querySelector(".open-modal-btn");
  if(modal) {
    const closeBtn = document.querySelector(".close-modal");
    const contactForm = modal.querySelector(".contact-form");
  const submitBtn = contactForm.querySelector(".submit-btn");
  const requiredFields = contactForm.querySelectorAll("input[required], textarea[required]");

  if(contactForm) {
    function validateForm() {
    const isValid = [...requiredFields].every(field => field.checkValidity());
    submitBtn.disabled = !isValid;
  }

  function openModal() {
    modal.classList.add("active");
    document.body.classList.add("modal-open");
  }

  function closeModal() {
    modal.classList.remove("active");
    document.body.classList.remove("modal-open");
    contactForm.reset();
    submitBtn.disabled = true;
  }

  openBtn.addEventListener("click", openModal);
  closeBtn.addEventListener("click", closeModal);

  requiredFields.forEach(field => {
    field.addEventListener("input", validateForm);
  });

  contactForm.addEventListener("submit", () => {
    closeModal();
  });
  }
  }



  /* -------------------------------------------------
   SOFTWARE VIDEO MODAL
-------------------------------------------------- */
const videoPreviews = document.querySelectorAll(".video-preview");
  let activeOverlay = null;

  videoPreviews.forEach(preview => {
    const videoId = preview.dataset.videoId;
    // Set thumbnail
    preview.style.backgroundImage = `url("https://img.youtube.com/vi/${videoId}/hqdefault.jpg")`;

    preview.addEventListener("click", () => openVideo(videoId));
  });

  
  function openVideo(videoId) {
    if (activeOverlay) return;

    const overlay = document.createElement("div");
    overlay.className = "video-overlay";

    // 1. Ensure the URL is clean
    const iframeSrc = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&enablejsapi=1`;
    
    overlay.innerHTML = `
      <div class="video-frame">
        <iframe
          src="${iframeSrc}"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </div>
    `;
  
    document.body.appendChild(overlay);
    document.body.style.overflow = "hidden";
    activeOverlay = overlay;

    const iframe = overlay.querySelector("iframe");

    // Listen for iframe load error
    iframe.addEventListener("error", () => {
      // If iframe fails, redirect user to YouTube directly
      window.open(`https://www.youtube.com/watch?v=${videoId}`, "_blank");
      closeVideo();
    });

    // Close on backdrop click
    overlay.addEventListener("click", e => {
      if (e.target === overlay) closeVideo();
    });

    document.addEventListener("keydown", escHandler);
  }

  function closeVideo() {
    if (!activeOverlay) return;
    activeOverlay.remove();
    document.body.style.overflow = "";
    activeOverlay = null;
    document.removeEventListener("keydown", escHandler);
  }

  function escHandler(e) {
    if (e.key === "Escape") closeVideo();
  }

});