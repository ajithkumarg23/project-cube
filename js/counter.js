(function () {
    // Easing function for smooth counting (Ease Out Expo)
    function easeOutExpo(x) {
        return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
    }

    function animateCounter(el, target, duration) {
        const start = 0;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            const easedProgress = easeOutExpo(progress);

            const current = Math.floor(easedProgress * (target - start) + start);
            el.textContent = current + "%";

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                el.textContent = target + "%";
            }
        }

        requestAnimationFrame(update);
    }

    function initStats() {
        const container = document.querySelector('.stats-container');
        if (!container || container.dataset.animated === "true") return;

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                container.dataset.animated = "true";

                const items = container.querySelectorAll('.stat-item');
                items.forEach((item, index) => {
                    setTimeout(() => {
                        // 1. Trigger CSS Fade In
                        item.classList.add('fade-in-up');

                        // 2. Trigger JS Number Counter
                        const numberEl = item.querySelector('.stat-number');
                        if (numberEl) {
                            const target = parseInt(numberEl.textContent.replace(/\D/g, ''));
                            if (!isNaN(target)) {
                                animateCounter(numberEl, target, 2000);
                            }
                        }
                    }, index * 150);
                });

                observer.disconnect();
            }
        }, { threshold: 0.2 });

        observer.observe(container);
    }

    // Initialize on load and watch for dynamic content
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initStats);
    } else {
        initStats();
    }

    const mutationObserver = new MutationObserver(() => initStats());
    mutationObserver.observe(document.body, { childList: true, subtree: true });
})();