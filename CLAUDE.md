# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a modern, neon-themed portfolio/landing page website for Kim Seoyoon PD, a beauty industry AI consultant. It's a static site built with vanilla HTML, CSS, and JavaScript—no build tools, bundlers, or frameworks.

**Stack:** HTML5 + CSS3 + Vanilla JavaScript (ES6+)

## Development

There are no build steps or special commands needed. Simply open `index.html` in a browser to view the site.

- **Preview locally:** Open `index.html` directly in your browser, or use a simple HTTP server:
  ```bash
  # Using Python
  python3 -m http.server 8000
  # Or Node.js
  npx http-server
  ```

## Architecture & Key Features

### File Structure
- **index.html** – Single-page HTML with semantic sections (hero, about, portfolio, services, newsletter, footer)
- **style.css** – All styling with CSS custom properties (variables) for theming
- **script.js** – Interactive features and animations

### CSS Design System
The site uses CSS custom properties defined in `:root`:
- **Neon colors:** `--neon-pink`, `--neon-blue`, `--neon-purple`, `--neon-green`
- **Beauty theme colors:** `--beauty-rose`, `--beauty-gold`, `--beauty-copper`
- **Dark theme:** `--dark-bg` (#0a0a0a), `--dark-surface` (#1a1a1a)
- **Gradients:** `--gradient-neon` (45deg multi-color), `--gradient-beauty` (135deg warm tones)

Sections use CSS Grid for layout and are responsive with media queries at 768px and 480px breakpoints.

### JavaScript Interactivity (script.js)
Key features implemented:
1. **Smooth scroll navigation** – Anchor links scroll smoothly to sections
2. **Mobile menu** – Hamburger toggle with animated icon transformation
3. **Intersection Observer** – Fade-in animation for elements as they enter viewport (portfolio items, stat items, service cards)
4. **Parallax effects** – Hero content and neon circle move as user scrolls
5. **Mouse-tracking neon effect** – `.neon-text` elements brighten and scale when cursor is within 200px
6. **3D portfolio card hover** – Portfolio items rotate based on mouse position (perspective 3D)
7. **Button ripple effect** – Animated ripple on button clicks
8. **Progress bar** – Fixed bar at top that fills as user scrolls
9. **Type-writer effect** – Hero title animates in character-by-character
10. **Newsletter form** – Displays success modal on submit

### Animation Highlights
- **Neon flicker** – 2s oscillating opacity for neon text
- **Pulse** – 3s scale animation on neon circle
- **Grid movement** – Infinite translation on background grid
- **Shimmer** – 3s translation effect on post/image overlays
- **Particles** – 5s rotation and scale on particle elements

## Common Development Tasks

### Updating Content
- **Navigation links** – Edit `<nav class="navbar">` (line 13–30)
- **Hero section** – Edit `<section id="home" class="hero">` (line 33–54)
- **Portfolio items** – Add/remove `.portfolio-item` divs in `<section id="portfolio">` (line 104–142)
- **Services** – Add/remove `.service-card` divs in `<section id="services">` (line 156–179)

### Styling Adjustments
- **Color changes** – Update CSS custom properties in `:root` (style.css, lines 7–21)
- **Font sizes** – Adjust `clamp()` values in section titles for responsive scaling
- **Animation speed** – Modify animation duration values (e.g., `2s`, `3s`)
- **Breakpoints** – Media queries at 768px (tablets) and 480px (mobile) control responsive behavior

### Interactive Feature Adjustments
- **Smooth scroll behavior** – script.js line 9 (in `scrollIntoView()`)
- **Mouse tracking distance** – script.js line 111 (distance threshold is 200px)
- **Portfolio 3D rotation sensitivity** – script.js lines 224–225 (adjust division values)
- **Newsletter success message duration** – script.js line 152 (3000ms timeout)
- **Type-writer speed** – script.js line 247 (50ms per character)

## Mobile Responsiveness

Responsive design is handled via CSS media queries:
- **≤768px (tablets)** – Single-column layout, hamburger menu, simplified grid layouts
- **≤480px (mobile)** – Smaller font sizes, reduced padding/margins, stacked flex layouts

The hamburger menu (`<div class="hamburger">`) is hidden on desktop and shown on mobile. Script.js line 26 dynamically injects media-query styles for the mobile menu animation.

## Notes for Future Development

- **No external dependencies required** (except Google Fonts and Instagram CDN for image)
- **SEO:** Page has `<meta>` tags and semantic HTML (`<header>`, `<section>`, `<footer>`)
- **Accessibility:** Consider adding ARIA labels if expanding interactivity
- **Image placeholder:** Profile image URL (line 48) is a placeholder and should be replaced with real image
- **Newsletter handling:** Form collects email but currently only shows local success message; no backend integration
- **Browser compatibility:** Uses modern CSS (Grid, custom properties) and ES6+ JavaScript; test in older browsers if needed
