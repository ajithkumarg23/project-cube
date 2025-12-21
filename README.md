# GTG Perfumes Landing Page

A production-grade, high-performance landing page for GTG Perfumes featuring custom variable fonts, responsive layouts, and interactive elements built with HTML, CSS, and JavaScript.

---

## 📋 Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Technology Stack](#technology-stack)
- [Setup Instructions](#setup-instructions)
- [Implementation Details](#implementation-details)
- [Performance & Accessibility](#performance--accessibility)
- [Browser Compatibility](#browser-compatibility)

---

## ✨ Features

### Core Functionality
- **Fully Responsive Design**: Seamless experience across Mobile (< 768px), Tablet (768px - 1024px), and Desktop (> 1024px)
- **Dynamic Product Gallery**: Custom-built image gallery with:
  - Thumbnail navigation with active state indicators
  - Smooth fade transitions between images
  - Arrow navigation controls
  - Pagination dots
- **Interactive Subscription System**: 
  - Single and Double subscription options
  - 3 fragrance choices (Original, Lily, Rose)
  - Dynamic "Add to Cart" URL generation supporting 9 variations
  - Smooth expand/collapse animations
- **Animated Statistics Counter**: Scroll-triggered percentage counters with easing animations
- **Accordion Collection Section**: Smooth reveal animations for product details
- **Comparison Table**: Responsive table with horizontal scroll on mobile
- **Hamburger Menu**: Mobile-friendly navigation with smooth transitions

### Performance Optimizations
- Deferred script loading for non-blocking execution
- Lazy loading for images below the fold
- Modular HTML partials for better caching
- CSS animations using `transform` and `opacity` for GPU acceleration
- IntersectionObserver for scroll-based animations
- Event delegation to minimize event listeners

---

## 📁 Project Structure

```
project-cube/
├── index.html                 # Main shell (loads partials dynamically)
├── README.md                  # Project documentation
│
├── assets/
│   ├── fonts/
│   │   ├── Inter-VariableFont.ttf
│   │   └── Oxanium-VariableFont.ttf
│   └── images/
│       ├── hero_banner.png
│       ├── preview_*.png      # Product images
│       ├── product_*.png      # Fragrance bottles
│       └── icons/             # SVG icons
│
├── css/
│   ├── base.css              # Reset, variables, typography
│   ├── utility.css           # Utility classes (flex, gap, etc.)
│   ├── layout.css            # Section layouts (header, product, footer)
│   ├── components.css        # Reusable components (buttons, radios)
│   ├── animations.css        # Keyframes and animation utilities
│   └── responsive.css        # Media queries for all breakpoints
│
├── js/
│   ├── main.js               # Entry point, partial loader
│   ├── animations.js         # Scroll reveal animations
│   ├── header.js             # Hamburger menu logic
│   ├── gallery.js            # Product image gallery
│   ├── product-options.js    # Subscription & accordion logic
│   ├── counter.js            # Animated stat counters
│   └── cart.js               # Add to cart URL generation
│
└── partials/
    ├── header.html           # Navigation and hero banner
    ├── product.html          # Product details and subscriptions
    ├── stats.html            # Collection accordion and stats
    ├── table.html            # Comparison table
    └── footer.html           # Newsletter and footer links
```

---

## 🛠 Technology Stack

### Frontend
- **HTML5**: Semantic markup with proper heading hierarchy and ARIA labels
- **CSS3**: 
  - CSS Custom Properties (variables)
  - Flexbox and Grid layouts
  - CSS Animations and Transitions
  - Mobile-first responsive design
- **JavaScript (ES6+)**: 
  - Vanilla JS (no frameworks)
  - Async/await for partial loading
  - IntersectionObserver API
  - MutationObserver for dynamic content
  - Event delegation pattern

### Fonts
- **Inter**: Variable font (100-900 weight) for body text
- **Oxanium**: Variable font (100-900 weight) for headings and accents

---

## 🚀 Setup Instructions

### Prerequisites
- A local web server (required for `fetch` API to load partials)

### Option 1: Python HTTP Server
```bash
# Clone the repository
git clone <repository-url>
cd project-cube

# Start server (Python 3)
python -m http.server 8000

# Open in browser
# Navigate to http://localhost:8000
```

### Option 2: VS Code Live Server
1. Install the "Live Server" extension in VS Code
2. Right-click `index.html`
3. Select "Open with Live Server"

### Option 3: Node.js http-server
```bash
# Install http-server globally
npm install -g http-server

# Run server
http-server -p 8000

# Navigate to http://localhost:8000
```

---

## 🔧 Implementation Details

### Partial Loading System
The `index.html` acts as a shell that dynamically loads HTML partials:
```javascript
// main.js loads all partials in parallel
const partials = [
    { url: 'partials/header.html', targetId: 'header-container' },
    { url: 'partials/product.html', targetId: 'product-container' },
    // ... etc
];
```

This approach provides:
- Better code organization
- Improved cacheability
- Easier maintenance

### Add to Cart Logic
The cart system generates dynamic URLs based on user selections:

**Single Subscription Examples:**
- Original: `http://post.com/addToCart?product_id=original`
- Lily: `http://post.com/addToCart?product_id=lily`
- Rose: `http://post.com/addToCart?product_id=rose`

**Double Subscription Examples:**
- Original + Lily: `http://post.com/addToCart?product_id=original&product_id_2=lily`
- Rose + Original: `http://post.com/addToCart?product_id=rose&product_id_2=original`

Total variations: **9 unique URLs** (3 single + 6 double combinations)

### Animation Strategy
All animations follow performance best practices:
- Use `transform` and `opacity` only (GPU-accelerated)
- Respect `prefers-reduced-motion` media query
- Triggered by IntersectionObserver for scroll-based reveals
- Easing functions: `cubic-bezier(0.4, 0, 0.2, 1)` for smooth motion

### Responsive Breakpoints
```css
/* Tablet & Mobile */
@media (max-width: 64rem)   /* 1024px */

/* Mobile Only */
@media (max-width: 48rem)   /* 768px */
```

---

## ⚡ Performance & Accessibility

### Performance
- **Script Loading**: All scripts use `defer` attribute
- **Image Optimization**: 
  - `fetchpriority="high"` for hero image
  - `loading="lazy"` for below-the-fold images
  - Proper `width` and `height` attributes to prevent layout shift
- **CSS Architecture**: Logical separation prevents redundant styles
- **Font Loading**: `font-display: swap` prevents FOIT (Flash of Invisible Text)

### Accessibility
- ✅ Semantic HTML5 elements (`nav`, `main`, `section`, `article`, `footer`)
- ✅ Proper heading hierarchy (single `h1`, logical `h2`-`h6` structure)
- ✅ ARIA labels on interactive elements:
  - `aria-label` on buttons (hamburger, arrows)
  - `aria-label` on icons (check, cross)
  - `scope` attributes on table headers
- ✅ Keyboard navigation support:
  - Tab-accessible menu items
  - Enter/Space for button activation
  - Escape to close mobile menu
- ✅ Color contrast ratios meet WCAG AA standards
- ✅ Focus states on all interactive elements
- ✅ Alt text on all images

### SEO
- Descriptive `<title>` tag
- Meta description for search engines
- Semantic HTML structure
- Proper heading hierarchy
- Theme color for mobile browsers

---

## 🌐 Browser Compatibility

Tested and verified on:
- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile Safari (iOS)
- ✅ Chrome Mobile (Android)

### Fallbacks
- CSS Grid with Flexbox fallback
- IntersectionObserver with polyfill support
- Variable fonts with system font fallback

---

## 📝 Technical Decisions

### Why Vanilla JavaScript?
- **Zero dependencies**: Faster load times, no framework overhead
- **Better performance**: Direct DOM manipulation when needed
- **Learning value**: Demonstrates core JavaScript skills
- **Future-proof**: No framework version conflicts

### Why CSS Variables?
- **Maintainability**: Single source of truth for colors, spacing
- **Theming**: Easy to implement dark mode or brand variations
- **Performance**: No preprocessor compilation needed

### Why Modular CSS?
- **Scalability**: Easy to locate and modify specific sections
- **Caching**: Browsers can cache individual files
- **Team collaboration**: Multiple developers can work on different files

---