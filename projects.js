document.addEventListener("DOMContentLoaded", function () {
  // Navbar scroll effect
  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 10) {
      navbar.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.1)";
    } else {
      navbar.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
    }
  });

  // Hamburger menu toggle
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  menuToggle.addEventListener("click", function () {
    navLinks.classList.toggle("active");

    // Animate hamburger to X
    menuToggle.classList.toggle("active");
  });

  // Close menu when clicking on a link (for mobile)
  const navItems = document.querySelectorAll(".nav-links a");
  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      if (window.innerWidth <= 768) {
        navLinks.classList.remove("active");
        menuToggle.classList.remove("active");
      }
    });
  });
});
