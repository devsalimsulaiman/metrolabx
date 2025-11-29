// menu-accessibility.js - toggles ARIA and provides keyboard accessibility for mobile menu
(function () {
  const menuBtn = document.querySelector('.menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileOverlay = document.querySelector('.mobile-overlay');

  if (!menuBtn || !mobileMenu) return;

  // Ensure IDs for ARIA
  if (!mobileMenu.id) mobileMenu.id = 'mobileMenu';
  menuBtn.setAttribute('aria-controls', mobileMenu.id);
  menuBtn.setAttribute('aria-expanded', 'false');
  menuBtn.setAttribute('aria-label', 'Open menu');

  function openMenu() {
    mobileMenu.classList.add('open');
    if (mobileOverlay) mobileOverlay.classList.add('active');
    menuBtn.setAttribute('aria-expanded', 'true');
    mobileMenu.setAttribute('aria-hidden', 'false');
    // trap focus
    const focusable = mobileMenu.querySelectorAll('a, button, input, [tabindex]:not([tabindex="-1"])');
    if (focusable.length) focusable[0].focus();
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    mobileMenu.classList.remove('open');
    if (mobileOverlay) mobileOverlay.classList.remove('active');
    menuBtn.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
    menuBtn.focus();
    document.body.style.overflow = '';
  }

  menuBtn.addEventListener('click', function (e) {
    const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
    if (expanded) closeMenu(); else openMenu();
  });

  // keyboard: open via Enter/Space
  menuBtn.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      menuBtn.click();
    }
  });

  // close on Escape when menu open
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
      closeMenu();
    }
  });

  // click outside to close
  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', function () {
      if (mobileMenu.classList.contains('open')) closeMenu();
    });
  }

  // ensure close buttons inside menu close it
  mobileMenu.querySelectorAll('.close-btn, .mobile-menu-links a').forEach(function (el) {
    el.addEventListener('click', function () {
      // small timeout to allow link navigation then close
      setTimeout(closeMenu, 150);
    });
  });
})();