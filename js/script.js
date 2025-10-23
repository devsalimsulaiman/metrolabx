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
