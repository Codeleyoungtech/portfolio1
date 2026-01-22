/**
 * HERO EFFECTS - Dynamic Background & Animations
 * ===============================================
 * Creates an immersive, mind-blowing hero experience with:
 * - Animated particle system
 * - Typewriter text effect
 * - 3D parallax on mouse move
 * - Floating elements
 */

class ParticleSystem {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.particles = [];
    this.mouse = { x: null, y: null, radius: 150 };
    this.animationId = null;
    this.isRunning = false;

    this.resize();
    this.init();
    this.bindEvents();
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  init() {
    this.particles = [];
    const numberOfParticles = Math.min(
      100,
      Math.floor((this.canvas.width * this.canvas.height) / 15000),
    );

    for (let i = 0; i < numberOfParticles; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        size: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.2,
        color: this.getRandomColor(),
      });
    }
  }

  getRandomColor() {
    const colors = [
      "rgba(102, 126, 234, ", // Primary blue
      "rgba(118, 75, 162, ", // Purple
      "rgba(0, 242, 254, ", // Cyan accent
      "rgba(168, 85, 247, ", // Violet
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  bindEvents() {
    window.addEventListener("resize", () => {
      this.resize();
      this.init();
    });

    window.addEventListener("mousemove", (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });

    window.addEventListener("mouseout", () => {
      this.mouse.x = null;
      this.mouse.y = null;
    });
  }

  animate() {
    if (!this.isRunning) return;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.particles.forEach((particle, index) => {
      // Update position
      particle.x += particle.speedX;
      particle.y += particle.speedY;

      // Mouse interaction - particles move away from cursor
      if (this.mouse.x !== null && this.mouse.y !== null) {
        const dx = particle.x - this.mouse.x;
        const dy = particle.y - this.mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.mouse.radius) {
          const force = (this.mouse.radius - distance) / this.mouse.radius;
          particle.x += dx * force * 0.03;
          particle.y += dy * force * 0.03;
        }
      }

      // Wrap around edges
      if (particle.x < 0) particle.x = this.canvas.width;
      if (particle.x > this.canvas.width) particle.x = 0;
      if (particle.y < 0) particle.y = this.canvas.height;
      if (particle.y > this.canvas.height) particle.y = 0;

      // Draw particle
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fillStyle = particle.color + particle.opacity + ")";
      this.ctx.fill();

      // Draw connections
      this.particles.slice(index + 1).forEach((otherParticle) => {
        const dx = particle.x - otherParticle.x;
        const dy = particle.y - otherParticle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
          this.ctx.beginPath();
          this.ctx.moveTo(particle.x, particle.y);
          this.ctx.lineTo(otherParticle.x, otherParticle.y);
          this.ctx.strokeStyle = `rgba(102, 126, 234, ${0.1 * (1 - distance / 100)})`;
          this.ctx.lineWidth = 0.5;
          this.ctx.stroke();
        }
      });
    });

    this.animationId = requestAnimationFrame(() => this.animate());
  }

  start() {
    if (!this.isRunning) {
      this.isRunning = true;
      this.animate();
    }
  }

  stop() {
    this.isRunning = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }
}

class TypewriterEffect {
  constructor(element, texts, options = {}) {
    this.element = element;
    this.texts = texts;
    this.currentIndex = 0;
    this.charIndex = 0;
    this.isDeleting = false;
    this.typeSpeed = options.typeSpeed || 100;
    this.deleteSpeed = options.deleteSpeed || 50;
    this.pauseTime = options.pauseTime || 2000;
    this.loop = options.loop !== false;

    this.originalHTML = element.innerHTML;
    this.start();
  }

  start() {
    this.type();
  }

  type() {
    const currentText = this.texts[this.currentIndex];

    if (this.isDeleting) {
      this.element.innerHTML = currentText.substring(0, this.charIndex - 1);
      this.charIndex--;
    } else {
      this.element.innerHTML = currentText.substring(0, this.charIndex + 1);
      this.charIndex++;
    }

    // Add cursor
    this.element.innerHTML += '<span class="typewriter-cursor">|</span>';

    let timeout = this.isDeleting ? this.deleteSpeed : this.typeSpeed;

    if (!this.isDeleting && this.charIndex === currentText.length) {
      // Finished typing, wait then delete
      timeout = this.pauseTime;
      this.isDeleting = true;
    } else if (this.isDeleting && this.charIndex === 0) {
      // Finished deleting, move to next text
      this.isDeleting = false;
      this.currentIndex = (this.currentIndex + 1) % this.texts.length;
      timeout = 500;
    }

    setTimeout(() => this.type(), timeout);
  }
}

class ParallaxEffect {
  constructor() {
    this.elements = document.querySelectorAll("[data-parallax]");
    this.heroImage = document.querySelector(".hero-image");
    this.floatingCards = document.querySelectorAll(".floating-card");

    this.bindEvents();
  }

  bindEvents() {
    document.addEventListener("mousemove", (e) => this.handleMouseMove(e));
  }

  handleMouseMove(e) {
    const x = (e.clientX - window.innerWidth / 2) / window.innerWidth;
    const y = (e.clientY - window.innerHeight / 2) / window.innerHeight;

    // Move hero image slightly
    if (this.heroImage) {
      this.heroImage.style.transform = `translate(${x * 20}px, ${y * 20}px)`;
    }

    // Move floating cards with different intensities
    this.floatingCards.forEach((card, index) => {
      const intensity = (index + 1) * 10;
      const rotateX = y * 5;
      const rotateY = -x * 5;
      card.style.transform = `
        translate(${x * intensity}px, ${y * intensity}px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
      `;
    });
  }
}

class GlowingOrb {
  constructor() {
    this.orb = document.createElement("div");
    this.orb.className = "glowing-orb";
    this.orb.innerHTML = `
      <div class="orb-core"></div>
      <div class="orb-ring orb-ring-1"></div>
      <div class="orb-ring orb-ring-2"></div>
      <div class="orb-ring orb-ring-3"></div>
    `;

    this.injectStyles();
  }

  injectStyles() {
    if (document.getElementById("glowing-orb-styles")) return;

    const style = document.createElement("style");
    style.id = "glowing-orb-styles";
    style.textContent = `
      .glowing-orb {
        position: absolute;
        width: 300px;
        height: 300px;
        pointer-events: none;
      }
      
      .orb-core {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 100px;
        height: 100px;
        background: radial-gradient(circle, rgba(102, 126, 234, 0.8) 0%, transparent 70%);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        animation: orb-pulse 3s ease-in-out infinite;
      }
      
      .orb-ring {
        position: absolute;
        top: 50%;
        left: 50%;
        border-radius: 50%;
        border: 1px solid rgba(102, 126, 234, 0.3);
        transform: translate(-50%, -50%);
      }
      
      .orb-ring-1 {
        width: 150px;
        height: 150px;
        animation: orb-ring-rotate 8s linear infinite;
      }
      
      .orb-ring-2 {
        width: 200px;
        height: 200px;
        animation: orb-ring-rotate 12s linear infinite reverse;
      }
      
      .orb-ring-3 {
        width: 280px;
        height: 280px;
        animation: orb-ring-rotate 16s linear infinite;
      }
      
      @keyframes orb-pulse {
        0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.8; }
        50% { transform: translate(-50%, -50%) scale(1.2); opacity: 1; }
      }
      
      @keyframes orb-ring-rotate {
        from { transform: translate(-50%, -50%) rotate(0deg); }
        to { transform: translate(-50%, -50%) rotate(360deg); }
      }
      
      /* Typewriter cursor */
      .typewriter-cursor {
        animation: blink 1s step-end infinite;
        color: var(--ds-accent-cyan, #00f2fe);
        font-weight: 100;
      }
      
      @keyframes blink {
        50% { opacity: 0; }
      }
      
      /* Particle canvas */
      #particle-canvas {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
      }
      
      /* Enhanced floating cards */
      .floating-card {
        transition: transform 0.1s ease-out;
        transform-style: preserve-3d;
        backface-visibility: hidden;
      }
      
      /* Hero entrance animations */
      .hero-content {
        animation: hero-slide-in 1s ease-out forwards;
      }
      
      .hero-image {
        animation: hero-fade-up 1.2s ease-out forwards;
        animation-delay: 0.3s;
        opacity: 0;
      }
      
      @keyframes hero-slide-in {
        from {
          opacity: 0;
          transform: translateX(-50px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }
      
      @keyframes hero-fade-up {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      /* Gradient text shimmer */
      .hero-title {
        background-size: 200% auto;
        animation: text-shimmer 3s linear infinite;
      }
      
      @keyframes text-shimmer {
        to {
          background-position: 200% center;
        }
      }
    `;
    document.head.appendChild(style);
  }

  attachTo(container) {
    container.appendChild(this.orb);
  }
}

// Initialize effects when DOM is ready
function initHeroEffects() {
  // Create particle canvas
  const canvas = document.createElement("canvas");
  canvas.id = "particle-canvas";
  document.body.insertBefore(canvas, document.body.firstChild);

  // Start particle system
  const particles = new ParticleSystem(canvas);
  particles.start();

  // Pause particles when tab is not visible
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      particles.stop();
    } else {
      particles.start();
    }
  });

  // Initialize parallax effect
  new ParallaxEffect();

  // Initialize typewriter on hero subtitle
  const heroSubtitle = document.querySelector(".hero-subtitle");
  if (heroSubtitle) {
    const texts = [
      "Creativity at it's peak.",
      "Building the future.",
      "Tech Innovator & Creator.",
      "Founder of Eleyoungtech.",
    ];
    new TypewriterEffect(heroSubtitle, texts, {
      typeSpeed: 80,
      deleteSpeed: 40,
      pauseTime: 2500,
    });
  }

  // Add glowing orb effect
  const heroImageContainer = document.querySelector(".image-container");
  if (heroImageContainer) {
    const orb = new GlowingOrb();
    orb.attachTo(heroImageContainer);
  }
}

// Start on DOM ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initHeroEffects);
} else {
  initHeroEffects();
}

// Export for external use
window.HeroEffects = {
  ParticleSystem,
  TypewriterEffect,
  ParallaxEffect,
  GlowingOrb,
};
