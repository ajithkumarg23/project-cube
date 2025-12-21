// Main Entry Point

document.addEventListener('DOMContentLoaded', async () => {
    console.log('App Initializing...');

    // Load all partials in parallel
    const partials = [
        { url: 'partials/header.html', targetId: 'header-container' },
        { url: 'partials/product.html', targetId: 'product-container' },
        { url: 'partials/stats.html', targetId: 'stats-container' },
        { url: 'partials/table.html', targetId: 'table-container' },
        { url: 'partials/footer.html', targetId: 'footer-container' }
    ];

    await Promise.all(partials.map(p => loadPartial(p.url, p.targetId)));

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
