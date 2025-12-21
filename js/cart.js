/**
 * Cart Logic
 * Handles the "Add to Cart" button click and generates the dynamic URL.
*/

(function () {
    function initCart() {
        const addToCartBtn = document.getElementById('add-to-cart');

        if (!addToCartBtn) return;

        addToCartBtn.addEventListener('click', () => {
            // 1. Determine Subscription Type
            const subscriptionType = document.querySelector('input[name="subscription"]:checked').value;
            let url = "http://post.com/addToCart";

            // 2. Build URL Parameters based on functionality
            if (subscriptionType === 'singleSubscription') {
                const selectedFragrance = document.querySelector('input[name="fragrance_single"]:checked').value;
                url += `?product_id=${selectedFragrance}`;
            } else if (subscriptionType === 'doubleSubscription') {
                const frag1 = document.querySelector('input[name="fragrance_double_1"]:checked').value;
                const frag2 = document.querySelector('input[name="fragrance_double_2"]:checked').value;
                url += `?product_id=${frag1}&product_id_2=${frag2}`;
            }

            // Simulate navigation (In production, use: window.location.href = url)
            alert(`Redirecting to: ${url}`);
        });
    }

    // Initialize on load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCart);
    } else {
        initCart();
    }

    const observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (mutation.addedNodes.length) {
                if (document.getElementById('add-to-cart')) {
                    const btn = document.getElementById('add-to-cart');
                    if (!btn.dataset.cartInitialized) {
                        initCart();
                        btn.dataset.cartInitialized = "true";
                    }
                }
            }
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });

})();
