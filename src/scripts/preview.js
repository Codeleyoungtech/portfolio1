// projects-loader.js - Simplified Dynamic Project Card Generator

// Fallback projects data for when fetch fails (e.g., CORS on file://)
const FALLBACK_PROJECTS = [
  {
    id: "eleazarpreview",
    category: "Web Portfolio",
    status: "complete",
    title: "Eleazar Ogoyemi Portfolio",
    description:
      "A fully responsive personal portfolio website showcasing my skills, projects, and brand identity. Built with modern HTML, CSS, and JavaScript to deliver smooth animations and an elegant user experience.",
    technologies: ["HTML", "CSS", "JavaScript"],
    demoUrl: "https://eleazarogoyemi.onrender.com",
    sourceUrl: "https://github.com/yourusername/portfolio",
    hasPreviewImage: true,
    previewUrl: "eleazarogoyemi.onrender.com",
    previewLogo: "EO",
    previewTitle: "My Portfolio",
  },
  {
    id: "younal-analytics",
    category: "AI Web Application",
    status: "complete",
    title: "YouTube Analytics Pro",
    description:
      "An intelligent analytics platform that provides YouTube creators with AI-powered insights and recommendations. Extracts performance data, analyzes viewer engagement patterns, and generates actionable recommendations to optimize content strategy.",
    technologies: ["AI/ML", "Analytics", "Web App", "YouTube API"],
    liveUrl: "https://younal.onrender.com/",
    sourceUrl: "#",
    hasPreviewImage: true,
    previewUrl: "younal.onrender.com",
    previewLogo: "YA",
    previewTitle: "YouTube Analytics",
  },
  {
    id: "precious-fruit-preview",
    category: "Web App",
    status: "complete",
    title: "Precious Fruit Beginners School",
    description:
      "A clean, responsive website created with HTML, CSS, and JavaScript. It delivers a smooth user experience and elegant design, showcasing interactive layouts and modern front-end techniques.",
    technologies: ["HTML", "CSS", "JavaScript"],
    liveUrl: "https://preview--precious-fruit-grow.lovable.app/",
    sourceUrl: "https://github.com/yourusername/precious-fruit-grow",
    hasPreviewImage: true,
    previewUrl: "pfbs.org",
    previewLogo: "PFBS",
    previewTitle: "Precious Fruit Beginners School",
  },
  {
    id: "eynet-analytics",
    category: "Web Platform",
    status: "in-progress",
    title: "Eynet Analytics Dashboard",
    description:
      "Advanced analytics and data visualization platform providing comprehensive insights and reporting tools for business intelligence and decision making.",
    technologies: ["Next.js", "Chart.js", "MySQL", "Analytics"],
    demoUrl: "#",
    docsUrl: "#",
    hasPreviewImage: false,
    previewUrl: "eleyoungtech.com",
    previewLogo: "EYT",
    previewTitle: "Eleyoungtech",
  },
];

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

  let projects;

  try {
    // Try to fetch the JSON
    console.log("📡 Fetching projects.json...");
    const response = await fetch("./data/projects.json");

    if (!response.ok) {
      throw new Error("Cannot load projects.json");
    }

    projects = await response.json();
    console.log("✅ Loaded projects from JSON:", projects);
  } catch (error) {
    console.warn(
      "⚠️ Fetch failed (likely CORS on file://), using fallback data:",
      error.message,
    );
    // Use fallback data when fetch fails (e.g., when opening file:// directly)
    projects = FALLBACK_PROJECTS;
  }

  // Render projects
  renderProjects(container, projects);
}

function renderProjects(container, projects) {
  // Clear container
  container.innerHTML = "";

  // Store projects for later use
  window.projectsData = projects;

  // Create each card
  projects.forEach((project) => {
    const card = makeCard(project);
    // Add category data attribute for filtering
    card.dataset.category = project.category;
    container.appendChild(card);
  });

  console.log("✅ All cards created!");

  // Make cards visible
  setTimeout(() => {
    document.querySelectorAll(".project-card").forEach((card) => {
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
      card.style.visibility = "visible";
      card.classList.add("filter-visible");
    });
  }, 100);

  // Initialize filter tabs
  initFilterTabs();
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

// Filter tabs functionality
function initFilterTabs() {
  const filterTabs = document.querySelectorAll(".filter-tab");
  const projectCards = document.querySelectorAll(".project-card");

  if (filterTabs.length === 0) return;

  filterTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      // Update active tab
      filterTabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      const filter = tab.dataset.filter;

      // Filter projects
      projectCards.forEach((card) => {
        const category = card.dataset.category;
        const shouldShow = filter === "all" || category === filter;

        if (shouldShow) {
          card.classList.remove("filter-hidden");
          card.classList.add("filter-visible");
        } else {
          card.classList.remove("filter-visible");
          card.classList.add("filter-hidden");
        }
      });
    });
  });
}
