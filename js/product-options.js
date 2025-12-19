(function() {
    function updateSubscriptionClasses() {
        const singleRadio = document.getElementById('single');
        const doubleRadio = document.getElementById('double');
        const singleContainer = document.getElementById('single-subscription-container');
        const doubleContainer = document.getElementById('double-subscription-container');

        // If elements aren't in the DOM yet, stop.
        if (!singleRadio || !doubleRadio || !singleContainer || !doubleContainer) return;

        if (singleRadio.checked) {
            singleContainer.classList.add('single-subscription-selected');
            singleContainer.classList.remove('single-subscription-not-selected');
            doubleContainer.classList.add('double-subscription-not-selected');
            doubleContainer.classList.remove('double-subscription-selected');
        } else if (doubleRadio.checked) {
            singleContainer.classList.add('single-subscription-not-selected');
            singleContainer.classList.remove('single-subscription-selected');
            doubleContainer.classList.add('double-subscription-selected');
            doubleContainer.classList.remove('double-subscription-not-selected');
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