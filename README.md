# GTG Perfumes Landing Page

This is a premium, pixel-perfect, responsive landing page implementation for GTG Perfumes, built with vanilla HTML, CSS, and JavaScript.

## Features

-   **Modular Architecture**: Uses a custom vanilla JS loader (`main.js`) to fetch and inject HTML partials, keeping the codebase organized and maintainable.
-   **Responsive Design**: Mobile-first approach with custom breakpoints ensuring layout stability across Mobile, Tablet, and Desktop.
-   **Dynamic Product Options**: 
    -   Interactive subscription selector (Single vs Double).
    -   Fragrance selection logic (Original, Lily, Rose).
    -   Dynamic generation of "Add to Cart" URLs based on 12 different combinations.
    -   Animated accordion expansions for option details.
-   **Premium Animations**:
    -   Smooth scroll interactions.
    -   Micro-interactions on buttons and hover states.
    -   Custom counter animation for statistics.
    -   Image gallery with thumbnail navigation.
-   **Performance Optimized**:
    -   Semantic HTML5.
    -   No external heavy frameworks.
    -   `loading="lazy"` and `decoding="async"` for images.
    -   Defer loading for JavaScript.
    -   CSS variables for consistent theming.

## Project Structure

```
/project-cube
├── index.html          # Main entry point (shell)
├── /partials           # HTML sections (Header, Product, Stats, etc.)
├── /css                # modular CSS
│   ├── base.css        # Reset & Variables
│   ├── layout.css      # Main layout styles
│   ├── components.css  # Buttons, Inputs, Cards
│   ├── animations.css  # Keyframes & Transitions
│   └── responsive.css  # Media queries
├── /js                 # modular JS
│   ├── main.js         # Partials loader & entry
│   ├── product-options.js # Subscription & Cart logic
│   └── ...
└── /assets             # Images and Icons
```

## How to Run

Since the project uses `fetch()` to load partials, it requires a local server to avoid CORS issues with the `file://` protocol.

### Using VS Code Live Server
1.  Open the project in VS Code.
2.  Install the "Live Server" extension.
3.  Right-click `index.html` and select "Open with Live Server".

### Using Python
```bash
python -m http.server
# Open http://localhost:8000
```

### Using Node.js (npx)
```bash
npx serve .
# Open http://localhost:3000
```

## Technical Decisions

-   **No Frameworks**: To ensure maximum performance and zero build-step complexity, we utilized vanilla ES6+ and native DOM APIs.
-   **CSS Variables**: Used extensively for colors, fonts, and spacing to ensure design consistency and easy theming.
-   **REM Units**: All layout and typography use `rem` for accessibility and scalability. `px` is restricted to borders and small details.
-   **Event Delegation**: Used in JavaScript to handle events for dynamically loaded content effectively.

## Browser Support
-   Chrome (Latest)
-   Firefox (Latest)
-   Safari (Latest)
-   Edge (Latest)
