/**
 * Header Logic
 * Handles the hamburger menu toggle and other header interactions.
 */

document.addEventListener('partialsLoaded', () => {
    initHamburgerMenu();
});

function initHamburgerMenu() {
    const hamburgerBtn = document.querySelector('.hamburger-menu');
    const navMenu = document.querySelector('.desktop-nav');
    const body = document.body;

    if (!hamburgerBtn || !navMenu) {
        console.warn('Hamburger menu or navigation not found.');
        return;
    }

    hamburgerBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent immediate closing
        hamburgerBtn.classList.toggle('is-active');
        navMenu.classList.toggle('nav-active');
        
        // Prevent scrolling when menu is open
        if (navMenu.classList.contains('nav-active')) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = '';
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        const isClickInside = navMenu.contains(e.target) || hamburgerBtn.contains(e.target);
        
        if (!isClickInside && navMenu.classList.contains('nav-active')) {
            hamburgerBtn.classList.remove('is-active');
            navMenu.classList.remove('nav-active');
            body.style.overflow = '';
        }
    });

    // Close menu when clicking a link
    navMenu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburgerBtn.classList.remove('is-active');
            navMenu.classList.remove('nav-active');
            body.style.overflow = '';
        });
    });
}
