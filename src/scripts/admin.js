/**
 * ADMIN DASHBOARD - JavaScript Controller
 * ========================================
 * Handles project CRUD operations, state management,
 * and localStorage persistence
 */

class AdminDashboard {
  constructor() {
    // Default password (you should change this)
    this.PASSWORD = "admin123";
    this.AUTH_KEY = "portfolio_admin_auth";
    this.PROJECTS_KEY = "portfolio_projects";

    this.projects = [];
    this.currentProjectId = null;
    this.isNewProject = false;

    this.init();
  }

  init() {
    this.cacheElements();
    this.bindEvents();
    this.checkAuth();
  }

  cacheElements() {
    // Auth elements
    this.authGate = document.getElementById("auth-gate");
    this.authForm = document.getElementById("auth-form");
    this.passwordInput = document.getElementById("admin-password");
    this.authError = document.getElementById("auth-error");

    // Dashboard elements
    this.dashboard = document.getElementById("dashboard");
    this.projectsList = document.getElementById("projects-list");
    this.editorPlaceholder = document.getElementById("editor-placeholder");
    this.projectEditor = document.getElementById("project-editor");
    this.editorTitle = document.getElementById("editor-title");

    // Form elements
    this.form = {
      id: document.getElementById("project-id"),
      title: document.getElementById("project-title"),
      category: document.getElementById("project-category"),
      status: document.getElementById("project-status"),
      description: document.getElementById("project-description"),
      hasPreviewImage: document.getElementById("has-preview-image"),
      previewLogo: document.getElementById("preview-logo"),
      previewTitle: document.getElementById("preview-title"),
      previewUrl: document.getElementById("preview-url"),
      liveUrl: document.getElementById("live-url"),
      demoUrl: document.getElementById("demo-url"),
      sourceUrl: document.getElementById("source-url"),
      docsUrl: document.getElementById("docs-url"),
    };

    // Tech tags
    this.techTags = document.getElementById("tech-tags");
    this.techInput = document.getElementById("tech-input");
    this.addTechBtn = document.getElementById("add-tech-btn");

    // Buttons
    this.addProjectBtn = document.getElementById("add-project-btn");
    this.deleteBtn = document.getElementById("delete-btn");
    this.importBtn = document.getElementById("import-btn");
    this.exportBtn = document.getElementById("export-btn");
    this.previewBtn = document.getElementById("preview-btn");
    this.logoutBtn = document.getElementById("logout-btn");
    this.importInput = document.getElementById("import-input");

    // Toast container
    this.toastContainer = document.getElementById("toast-container");
  }

  bindEvents() {
    // Auth
    this.authForm.addEventListener("submit", (e) => this.handleLogin(e));
    this.logoutBtn.addEventListener("click", () => this.handleLogout());

    // Project actions
    this.addProjectBtn.addEventListener("click", () => this.createNewProject());
    this.projectEditor.addEventListener("submit", (e) => this.handleSave(e));
    this.deleteBtn.addEventListener("click", () => this.handleDelete());

    // Tech tags
    this.addTechBtn.addEventListener("click", () => this.addTechnology());
    this.techInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        this.addTechnology();
      }
    });

    // Import/Export
    this.importBtn.addEventListener("click", () => this.importInput.click());
    this.importInput.addEventListener("change", (e) => this.handleImport(e));
    this.exportBtn.addEventListener("click", () => this.handleExport());

    // Preview
    this.previewBtn.addEventListener("click", () => {
      window.open("work.html", "_blank");
    });
  }

  // ================================
  // AUTHENTICATION
  // ================================

  checkAuth() {
    const isAuthenticated = sessionStorage.getItem(this.AUTH_KEY) === "true";
    if (isAuthenticated) {
      this.showDashboard();
    }
  }

  handleLogin(e) {
    e.preventDefault();
    const password = this.passwordInput.value;

    if (password === this.PASSWORD) {
      sessionStorage.setItem(this.AUTH_KEY, "true");
      this.showDashboard();
      this.authError.textContent = "";
    } else {
      this.authError.textContent = "Incorrect password. Try again.";
      this.passwordInput.value = "";
      this.passwordInput.focus();
    }
  }

  handleLogout() {
    sessionStorage.removeItem(this.AUTH_KEY);
    this.authGate.classList.remove("hidden");
    this.dashboard.classList.add("hidden");
    this.passwordInput.value = "";
  }

  showDashboard() {
    this.authGate.classList.add("hidden");
    this.dashboard.classList.remove("hidden");
    this.loadProjects();
  }

  // ================================
  // DATA MANAGEMENT
  // ================================

  async loadProjects() {
    try {
      // Try to load from localStorage first
      const localData = localStorage.getItem(this.PROJECTS_KEY);
      if (localData) {
        this.projects = JSON.parse(localData);
      } else {
        // Fall back to fetching the JSON file
        const response = await fetch("./data/projects.json");
        if (response.ok) {
          this.projects = await response.json();
          this.saveToLocalStorage();
        }
      }
      this.renderProjectsList();
    } catch (error) {
      console.error("Error loading projects:", error);
      this.showToast("Failed to load projects", "error");
    }
  }

  saveToLocalStorage() {
    localStorage.setItem(this.PROJECTS_KEY, JSON.stringify(this.projects));
  }

  // ================================
  // RENDERING
  // ================================

  renderProjectsList() {
    this.projectsList.innerHTML = "";

    if (this.projects.length === 0) {
      this.projectsList.innerHTML = `
        <div style="text-align: center; padding: 40px 20px; color: var(--ds-text-tertiary);">
          <p>No projects yet.</p>
          <p>Click "Add New" to create one.</p>
        </div>
      `;
      return;
    }

    this.projects.forEach((project) => {
      const item = document.createElement("div");
      item.className = `project-item ${project.id === this.currentProjectId ? "active" : ""}`;
      item.dataset.id = project.id;

      const logoText =
        project.previewLogo || project.title.substring(0, 2).toUpperCase();
      const statusClass =
        project.status === "complete" ? "complete" : "in-progress";
      const statusText = project.status === "complete" ? "Done" : "WIP";

      item.innerHTML = `
        <div class="project-item-icon">${logoText}</div>
        <div class="project-item-info">
          <div class="project-item-title">${project.title}</div>
          <div class="project-item-category">${project.category}</div>
        </div>
        <span class="project-item-status ${statusClass}">${statusText}</span>
      `;

      item.addEventListener("click", () => this.selectProject(project.id));
      this.projectsList.appendChild(item);
    });
  }

  renderTechTags(technologies = []) {
    this.techTags.innerHTML = "";
    technologies.forEach((tech) => {
      const tag = document.createElement("span");
      tag.className = "tech-tag";
      tag.innerHTML = `
        ${tech}
        <span class="tech-tag-remove" data-tech="${tech}">×</span>
      `;
      tag.querySelector(".tech-tag-remove").addEventListener("click", (e) => {
        e.stopPropagation();
        this.removeTechnology(tech);
      });
      this.techTags.appendChild(tag);
    });
  }

  // ================================
  // PROJECT OPERATIONS
  // ================================

  createNewProject() {
    this.isNewProject = true;
    this.currentProjectId = null;

    // Clear form
    Object.values(this.form).forEach((el) => {
      if (el.type === "checkbox") {
        el.checked = true;
      } else {
        el.value = "";
      }
    });

    this.form.status.value = "in-progress";
    this.form.category.value = "Web App";
    this.renderTechTags([]);

    this.editorTitle.textContent = "New Project";
    this.editorPlaceholder.classList.add("hidden");
    this.projectEditor.classList.remove("hidden");
    this.deleteBtn.style.display = "none";

    // Clear active state from list
    document
      .querySelectorAll(".project-item")
      .forEach((el) => el.classList.remove("active"));

    this.form.id.focus();
  }

  selectProject(id) {
    this.isNewProject = false;
    this.currentProjectId = id;

    const project = this.projects.find((p) => p.id === id);
    if (!project) return;

    // Populate form
    this.form.id.value = project.id;
    this.form.title.value = project.title;
    this.form.category.value = project.category;
    this.form.status.value = project.status;
    this.form.description.value = project.description || "";
    this.form.hasPreviewImage.checked = project.hasPreviewImage !== false;
    this.form.previewLogo.value = project.previewLogo || "";
    this.form.previewTitle.value = project.previewTitle || "";
    this.form.previewUrl.value = project.previewUrl || "";
    this.form.liveUrl.value = project.liveUrl || "";
    this.form.demoUrl.value = project.demoUrl || "";
    this.form.sourceUrl.value = project.sourceUrl || "";
    this.form.docsUrl.value = project.docsUrl || "";

    this.renderTechTags(project.technologies || []);

    this.editorTitle.textContent = "Edit Project";
    this.editorPlaceholder.classList.add("hidden");
    this.projectEditor.classList.remove("hidden");
    this.deleteBtn.style.display = "inline-flex";

    // Update active state in list
    document.querySelectorAll(".project-item").forEach((el) => {
      el.classList.toggle("active", el.dataset.id === id);
    });
  }

  handleSave(e) {
    e.preventDefault();

    const projectData = {
      id: this.form.id.value.trim(),
      title: this.form.title.value.trim(),
      category: this.form.category.value,
      status: this.form.status.value,
      description: this.form.description.value.trim(),
      technologies: this.getCurrentTechnologies(),
      hasPreviewImage: this.form.hasPreviewImage.checked,
      previewLogo: this.form.previewLogo.value.trim(),
      previewTitle: this.form.previewTitle.value.trim(),
      previewUrl: this.form.previewUrl.value.trim(),
      liveUrl: this.form.liveUrl.value.trim() || undefined,
      demoUrl: this.form.demoUrl.value.trim() || undefined,
      sourceUrl: this.form.sourceUrl.value.trim() || undefined,
      docsUrl: this.form.docsUrl.value.trim() || undefined,
    };

    // Validate
    if (!projectData.id || !projectData.title) {
      this.showToast("ID and Title are required", "error");
      return;
    }

    if (this.isNewProject) {
      // Check for duplicate ID
      if (this.projects.some((p) => p.id === projectData.id)) {
        this.showToast("A project with this ID already exists", "error");
        return;
      }
      this.projects.push(projectData);
      this.showToast("Project created successfully", "success");
    } else {
      const index = this.projects.findIndex(
        (p) => p.id === this.currentProjectId,
      );
      if (index !== -1) {
        this.projects[index] = projectData;
        this.showToast("Project saved successfully", "success");
      }
    }

    this.currentProjectId = projectData.id;
    this.isNewProject = false;
    this.saveToLocalStorage();
    this.renderProjectsList();
  }

  handleDelete() {
    if (!this.currentProjectId) return;

    if (!confirm("Are you sure you want to delete this project?")) return;

    this.projects = this.projects.filter((p) => p.id !== this.currentProjectId);
    this.saveToLocalStorage();
    this.renderProjectsList();

    this.currentProjectId = null;
    this.projectEditor.classList.add("hidden");
    this.editorPlaceholder.classList.remove("hidden");

    this.showToast("Project deleted", "info");
  }

  // ================================
  // TECHNOLOGY TAGS
  // ================================

  getCurrentTechnologies() {
    const tags = this.techTags.querySelectorAll(".tech-tag");
    return Array.from(tags).map((tag) =>
      tag.textContent.replace("×", "").trim(),
    );
  }

  addTechnology() {
    const tech = this.techInput.value.trim();
    if (!tech) return;

    const current = this.getCurrentTechnologies();
    if (current.includes(tech)) {
      this.showToast("Technology already added", "error");
      return;
    }

    current.push(tech);
    this.renderTechTags(current);
    this.techInput.value = "";
    this.techInput.focus();
  }

  removeTechnology(tech) {
    const current = this.getCurrentTechnologies().filter((t) => t !== tech);
    this.renderTechTags(current);
  }

  // ================================
  // IMPORT / EXPORT
  // ================================

  handleImport(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target.result);
        if (!Array.isArray(imported)) {
          throw new Error("Invalid format - expected array");
        }

        this.projects = imported;
        this.saveToLocalStorage();
        this.renderProjectsList();
        this.showToast(`Imported ${imported.length} projects`, "success");

        // Reset editor
        this.currentProjectId = null;
        this.projectEditor.classList.add("hidden");
        this.editorPlaceholder.classList.remove("hidden");
      } catch (error) {
        console.error("Import error:", error);
        this.showToast("Failed to import: Invalid JSON", "error");
      }
    };
    reader.readAsText(file);

    // Reset input
    e.target.value = "";
  }

  handleExport() {
    const dataStr = JSON.stringify(this.projects, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "projects.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    this.showToast("Projects exported to projects.json", "success");
  }

  // ================================
  // TOAST NOTIFICATIONS
  // ================================

  showToast(message, type = "info") {
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.textContent = message;

    this.toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = "toast-out 0.3s ease-out forwards";
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }
}

// Initialize on DOM ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => new AdminDashboard());
} else {
  new AdminDashboard();
}
