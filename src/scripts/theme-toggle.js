/**
 * THEME TOGGLE - Dark/Light Mode Controller
 * ==========================================
 * Manages theme state with localStorage persistence
 * and system preference detection
 */

class ThemeController {
  constructor() {
    this.storageKey = "portfolio-theme";
    this.init();
  }

  init() {
    // Get saved theme or detect system preference
    const savedTheme = localStorage.getItem(this.storageKey);
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    const theme = savedTheme || (systemPrefersDark ? "dark" : "dark"); // Default to dark
    this.setTheme(theme, false);

    // Listen for system preference changes
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (e) => {
        if (!localStorage.getItem(this.storageKey)) {
          this.setTheme(e.matches ? "dark" : "light", false);
        }
      });

    // Create toggle button if it doesn't exist
    this.createToggleButton();
  }

  setTheme(theme, save = true) {
    document.documentElement.setAttribute("data-theme", theme);

    if (save) {
      localStorage.setItem(this.storageKey, theme);
    }

    // Update toggle button icon
    this.updateToggleIcon(theme);
  }

  toggle() {
    const current =
      document.documentElement.getAttribute("data-theme") || "dark";
    const newTheme = current === "dark" ? "light" : "dark";
    this.setTheme(newTheme);
  }

  createToggleButton() {
    // Check if button already exists
    if (document.getElementById("theme-toggle")) return;

    const button = document.createElement("button");
    button.id = "theme-toggle";
    button.className = "theme-toggle";
    button.setAttribute("aria-label", "Toggle theme");
    button.innerHTML = this.getIcon("dark");

    button.addEventListener("click", () => this.toggle());

    // Add styles
    const style = document.createElement("style");
    style.textContent = `
      .theme-toggle {
        position: fixed;
        bottom: 24px;
        right: 24px;
        width: 48px;
        height: 48px;
        border-radius: 50%;
        border: 1px solid var(--ds-border-default);
        background: var(--ds-glass-bg-strong);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        cursor: pointer;
        z-index: 999;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.25rem;
        transition: all 0.3s ease;
        box-shadow: var(--ds-shadow-md);
      }

      .theme-toggle:hover {
        transform: scale(1.1);
        box-shadow: var(--ds-shadow-lg);
        border-color: var(--ds-primary);
      }

      .theme-toggle:active {
        transform: scale(0.95);
      }

      .theme-toggle svg {
        width: 24px;
        height: 24px;
        transition: transform 0.3s ease;
      }

      .theme-toggle:hover svg {
        transform: rotate(15deg);
      }

      /* Animation on theme change */
      .theme-toggle.switching svg {
        animation: theme-switch 0.5s ease;
      }

      @keyframes theme-switch {
        0% { transform: scale(1) rotate(0); }
        50% { transform: scale(0) rotate(180deg); }
        100% { transform: scale(1) rotate(360deg); }
      }

      @media (max-width: 768px) {
        .theme-toggle {
          bottom: 16px;
          right: 16px;
          width: 42px;
          height: 42px;
        }
      }
    `;
    document.head.appendChild(style);
    document.body.appendChild(button);
  }

  updateToggleIcon(theme) {
    const button = document.getElementById("theme-toggle");
    if (button) {
      button.classList.add("switching");
      setTimeout(() => {
        button.innerHTML = this.getIcon(theme);
        button.classList.remove("switching");
      }, 250);
    }
  }

  getIcon(theme) {
    if (theme === "dark") {
      // Sun icon (click to switch to light)
      return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>`;
    } else {
      // Moon icon (click to switch to dark)
      return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>`;
    }
  }
}

// Initialize theme controller when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => new ThemeController());
} else {
  new ThemeController();
}

// Export for external use
window.ThemeController = ThemeController;
