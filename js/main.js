// Theme Management
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;
const sunIcon = document.getElementById("sun-icon");
const moonIcon = document.getElementById("moon-icon");

const updateIcons = (theme) => {
  if (theme === "dark") {
    sunIcon.style.display = "none";
    moonIcon.style.display = "block";
  } else {
    sunIcon.style.display = "block";
    moonIcon.style.display = "none";
  }
};

const savedTheme =
  localStorage.getItem("theme") ||
  (window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light");
body.setAttribute("data-theme", savedTheme);
updateIcons(savedTheme);

themeToggle.addEventListener("click", () => {
  const currentTheme = body.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  body.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  updateIcons(newTheme);
});

// Image Lightbox
const modal = document.getElementById("image-modal");
const trigger = document.getElementById("profile-img-trigger");
const modalImg = document.getElementById("img-expanded");
const closeBtn = document.querySelector(".close-modal");

trigger.addEventListener("click", () => {
  const profileImg = trigger.querySelector("img");
  modal.style.display = "block";
  modalImg.src = profileImg.src;
});

const closeModal = () => {
  modal.style.display = "none";
};

closeBtn.addEventListener("click", closeModal);
window.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

// Scroll Progress Bar
window.onscroll = () => {
  const winScroll =
    document.body.scrollTop || document.documentElement.scrollTop;
  const height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  document.getElementById("scroll-progress").style.width = scrolled + "%";
};

// Skills Toggle (Show more / Show less)
const toggleSkillsBtn = document.getElementById("toggle-skills");
const moreSkills = document.querySelectorAll(".more-skill");

toggleSkillsBtn.addEventListener("click", () => {
  const isHidden = moreSkills[0].style.display !== "inline-block";

  moreSkills.forEach((skill) => {
    skill.style.display = isHidden ? "inline-block" : "none";
  });

  toggleSkillsBtn.textContent = isHidden ? "Show less" : "Show more";
});

// Intersection Observer for Reveal
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal-text");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll("section, h2, .exp-item").forEach((el) => {
  observer.observe(el);
});

// Back to Top Smooth Scroll
const backToTopBtn = document.getElementById("back-to-top");
if (backToTopBtn) {
  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}
