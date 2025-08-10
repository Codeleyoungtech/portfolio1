const hamMenu = document.querySelector(".ham-menu");
const mobileNav = document.querySelector(".mobile-nav");
const mobileBackdrop = document.querySelector(".mobile-nav-backdrop");

function toggleMenu() {
  hamMenu.classList.toggle("active");
  mobileNav.classList.toggle("active");
  mobileBackdrop.classList.toggle("active");
}

hamMenu.addEventListener("click", toggleMenu);
mobileBackdrop.addEventListener("click", toggleMenu);

// Optional: Close nav when clicking a link
document.querySelectorAll(".mobile-nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    hamMenu.classList.remove("active");
    mobileNav.classList.remove("active");
    mobileBackdrop.classList.remove("active");
  });
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    }
  });
}, observerOptions);

document.querySelectorAll(".reveal").forEach((el) => {
  observer.observe(el);
});

const heroTitle = document.querySelector(".hero-title");
const text = heroTitle.textContent;
heroTitle.textContent = "";

let i = 0;
const typeWriter = () => {
  if (i < text.length) {
    heroTitle.textContent += text.charAt(i);
    i++;
    setTimeout(typeWriter, 100);
  }
};

setTimeout(typeWriter, 1000);

document.querySelectorAll(".experience-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-10px) scale(1.02)";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0) scale(1)";
  });
});

document.addEventListener("mousemove", (e) => {
  const cards = document.querySelectorAll(".floating-card");
  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;

  cards.forEach((card, index) => {
    const speed = (index + 1) * 0.5;
    const xPos = (x - 0.5) * speed * 20;
    const yPos = (y - 0.5) * speed * 20;
    card.style.transform = `translate(${xPos}px, ${yPos}px)`;
  });
});
