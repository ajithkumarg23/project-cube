# GTG Perfumes Landing Page

An exclusive, high-performance landing page for GTG Perfumes, featuring a custom variable font design, responsive layouts, and interactive elements.

## Features

- **Responsive Design**: Seamless experience across Mobile, Tablet, and Desktop.
- **Dynamic Product Gallery**: Custom-built gallery with thumbnail navigation and circular transitions.
- **Interactive Subscription Options**: "Add to Cart" logic supports 9 different subscription variations (Single/Double + Fragrance combinations).
- **Animated Counters**: Scroll-triggered percentage counters in the Stats section.
- **Accordion Collection**: Smooth reveal animations for the collection details.
- **Performance Optimized**:
  - `defer` loading for scripts.
  - `content-visibility` and `will-change` hints for animations (implied).
  - Optimized image loading strategies.
  - Partial HTML loading for modularity.

## Technology Stack

- **HTML5**: Semantic and accessible structure.
- **CSS3**: Variables, Flexbox, Grid, and Animations. (No frameworks).
- **JavaScript (ES6+)**: Vanilla JS for logic, event delegation, and DOM manipulation.

## Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd project-cube
   ```

2. **Run locally**:
   Since the project uses `fetch` to load partials (`header.html`, `footer.html`, etc.), you must run it on a local server to avoid CORS issues.
   
   Using Python (if installed):
   ```bash
   python -m http.server 8000
   ```
   or using VS Code "Live Server" extension.

3. **Open in Browser**:
   Navigate to `http://localhost:8000`

## Implementation Details

- **Partials**: The `index.html` serves as a shell. `main.js` loads `header`, `product`, `stats`, `table`, and `footer` dynamically.
- **Add to Cart**: The logic validates the user's selection and generates a URL with parameters corresponding to the chosen subscription type and fragrances.
    - Example: `http://post.com/addToCart?product_id=rose&product_id_2=lily`

## Accessibility

- Semantic HTML tags (`nav`, `main`, `section`, `article`, `footer`).
- `aria-label` attributes for interactive elements (buttons, inputs).
- `scope` attributes on tables for screen readers.
- Keyboard navigability for the menu and forms.
