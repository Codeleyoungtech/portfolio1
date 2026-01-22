const animateCounters = () => {
  const counters = document.querySelectorAll(".stat-number");
  counters.forEach((counter) => {
    const target = parseInt(counter.textContent.replace("+", ""));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
      current += step;
      if (current < target) {
        counter.textContent =
          Math.floor(current) + (counter.textContent.includes("+") ? "+" : "");
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent =
          target + (counter.textContent.includes("+") ? "+" : "");
      }
    };

    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(updateCounter, Math.random() * 500);
          counterObserver.unobserve(entry.target);
        }
      });
    });

    counterObserver.observe(counter);
  });
};

animateCounters();

// Skill bar animations
const animateSkillBars = () => {
  const skillBars = document.querySelectorAll(".skill-progress");
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const width = bar.style.width;
        bar.style.width = "0%";
        setTimeout(() => {
          bar.style.transition = "width 1.5s ease-out";
          bar.style.width = width;
        }, 200);
        skillObserver.unobserve(bar);
      }
    });
  });

  skillBars.forEach((bar) => skillObserver.observe(bar));
};

animateSkillBars();

document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-10px) scale(1.02)";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0) scale(1)";
  });
});

document.addEventListener("mousemove", (e) => {
  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;

  const bg = document.querySelector(".animated-bg");
  if (bg) {
    const moveX = (x - 0.5) * 20;
    const moveY = (y - 0.5) * 20;
    bg.style.transform = `translate(${moveX}px, ${moveY}px)`;
  }
});

const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const submitBtn = this.querySelector(".submit-btn");
    const btnText = submitBtn.querySelector(".btn-text");
    const btnLoading = submitBtn.querySelector(".btn-loading");
    const successMessage = document.getElementById("successMessage");

    btnText.style.display = "none";
    btnLoading.style.display = "inline";
    submitBtn.disabled = true;

    setTimeout(() => {
      btnText.style.display = "inline";
      btnLoading.style.display = "none";
      submitBtn.disabled = false;

      successMessage.classList.add("show");

      this.reset();

      setTimeout(() => {
        successMessage.classList.remove("show");
      }, 5000);
    }, 2000);
  });
}

document.querySelectorAll(".method-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-10px) scale(1.02)";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0) scale(1)";
  });
});

const contactEmoji = document.querySelector(".contact-emoji");
setInterval(() => {
  if (contactEmoji) {
    contactEmoji.style.transform = `scale(1.3) rotate(${
      Math.random() * 20 - 10
    }deg)`;
    setTimeout(() => {
      contactEmoji.style.transform = "scale(1) rotate(0deg)";
    }, 400);
  }
}, 5000);

document.querySelectorAll("input, textarea, select").forEach((input) => {
  input.addEventListener("focus", () => {
    input.parentElement.style.transform = "scale(1.02)";
  });

  input.addEventListener("blur", () => {
    input.parentElement.style.transform = "scale(1)";
  });
});

document.addEventListener("mousemove", (e) => {
  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;

  const bg = document.querySelector(".animated-bg");
  if (bg) {
    const moveX = (x - 0.5) * 8;
    const moveY = (y - 0.5) * 8;
    bg.style.transform = `translate(${moveX}px, ${moveY}px)`;
  }
});

document
  .querySelectorAll(".method-action, .submit-btn, .btn")
  .forEach((btn) => {
    btn.addEventListener("click", function (e) {
      const ripple = document.createElement("span");
      ripple.style.cssText = `
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255,255,255,0.3);
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    pointer-events: none;
                `;

      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + "px";
      ripple.style.left = e.clientX - rect.left - size / 2 + "px";
      ripple.style.top = e.clientY - rect.top - size / 2 + "px";

      this.style.position = "relative";
      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

const style = document.createElement("style");
style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
document.head.appendChild(style);
