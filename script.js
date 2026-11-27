// ============================================
// Portfolio website script
// - Mobile hamburger menu toggle
// - Smooth scroll on navigation link click
// - Active menu highlight on scroll
// ============================================

document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");
  const navLinks = document.querySelectorAll(".nav-link");

  // 1. Mobile hamburger menu toggle
  menuToggle.addEventListener("click", function () {
    const isOpen = navMenu.classList.toggle("open");
    menuToggle.classList.toggle("open", isOpen);
    menuToggle.setAttribute("aria-expanded", isOpen);
    menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  });

  // 2. Smooth scroll on navigation link click
  navLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
      const targetId = link.getAttribute("href"); // e.g. "#about"
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        event.preventDefault();

        // Smooth scroll
        targetSection.scrollIntoView({ behavior: "smooth" });

        // Close mobile menu
        navMenu.classList.remove("open");
        menuToggle.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open menu");

        // Update active link
        setActiveLink(targetId);
      }
    });
  });

  // 3. Active menu highlight on scroll
  function setActiveLink(currentId) {
    navLinks.forEach(function (link) {
      if (link.getAttribute("href") === currentId) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }

  // Detect the visible section and update the active link
  const sections = document.querySelectorAll("section[id]");

  function updateActiveOnScroll() {
    const scrollPosition = window.scrollY + 100; // Offset for header height

    let currentId = "";
    sections.forEach(function (section) {
      if (scrollPosition >= section.offsetTop) {
        currentId = "#" + section.getAttribute("id");
      }
    });

    if (currentId) {
      setActiveLink(currentId);
    }
  }

  window.addEventListener("scroll", updateActiveOnScroll);

  // Run once on page load
  updateActiveOnScroll();
});

// ============================================
// Scroll-revealed paper overlay
// ============================================
document.addEventListener("DOMContentLoaded", function () {
  const paperOverlay = document.getElementById("paperOverlay");
  const paperClose = document.getElementById("paperClose");
  const revealY = 160;
  let dismissed = false;

  function updatePaper() {
    if (dismissed) return;
    const shouldShow = window.scrollY > revealY;
    paperOverlay.classList.toggle("show", shouldShow);
    paperOverlay.setAttribute("aria-hidden", shouldShow ? "false" : "true");
  }

  paperClose.addEventListener("click", function () {
    dismissed = true;
    paperOverlay.classList.remove("show");
    paperOverlay.setAttribute("aria-hidden", "true");
  });

  window.addEventListener("scroll", updatePaper, { passive: true });
  updatePaper();
});
