/**
 * Global Animation Logic
 * Handles scroll-based element reveals using IntersectionObserver.
 */

(function () {
    function initScrollReveals() {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target); // Trigger only once
                }
            });
        }, observerOptions);

        // Targeted Sections
        // We look for any element with .reveal-on-scroll class
        // + Main sections if not manually tagged
        const targets = document.querySelectorAll('.reveal-on-scroll, section');

        targets.forEach(target => {
            // If it's a section, we might want to add the class automatically if it doesn't have it
            if (target.tagName === 'SECTION') {
                target.classList.add('reveal-on-scroll');
            }
            observer.observe(target);
        });
    }

    // Export to global scope or run on event
    // Since we don't have modules, we'll listen for the partialsLoaded event
    document.addEventListener('partialsLoaded', initScrollReveals);

    // Also listen for partial-specific events if they exist, or wait a bit?
    // partialsLoaded is dispatched in main.js, which should be sufficient.

})();
