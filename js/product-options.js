(function () {
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
            el.style.transition = 'none';
            el.style.height = 'auto';
            const fullHeight = el.offsetHeight;

            el.style.height = '0px';
            el.style.transition = '';

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
            el.style.height = `${el.offsetHeight}px`;
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
            el.style.height = `${summaryHeight}px`;
            el.setAttribute('open', '');
            const fullHeight = el.scrollHeight;

            requestAnimationFrame(() => {
                el.style.height = `${fullHeight}px`;
            });

            el.addEventListener('transitionend', function onEnd() {
                el.style.height = 'auto';
                el.removeEventListener('transitionend', onEnd);
            }, { once: true });

        } else if (action === 'close') {
            el.style.height = `${el.scrollHeight}px`;
            void el.offsetHeight;

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
                    document.querySelectorAll('.accordion-item[open]').forEach(other => {
                        animateAccordion(other, 'close');
                    });
                    animateAccordion(acc, 'open');
                }
            });
        });
    }

    // 1. Event Delegation: Listens for changes on the document
    document.addEventListener('change', function (e) {
        if (e.target && (
            e.target.name === 'subscription' ||
            e.target.name === 'fragrance_single' ||
            e.target.name.startsWith('fragrance_double')
        )) {
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
    const observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (mutation.addedNodes.length) {
                updateSubscriptionClasses(true);
                initAccordion();
            }
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });
})();