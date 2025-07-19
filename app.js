document.addEventListener("DOMContentLoaded", function () {
  // Navbar scroll effect
  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 10) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Project slider functionality
  const slider = document.getElementById("project-slider");
  const projects = document.querySelectorAll(".project-item");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const dotsContainer = document.getElementById("project-dots");

  let currentIndex = 0;
  let projectsPerView = getProjectsPerView();
  let isDragging = false;
  let startPos = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;
  let animationID;

  function getProjectsPerView() {
    if (window.innerWidth < 768) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  }

  function setupSlider() {
    setupDots();
    updateSlider();
    toggleNavButtons();

    prevBtn.addEventListener("click", movePrev);
    nextBtn.addEventListener("click", moveNext);
    window.addEventListener("resize", handleResize);

    slider.addEventListener("touchstart", touchStart, { passive: true });
    slider.addEventListener("touchend", touchEnd, { passive: true });
    slider.addEventListener("touchmove", touchMove, { passive: true });
  }

  function setupDots() {
    dotsContainer.innerHTML = "";
    const totalSlides = Math.ceil(projects.length / projectsPerView);

    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement("div");
      dot.classList.add("project-dot");
      if (i === 0) dot.classList.add("active");
      dot.addEventListener("click", () => goToSlide(i));
      dotsContainer.appendChild(dot);
    }
  }

  function updateDots() {
    const dots = document.querySelectorAll(".project-dot");
    const currentSlide = Math.floor(currentIndex / projectsPerView);

    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentSlide);
    });
  }

  function goToSlide(slideIndex) {
    currentIndex = slideIndex * projectsPerView;
    updateSlider();
  }

  function updateSlider() {
    const projectWidth = projects[0].offsetWidth + 20;
    const newTranslate = -currentIndex * projectWidth;

    slider.style.transition = "transform 0.5s ease";
    slider.style.transform = `translateX(${newTranslate}px)`;

    updateDots();
    toggleNavButtons();
  }

  function toggleNavButtons() {
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= projects.length - projectsPerView;
  }

  function movePrev() {
    if (currentIndex > 0) {
      const moveBy =
        window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1;
      currentIndex = Math.max(0, currentIndex - moveBy);
      updateSlider();
    }
  }

  function moveNext() {
    if (currentIndex < projects.length - projectsPerView) {
      const moveBy =
        window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1;
      currentIndex = Math.min(
        projects.length - projectsPerView,
        currentIndex + moveBy
      );
      updateSlider();
    }
  }

  function handleResize() {
    const newProjectsPerView = getProjectsPerView();
    if (newProjectsPerView !== projectsPerView) {
      projectsPerView = newProjectsPerView;
      currentIndex = Math.min(currentIndex, projects.length - projectsPerView);
      setupDots();
      updateSlider();
    }
  }

  function touchStart(e) {
    if (window.innerWidth >= 768) return;
    startPos = e.touches[0].clientX;
    isDragging = true;
    animationID = requestAnimationFrame(animation);
    slider.style.cursor = "grabbing";
    slider.style.transition = "none";
  }

  function touchEnd(e) {
    if (window.innerWidth >= 768) return;
    isDragging = false;
    cancelAnimationFrame(animationID);

    const movedBy = currentTranslate - prevTranslate;

    if (movedBy < -100 && currentIndex < projects.length - 1) {
      currentIndex++;
    }

    if (movedBy > 100 && currentIndex > 0) {
      currentIndex--;
    }

    updateSlider();
    slider.style.cursor = "grab";
  }

  function touchMove(e) {
    if (!isDragging || window.innerWidth >= 768) return;
    const currentPosition = e.touches[0].clientX;
    currentTranslate = prevTranslate + currentPosition - startPos;
  }

  function animation() {
    slider.style.transform = `translateX(${currentTranslate}px)`;
    if (isDragging) requestAnimationFrame(animation);
  }

 document.addEventListener("click", function (e) {
  const projectContainer = e.target.closest(".project-image-container");
  if (projectContainer) {
    const projectNumber = parseInt(projectContainer.dataset.project);
    

    
    Swal.fire({
      title: 'Read Case Study',
      text: `Are you sure you want to open this Project ?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, open it!',
      cancelButtonText: 'No, cancel',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        const projectPages = {
          1: "project1.html",
          2: "project2.html", 
          3: "project3.html",
          4: "project4.html",
          5: "project5.html"
        };
        
        if (projectPages[projectNumber]) {
          window.location.href = projectPages[projectNumber];
        }
      }
    });
  }
});

  // Initialize the slider
  setupSlider();

  // Smooth scroll for navbar links
  const anchors = document.querySelectorAll('a[href^="#"]');
  anchors.forEach(function (anchor) {
    anchor.addEventListener("click", function (event) {
      event.preventDefault();
      const targetId = anchor.getAttribute("href");
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
      // Close menu after clicking a link on small screens
      if (window.innerWidth <= 768) {
        document.querySelector(".nav-links").classList.remove("active");
      }
    });
  });

  // Hamburger menu toggle
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  menuToggle.addEventListener("click", function () {
    navLinks.classList.toggle("active");
  });
});
