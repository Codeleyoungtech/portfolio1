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

document.getElementById("contactForm").addEventListener("submit", function (e) {
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

const API_KEY = "AIzaSyAcVtnBtaBt2oW3tlklyxY0hAYyPUzn71g";
const CHANNEL_ID = "UCWzAP-RJWgra78fPNbRd8LQ";

let currentVideoId = "";

async function getLatestVideo() {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=1&type=video`
    );

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();

    if (data.items && data.items.length > 0) {
      const video = data.items[0];
      await getVideoStats(video);
    } else {
      showError("No videos found on this channel.");
    }
  } catch (error) {
    console.error("Error fetching video:", error);
    showError(`Error loading video: ${error.message}`);
  }
}

async function getVideoStats(video) {
  try {
    const videoId = video.id.videoId;
    const statsResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&id=${videoId}&part=statistics,snippet`
    );

    if (!statsResponse.ok) {
      throw new Error(`Stats API Error: ${statsResponse.status}`);
    }

    const statsData = await statsResponse.json();

    if (statsData.items && statsData.items.length > 0) {
      displayVideo(video, statsData.items[0]);
    } else {
      displayVideo(video, null);
    }
  } catch (error) {
    console.error("Error fetching video stats:", error);
    displayVideo(video, null);
  }
}

function displayVideo(video, statsData) {
  currentVideoId = video.id.videoId;
  const title = video.snippet.title;
  const thumbnail =
    video.snippet.thumbnails.maxres?.url ||
    video.snippet.thumbnails.high?.url ||
    video.snippet.thumbnails.medium.url;

  const publishedDate = new Date(video.snippet.publishedAt);
  const daysSince = Math.floor(
    (new Date() - publishedDate) / (1000 * 60 * 60 * 24)
  );

  let timeAgo;
  if (daysSince === 0) {
    timeAgo = "Today";
  } else if (daysSince === 1) {
    timeAgo = "1 day ago";
  } else if (daysSince < 7) {
    timeAgo = `${daysSince} days ago`;
  } else if (daysSince < 30) {
    const weeks = Math.floor(daysSince / 7);
    timeAgo = weeks === 1 ? "1 week ago" : `${weeks} weeks ago`;
  } else if (daysSince < 365) {
    const months = Math.floor(daysSince / 30);
    timeAgo = months === 1 ? "1 month ago" : `${months} months ago`;
  } else {
    const years = Math.floor(daysSince / 365);
    timeAgo = years === 1 ? "1 year ago" : `${years} years ago`;
  }

  // Format view count
  let viewCount = "--";
  if (statsData && statsData.statistics && statsData.statistics.viewCount) {
    const views = parseInt(statsData.statistics.viewCount);
    if (views < 1000) {
      viewCount = `${views} views`;
    } else if (views < 1000000) {
      viewCount = `${(views / 1000).toFixed(1)}K views`;
    } else {
      viewCount = `${(views / 1000000).toFixed(1)}M views`;
    }
  }

  // Update thumbnail using background image instead of img tag
  const thumbnailDiv = document.getElementById("videoThumbnail");
  thumbnailDiv.style.backgroundImage = `url("${thumbnail}")`;
  thumbnailDiv.style.backgroundSize = "cover";
  thumbnailDiv.style.backgroundPosition = "center";
  thumbnailDiv.style.backgroundRepeat = "no-repeat";

  // Keep only the play button, remove loading text
  thumbnailDiv.innerHTML = `
    <div class="play-button">
      <div class="play-icon"></div>
    </div>
  `;

  // Set click handler
  thumbnailDiv.onclick = () => openVideo(currentVideoId);

  // Update video info
  document.getElementById("videoTitle").textContent = title;
  document.getElementById("videoDate").textContent = timeAgo;
  document.getElementById("videoViews").textContent = viewCount;
}

function showError(message) {
  const thumbnailDiv = document.getElementById("videoThumbnail");

  // Reset background styles for error state
  thumbnailDiv.style.backgroundImage = "none";
  thumbnailDiv.style.backgroundColor = "#ffebee";
  thumbnailDiv.style.border = "1px solid #ffcdd2";
  thumbnailDiv.style.display = "flex";
  thumbnailDiv.style.alignItems = "center";
  thumbnailDiv.style.justifyContent = "center";

  thumbnailDiv.innerHTML = `
    <div style="color: #d32f2f; text-align: center; padding: 20px;">${message}</div>
  `;

  document.getElementById("videoTitle").textContent = "Error loading video";
  document.getElementById("videoDate").textContent = "--";
  document.getElementById("videoViews").textContent = "--";
}

function openVideo(videoId) {
  window.open(`https://www.youtube.com/watch?v=${videoId}`, "_blank");
}

// Load video on page load
getLatestVideo();

setInterval(getLatestVideo, 30 * 60 * 1000);
