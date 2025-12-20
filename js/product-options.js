(function() {
    function updateSubscriptionClasses() {
        const singleRadio = document.getElementById('single');
        const doubleRadio = document.getElementById('double');
        const singleContainer = document.getElementById('subscription-single');
        const doubleContainer = document.getElementById('subscription-double');

        // If elements aren't in the DOM yet, stop.
        if (!singleRadio || !doubleRadio || !singleContainer || !doubleContainer) return;

        if (singleRadio.checked) {
            singleContainer.classList.add('is-selected');
            doubleContainer.classList.remove('is-selected');
        } else if (doubleRadio.checked) {
            singleContainer.classList.remove('is-selected');
            doubleContainer.classList.add('is-selected');
        }
    }

    // 1. Event Delegation: Listens for changes on the document, catching events from dynamically added elements.
    document.addEventListener('change', function(e) {
        if (e.target && e.target.name === 'subscription') {
            updateSubscriptionClasses();
        }
    });

    // 2. Initial Load Check
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', updateSubscriptionClasses);
    } else {
        updateSubscriptionClasses();
    }

    // 3. Mutation Observer: Watches for when the product HTML is actually injected into the page.
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length) {
                updateSubscriptionClasses();
            }
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });
})();