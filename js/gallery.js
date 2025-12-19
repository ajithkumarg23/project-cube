(function() {
    function initGallery() {
        const gallery = document.querySelector('.product-gallery');
        // Check if gallery exists and hasn't been initialized yet
        if (!gallery || gallery.dataset.galleryInitialized === 'true') return;

        const mainImage = gallery.querySelector('.product-preview .product-img');
        const leftArrow = gallery.querySelector('.left-arrow-button');
        const rightArrow = gallery.querySelector('.right-arrow-button');
        const dotsContainer = gallery.querySelector('.center-dot-button');
        const dots = dotsContainer ? Array.from(dotsContainer.querySelectorAll('img')) : [];
        const thumbnails = gallery.querySelectorAll('.product-thumbnails .preview-img');

        // Ensure required elements are present
        if (!mainImage || !leftArrow || !rightArrow || dots.length === 0) return;

        // Mark as initialized
        gallery.dataset.galleryInitialized = 'true';

        // Store the source URLs for active (filled) and inactive (empty) dots
        // Assuming the first dot is the active one initially
        const activeDotSrc = dots[0].src;
        const inactiveDotSrc = dots[1].src;

        // Collect image sources from thumbnails to use for the gallery
        const images = Array.from(thumbnails).map(img => img.src);
        // Fallback if no thumbnails are present
        if (images.length === 0) images.push(mainImage.src);

        let currentIndex = 0;

        function updateGallery(index) {
            // Handle circular navigation
            if (index < 0) index = dots.length - 1;
            if (index >= dots.length) index = 0;

            currentIndex = index;

            // Update Main Image
            // Use modulo to map the current index to the available images
            if (images.length > 0) {
                mainImage.src = images[currentIndex % images.length];
            }

            // Update Dots
            dots.forEach((dot, i) => {
                dot.src = (i === currentIndex) ? activeDotSrc : inactiveDotSrc;
            });
        }

        // Event Listeners for Arrows
        leftArrow.addEventListener('click', function() {
            updateGallery(currentIndex - 1);
        });

        rightArrow.addEventListener('click', function() {
            updateGallery(currentIndex + 1);
        });

        // Event Listeners for Thumbnails
        thumbnails.forEach((thumb, index) => {
            thumb.addEventListener('click', function() {
                // Map the thumbnail index to the dot index (0-3)
                const dotIndex = index % dots.length;
                updateGallery(dotIndex);
                
                // Explicitly set the image to the clicked thumbnail
                // (In case the modulo logic above maps to a different duplicate image)
                mainImage.src = thumb.src;
            });
        });
    }

    // Initialize on load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initGallery);
    } else {
        initGallery();
    }

    // Watch for dynamic content injection
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length) {
                initGallery();
            }
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });
})();