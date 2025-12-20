(function() {
    function updateSubscriptionClasses(isInitial = false) {
        const singleRadio = document.getElementById('single');
        const doubleRadio = document.getElementById('double');
        const singleContainer = document.getElementById('subscription-single');
        const doubleContainer = document.getElementById('subscription-double');

        // If elements aren't in the DOM yet, stop.
        if (!singleRadio || !doubleRadio || !singleContainer || !doubleContainer) return;

        const handleSubscription = (radio, container) => {
            const body = container.querySelector('.subscription-body');
            if (radio.checked) {
                container.classList.add('is-selected');
                if (isInitial) {
                    body.style.height = 'auto';
                } else {
                    if (body.offsetHeight === 0) animateSubscriptionBody(body, 'open');
                }
            } else {
                container.classList.remove('is-selected');
                if (isInitial) {
                    body.style.height = '0px';
                } else {
                    if (body.offsetHeight > 0) animateSubscriptionBody(body, 'close');
                }
            }
        };

        handleSubscription(singleRadio, singleContainer);
        handleSubscription(doubleRadio, doubleContainer);
    }

    function animateSubscriptionBody(el, action) {
        if (action === 'open') {
            // 1. Disable transition to measure exact height immediately
            el.style.transition = 'none';
            // 1. Set height to auto to measure the exact required height
            el.style.height = 'auto';
            const fullHeight = el.offsetHeight;

            // 2. Reset to 0px to start the animation
            el.style.height = '0px';
            // Restore transition
            el.style.transition = '';
            
            // Force reflow
            void el.offsetHeight;

            requestAnimationFrame(() => {
                el.style.height = `${fullHeight}px`;
            });
            el.addEventListener('transitionend', function onEnd(e) {
                if (e.propertyName !== 'height') return;
                el.style.height = 'auto';
                el.removeEventListener('transitionend', onEnd);
            });
        } else if (action === 'close') {
            // Set to current pixel height (offsetHeight includes padding/border)
            el.style.height = `${el.offsetHeight}px`;
            // Force reflow
            void el.offsetHeight;

            requestAnimationFrame(() => {
                el.style.height = '0px';
            });
            el.addEventListener('transitionend', function onEnd(e) {
                if (e.propertyName !== 'height') return;
                el.removeEventListener('transitionend', onEnd);
            });
        }
    }

    function animateAccordion(el, action) {
        const summary = el.querySelector('summary');
        const summaryHeight = summary.offsetHeight;
        
        if (action === 'open') {
            // Set height to summary height (current collapsed state)
            el.style.height = `${summaryHeight}px`;
            // Add open attribute to render content
            el.setAttribute('open', '');
            
            // Calculate full height
            const fullHeight = el.scrollHeight;
            
            // Wait for next frame to start transition
            requestAnimationFrame(() => {
                el.style.height = `${fullHeight}px`;
            });

            el.addEventListener('transitionend', function onEnd() {
                el.style.height = 'auto';
                el.removeEventListener('transitionend', onEnd);
            }, { once: true });

        } else if (action === 'close') {
            // Set height to current full height (in pixels) to allow transition
            el.style.height = `${el.scrollHeight}px`;
            
            // Force reflow/wait for next frame
            requestAnimationFrame(() => {
                el.style.height = `${summaryHeight}px`;
            });

            el.addEventListener('transitionend', function onEnd() {
                el.removeAttribute('open');
                el.style.height = 'auto';
                el.removeEventListener('transitionend', onEnd);
            }, { once: true });
        }
    }

    function initAccordion() {
        const accordions = document.querySelectorAll('.accordion-item');
        accordions.forEach(acc => {
            if (acc.dataset.init) return;
            acc.dataset.init = "true";

            const summary = acc.querySelector('.accordion-header');
            summary.addEventListener('click', (e) => {
                e.preventDefault();
                const isOpen = acc.hasAttribute('open');
                
                if (isOpen) {
                    animateAccordion(acc, 'close');
                } else {
                    // Close other open accordions (optional, for exclusive behavior)
                    document.querySelectorAll('.accordion-item[open]').forEach(other => {
                        animateAccordion(other, 'close');
                    });
                    animateAccordion(acc, 'open');
                }
            });
        });
    }

    // 1. Event Delegation: Listens for changes on the document, catching events from dynamically added elements.
    document.addEventListener('change', function(e) {
        if (e.target && e.target.name === 'subscription') {
            updateSubscriptionClasses();
        }
    });

    // 2. Initial Load Check
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            updateSubscriptionClasses(true);
            initAccordion();
        });
    } else {
        updateSubscriptionClasses(true);
        initAccordion();
    }

    // 3. Mutation Observer: Watches for when the product HTML is actually injected into the page.
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length) {
                updateSubscriptionClasses(true);
                initAccordion();
            }
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });
})();