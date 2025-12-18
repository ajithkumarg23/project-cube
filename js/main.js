// Main Entry Point

document.addEventListener('DOMContentLoaded', async () => {
    console.log('App Initializing...');

    // Load all partials
    await loadPartial('partials/header.html', 'header-container');
    await loadPartial('partials/product.html', 'product-container');
    await loadPartial('partials/stats.html', 'stats-container');
    await loadPartial('partials/table.html', 'table-container');
    await loadPartial('partials/footer.html', 'footer-container');

    console.log('All Partials Loaded');

    // Initialize Modules (after partials are in DOM)
    // We start them manually since we don't have a build system to bundle them
    // or we dispatch a custom event that individual files listen to.

    // Dispatch event for other scripts to know DOM is ready
    const event = new Event('partialsLoaded');
    document.dispatchEvent(event);
});

async function loadPartial(url, targetId) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Failed to load ${url}`);
        const html = await response.text();
        document.getElementById(targetId).innerHTML = html;
    } catch (error) {
        console.error(error);
        document.getElementById(targetId).innerHTML = `<div style="color:red; padding: 20px;">Error loading ${url}</div>`;
    }
}
