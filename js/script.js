document.addEventListener("DOMContentLoaded", () => {
    let currentIndex = 0;
    const slides = document.querySelectorAll(".hero-slide");
    const totalSlides = slides.length;
    const slideWrapper = document.querySelector(".hero-images-wrapper");
    const prevArrow = document.getElementById("prevArrow");
    const nextArrow = document.getElementById("nextArrow");

    function showSlide(index) {
      slideWrapper.style.transform = `translateX(-${index * 100}%)`;
    }

    let slideInterval;

    function startSlideInterval() {
      slideInterval = setInterval(() => {
        currentIndex =
          currentIndex === totalSlides - 1 ? 0 : currentIndex + 1;
        showSlide(currentIndex);
      }, 10000);
    }

    function stopSlideInterval() {
      clearInterval(slideInterval);
    }

    startSlideInterval();

    const heroSection = document.querySelector(".hero-section");

    window.addEventListener("scroll", () => {
      if (heroSection && isInViewport(heroSection)) {
        startSlideInterval();
      } else {
        stopSlideInterval();
      }
    });

    const serviceCarousel = document.getElementById("serviceCarousel");
    const progressBar = document.getElementById("carouselProgress");

    serviceCarousel.addEventListener("slide.bs.carousel", (e) => {
      const totalItems = document.querySelectorAll(
        "#serviceCarousel .carousel-item"
      ).length;
      const newIndex = e.to;
      const progressPercent = ((newIndex + 1) / totalItems) * 100;
      progressBar.style.width = `${progressPercent}%`;
      progressBar.setAttribute("aria-valuenow", progressPercent);
    });

    function animateNumbers(element, target, duration) {
      let startTimestamp = null;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = timestamp - startTimestamp;
        const increment = Math.min(progress / duration, 1) * target;

        element.textContent =
          target % 1 === 0 ? Math.floor(increment) : increment.toFixed(1);

        if (progress < duration) {
          requestAnimationFrame(step);
        } else {
          element.textContent = target;
        }
      };

      requestAnimationFrame(step);
    }

    function startObserving() {
      const numbers = document.querySelectorAll(".stat-number");
      let hasAnimated = false;

      if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
          (entries, observer) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                console.log(
                  "Stats section is in viewport (Observer Triggered)"
                );
                numbers.forEach((number) => {
                  const target = parseFloat(
                    number.getAttribute("data-target")
                  );
                  animateNumbers(number, target, 2000);
                });
                observer.disconnect();
              }
            });
          },
          { threshold: 0.4 }
        );

        observer.observe(document.getElementById("stats"));
      } else {
        console.warn(
          "IntersectionObserver not supported, using scroll event fallback."
        );

        window.addEventListener(
          "scroll",
          function scrollHandler() {
            if (
              isInViewport(document.getElementById("stats")) &&
              !hasAnimated
            ) {
              hasAnimated = true;
              console.log(
                "Stats section is in viewport (Scroll Triggered)"
              );
              numbers.forEach((number) => {
                const target = parseFloat(
                  number.getAttribute("data-target")
                );
                animateNumbers(number, target, 2000);
              });
              window.removeEventListener("scroll", scrollHandler);
            }
          },
          { passive: true }
        );
      }
    }

    function isInViewport(element) {
      const rect = element.getBoundingClientRect();
      console.log(
        `Element position - top: ${rect.top}, bottom: ${rect.bottom}, window height: ${window.innerHeight}`
      );
      return rect.top < window.innerHeight && rect.bottom >= 0;
    }

    window.addEventListener("load", () => {
      console.log("Page fully loaded.");
      startObserving();
    });
  });
 

  const scrollToTopBtn = document.getElementById("scrollToTopBtn");

  window.onscroll = function () {
    if (
      document.body.scrollTop > 400 ||
      document.documentElement.scrollTop > 400
    ) {
      scrollToTopBtn.style.display = "block";
    } else {
      scrollToTopBtn.style.display = "none";
    }
  };

  scrollToTopBtn.onclick = function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  AOS.init({
    duration: 1200, 
    once: true
  });
  document.addEventListener("DOMContentLoaded", function () {
    const section = document.getElementById("robot-section");
  
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            section.classList.add("visible");
          }
        });
      },
      { threshold: 0.2 } 
    );
  
    observer.observe(section);
  });
  
  $(document).ready(function () {
    // Navbar Active State
    $(".nav-link").click(function () {
      $(".nav-link").removeClass("active");
      $(this).addClass("active");
    });
  
    // Search Bar Functionality
    $(".search-input").on("keyup", function () {
      let query = $(this).val().trim();
      let resultsBox = $(".search-results");
  
      if (query.length > 0) {
        // Simulated search results (Replace with AJAX call if needed)
        let results = ["Service 1", "Service 2", "Contact", "About Us"].filter((item) =>
          item.toLowerCase().includes(query.toLowerCase())
        );
  
        resultsBox.html(
          results.map((item) => `<div class="p-2">${item}</div>`).join("")
        ).removeClass("d-none");
      } else {
        resultsBox.addClass("d-none");
      }
    });
  
    // Hide search results on clicking outside
    $(document).click(function (e) {
      if (!$(e.target).closest(".search-box").length) {
        $(".search-results").addClass("d-none");
      }
    });
  });
  