/**
 * PAGE TRANSITIONS & NAVIGATION EFFECTS
 * ======================================
 * Smooth page transitions, scroll effects, and navigation enhancements
 */

class NavigationController {
  constructor() {
    this.header = document.querySelector("header");
    this.navLinks = document.querySelectorAll(
      ".nav-links a, .mobile-nav-links a",
    );
    this.sections = document.querySelectorAll("section[id]");
    this.lastScrollY = 0;
    this.scrollThreshold = 50;

    this.init();
  }

  init() {
    this.createScrollProgress();
    this.bindScrollEvents();
    this.bindNavigationEvents();
    this.initActiveSection();
    this.enhanceMobileNav();
  }

  // ================================
  // SCROLL PROGRESS INDICATOR
  // ================================

  createScrollProgress() {
    const progress = document.createElement("div");
    progress.className = "scroll-progress";
    progress.innerHTML = '<div class="scroll-progress-bar"></div>';
    document.body.appendChild(progress);

    this.progressBar = progress.querySelector(".scroll-progress-bar");

    // Inject styles
    if (!document.getElementById("nav-effects-styles")) {
      const style = document.createElement("style");
      style.id = "nav-effects-styles";
      style.textContent = `
        .scroll-progress {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 3px;
          background: rgba(255, 255, 255, 0.1);
          z-index: 1001;
        }

        .scroll-progress-bar {
          height: 100%;
          width: 0%;
          background: var(--ds-gradient-accent, linear-gradient(90deg, #4facfe, #00f2fe));
          transition: width 0.1s ease-out;
        }

        /* Header scroll states */
        header {
          transition: all 0.3s ease;
        }

        header.scrolled {
          padding: 12px 0;
          background: var(--ds-nav-bg, rgba(10, 10, 10, 0.95));
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
        }

        header.hidden-nav {
          transform: translateY(-100%);
        }

        /* Page transition overlay */
        .page-transition {
          position: fixed;
          inset: 0;
          background: var(--ds-bg-primary, #000);
          z-index: 9999;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .page-transition.active {
          opacity: 1;
          pointer-events: all;
        }

        /* Smooth reveal for page content */
        .page-loaded .reveal {
          opacity: 1;
          transform: translateY(0);
        }

        /* Active nav link indicator */
        .nav-links a.section-active,
        .mobile-nav-links a.section-active {
          color: var(--ds-text-primary, #fff);
        }

        .nav-links a.section-active::after {
          transform: scaleX(1);
          transform-origin: left;
        }

        /* Scroll to top button */
        .scroll-to-top {
          position: fixed;
          bottom: 80px;
          right: 24px;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: var(--ds-glass-bg-strong, rgba(255,255,255,0.1));
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid var(--ds-border-default, rgba(255,255,255,0.1));
          color: var(--ds-text-primary, #fff);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
          opacity: 0;
          visibility: hidden;
          transform: translateY(20px);
          transition: all 0.3s ease;
          z-index: 998;
        }

        .scroll-to-top.visible {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }

        .scroll-to-top:hover {
          background: var(--ds-primary, #667eea);
          transform: translateY(-3px);
        }

        /* Mobile menu enhancements */
        .mobile-nav {
          transition: right 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .mobile-nav-backdrop {
          transition: opacity 0.3s ease, visibility 0.3s ease;
        }

        @media (max-width: 768px) {
          .scroll-to-top {
            bottom: 70px;
            right: 16px;
            width: 42px;
            height: 42px;
          }
        }
      `;
      document.head.appendChild(style);
    }

    // Create scroll to top button
    this.createScrollToTop();
  }

  createScrollToTop() {
    const btn = document.createElement("button");
    btn.className = "scroll-to-top";
    btn.innerHTML = "↑";
    btn.setAttribute("aria-label", "Scroll to top");

    btn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    document.body.appendChild(btn);
    this.scrollToTopBtn = btn;
  }

  // ================================
  // SCROLL EVENTS
  // ================================

  bindScrollEvents() {
    let ticking = false;

    window.addEventListener("scroll", () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          this.handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  handleScroll() {
    const scrollY = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    // Update progress bar
    if (this.progressBar) {
      const progress = (scrollY / docHeight) * 100;
      this.progressBar.style.width = `${progress}%`;
    }

    // Header scroll state
    if (scrollY > this.scrollThreshold) {
      this.header.classList.add("scrolled");
    } else {
      this.header.classList.remove("scrolled");
    }

    // Hide/show header on scroll direction
    if (scrollY > this.lastScrollY && scrollY > 200) {
      this.header.classList.add("hidden-nav");
    } else {
      this.header.classList.remove("hidden-nav");
    }
    this.lastScrollY = scrollY;

    // Scroll to top button
    if (this.scrollToTopBtn) {
      if (scrollY > 500) {
        this.scrollToTopBtn.classList.add("visible");
      } else {
        this.scrollToTopBtn.classList.remove("visible");
      }
    }

    // Update active section
    this.updateActiveSection();
  }

  // ================================
  // ACTIVE SECTION TRACKING
  // ================================

  initActiveSection() {
    // Mark page as loaded for animations
    setTimeout(() => {
      document.body.classList.add("page-loaded");
    }, 100);
  }

  updateActiveSection() {
    if (this.sections.length === 0) return;

    let current = "";
    const scrollY = window.scrollY + 200;

    this.sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      if (scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    this.navLinks.forEach((link) => {
      link.classList.remove("section-active");
      const href = link.getAttribute("href");
      if (href && href.includes("#" + current)) {
        link.classList.add("section-active");
      }
    });
  }

  // ================================
  // NAVIGATION EVENTS
  // ================================

  bindNavigationEvents() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        const href = anchor.getAttribute("href");
        if (href === "#") return;

        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const offsetTop = target.offsetTop - 80;
          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          });
        }
      });
    });

    // Page transition for internal links
    document.querySelectorAll('a[href$=".html"]').forEach((link) => {
      link.addEventListener("click", (e) => {
        const href = link.getAttribute("href");
        if (href && !href.startsWith("http") && !link.target) {
          e.preventDefault();
          this.navigateTo(href);
        }
      });
    });
  }

  navigateTo(url) {
    // Create transition overlay if it doesn't exist
    let overlay = document.querySelector(".page-transition");
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.className = "page-transition";
      document.body.appendChild(overlay);
    }

    // Trigger transition
    overlay.classList.add("active");

    setTimeout(() => {
      window.location.href = url;
    }, 300);
  }

  // ================================
  // MOBILE NAV ENHANCEMENTS
  // ================================

  enhanceMobileNav() {
    const mobileNav = document.querySelector(".mobile-nav");
    const backdrop = document.querySelector(".mobile-nav-backdrop");
    const hamMenu = document.querySelector(".ham-menu");

    if (!mobileNav || !hamMenu) return;

    // Touch gestures for swipe to close
    let touchStartX = 0;
    let touchEndX = 0;

    mobileNav.addEventListener(
      "touchstart",
      (e) => {
        touchStartX = e.changedTouches[0].screenX;
      },
      { passive: true },
    );

    mobileNav.addEventListener(
      "touchend",
      (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const swipeDistance = touchEndX - touchStartX;

        // Swipe right to close
        if (swipeDistance > 100) {
          this.closeMobileNav(mobileNav, backdrop, hamMenu);
        }
      },
      { passive: true },
    );

    // Close on backdrop click
    if (backdrop) {
      backdrop.addEventListener("click", () => {
        this.closeMobileNav(mobileNav, backdrop, hamMenu);
      });
    }

    // Close on link click
    mobileNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        setTimeout(() => {
          this.closeMobileNav(mobileNav, backdrop, hamMenu);
        }, 150);
      });
    });
  }

  closeMobileNav(nav, backdrop, hamMenu) {
    nav.classList.remove("active");
    if (backdrop) backdrop.classList.remove("active");
    if (hamMenu) hamMenu.classList.remove("active");
  }
}

// Initialize on DOM ready
if (document.readyState === "loading") {
  document.addEventListener(
    "DOMContentLoaded",
    () => new NavigationController(),
  );
} else {
  new NavigationController();
}

// Export for external use
window.NavigationController = NavigationController;
