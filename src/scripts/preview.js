document.addEventListener("DOMContentLoaded", () => {
  // Function to check if image exists using Image object (more reliable than fetch)
  function checkImageExists(imagePath) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = imagePath;
    });
  }

  document.querySelectorAll(".preview-content").forEach(async preview => {
    const rawId = preview.id.replace(/^#/, "");
    console.log(`Processing ID: "${rawId}"`);
    
    if (!rawId) {
      console.warn("Preview element has no ID:", preview);
      return;
    }
    
    const imagePath = `assests/${rawId}.png`;
    console.log(`Checking image path: ${imagePath}`);

    try {
      const imageExists = await checkImageExists(imagePath);
      
      if (imageExists) {
        console.log(`✅ Image found: ${imagePath}`);
        
        // Image exists: set background and hide logo section
        preview.style.backgroundImage = `url('${imagePath}')`;
        preview.style.backgroundSize = "cover";
        preview.style.backgroundPosition = "center";
        preview.style.backgroundRepeat = "no-repeat";
        

        // Hide the logo section inside this preview
        const logoSection = preview.querySelector(".logo-section");
        if (logoSection) {
          logoSection.style.display = "none";
          console.log(`Hidden logo section for ${rawId}`);
        } else {
          console.warn(`No logo section found in ${rawId}`);
        }
      } else {
        console.log(`❌ Image not found: ${imagePath}`);
      }
    } catch (err) {
      console.error(`Error checking image for ${rawId}:`, err);
    }
  });
});
