// projects-loader.js - Simplified Dynamic Project Card Generator

// Wait for page to load
window.addEventListener("load", function () {
  loadProjects();
});

async function loadProjects() {
  const container = document.getElementById("projects-container");

  if (!container) {
    console.error("❌ Cannot find #projects-container element!");
    return;
  }

  console.log("✅ Found projects-container");

  // Show loading
  container.innerHTML =
    '<p style="text-align:center; padding:40px; font-size:18px;">Loading projects...</p>';

  try {
    // Try to fetch the JSON
    console.log("📡 Fetching projects.json...");
    const response = await fetch("./data/projects.json");

    if (!response.ok) {
      throw new Error("Cannot load projects.json");
    }

    const projects = await response.json();
    console.log("✅ Loaded projects:", projects);

    // Clear container
    container.innerHTML = "";

    // Create each card
    projects.forEach((project) => {
      const card = makeCard(project);
      container.appendChild(card);
    });

    console.log("✅ All cards created!");
    
    // Make cards visible
    setTimeout(() => {
      document.querySelectorAll('.project-card').forEach(card => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
        card.style.visibility = 'visible';
      });
    }, 100);
  } catch (error) {
    console.error("❌ Error:", error);
    container.innerHTML =
      '<p style="color:red; text-align:center; padding:40px;">Error loading projects. Check console.</p>';
  }
}

function makeCard(project) {
  const card = document.createElement("div");
  card.className = "project-card reveal";

  // Make the HTML
  let html = "";

  // Add image section if project should have one
  if (project.hasPreviewImage !== false) {
    html += `
      <div class="project-image">
        <div class="project-preview">
          <div class="preview-content" id="${project.id}">
            <div class="browser-bar">
              <div class="browser-dots">
                <span></span><span></span><span></span>
              </div>
              <div class="url-bar">${project.previewUrl || ""}</div>
            </div>
            <div class="preview-body">
              <div class="logo-section">
                <div class="animated-logo">${project.previewLogo || ""}</div>
                <h3>${project.previewTitle || ""}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // Status text
  const statusText = project.status === "complete" ? "Complete" : "In Progress";

  // Tech tags
  let techTags = "";
  project.technologies.forEach((tech) => {
    techTags += `<span class="tech-tag">${tech}</span>`;
  });

  // Links
  let links = "";

  if (project.liveUrl) {
    const target =
      project.liveUrl !== "#" ? 'target="_blank" rel="noopener"' : "";
    links += `<a href="${project.liveUrl}" class="link-btn primary" ${target}>View Live</a>`;
  }

  if (project.demoUrl) {
    links += `<a href="${project.demoUrl}" class="link-btn primary">Demo</a>`;
  }

  if (project.sourceUrl) {
    const target =
      project.sourceUrl !== "#" ? 'target="_blank" rel="noopener"' : "";
    links += `<a href="${project.sourceUrl}" class="link-btn secondary" ${target}>Source Code</a>`;
  }

  if (project.caseStudyUrl) {
    links += `<a href="${project.caseStudyUrl}" class="link-btn secondary">Case Study</a>`;
  }

  if (project.docsUrl) {
    links += `<a href="${project.docsUrl}" class="link-btn secondary">Documentation</a>`;
  }

  // Info section
  html += `
    <div class="project-info">
      <div class="project-header">
        <div class="project-category">${project.category}</div>
        <div class="project-status ${project.status}">${statusText}</div>
      </div>
      
      <h3 class="project-title">${project.title}</h3>
      <p class="project-description">${project.description}</p>
      
      <div class="project-tech">
        ${techTags}
      </div>
      
      <div class="project-links">
        ${links}
      </div>
    </div>
  `;

  card.innerHTML = html;
  return card;
}

// Load preview images after a short delay
setTimeout(() => {
  loadPreviewImages();
}, 500);

function loadPreviewImages() {
  const previews = document.querySelectorAll(".preview-content");

  previews.forEach((preview) => {
    const id = preview.id;
    if (!id) return;

    const imagePath = `assests/${id}.png`;

    // Try to load image
    const img = new Image();
    img.onload = function () {
      console.log(`✅ Loaded image: ${imagePath}`);
      preview.style.backgroundImage = `url('${imagePath}')`;
      preview.style.backgroundSize = "cover";
      preview.style.backgroundPosition = "center";

      // Hide logo fallback
      const logo = preview.querySelector(".logo-section");
      if (logo) logo.style.display = "none";
    };
    img.onerror = function () {
      console.log(`ℹ️ No image for: ${id}`);
    };
    img.src = imagePath;
  });
}
