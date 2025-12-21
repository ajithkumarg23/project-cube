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
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Targeted Sections
        const targets = document.querySelectorAll('.reveal-on-scroll, section');

        targets.forEach(target => {
            if (target.tagName === 'SECTION') {
                target.classList.add('reveal-on-scroll');
            }
            observer.observe(target);
        });
    }

    document.addEventListener('partialsLoaded', initScrollReveals);

})();
