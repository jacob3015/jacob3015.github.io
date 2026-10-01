# AGENTS.md: AI Agent Development & Content Guidelines

> **Project**: Jacob's Interactive Web Lab (`jacob3015.github.io`)  
> **Target Audience**: AI Agents (Coding Assistants, Content Generators, Maintenance Bots) & Human Collaborators.

Welcome! This repository is a zero-build, pure web standards (Vanilla JS, CSS3, HTML5) static blog hosted on GitHub Pages. Instead of plain text or markdown articles, our content consists of **client-side interactive web applets (Explorable Explanations, visualizers, simulations, audio toys, and utility tools)**.

As an AI agent, you must strictly adhere to the following architectural rules and workflows when maintaining the codebase or creating new posts.

---

## 1. Core Architectural Principles

1. **Zero-Build & Pure Web Standards**:
   - **DO NOT** introduce bundlers (Vite, Webpack, Rollup) or Node.js build pipelines for post content.
   - Use native browser capabilities: ES Modules (`import`/`export`), Custom Elements (Web Components), Canvas 2D/WebGL, Web Audio API, CSS Custom Properties, and Modern CSS (`:has()`, container queries, nesting).
2. **Self-Contained Content Isolation**:
   - Every post lives in its own directory: `posts/<slug>/`.
   - Each post must contain its own `index.html`, `style.css`, and `script.js` (or be bundled in a single self-contained `index.html`).
   - Styles and scripts within a post must be scoped so they never leak or cause regressions in other posts or the main showcase.
3. **Single Source of Truth (`data/posts.json`)**:
   - All published posts are indexed in `data/posts.json`. The showcase home page dynamically renders posts from this manifest.
4. **Theme & Site Consistency**:
   - Reusable site headers and footers are provided as native Web Components: `<site-header>` and `<site-footer>`.
   - Use CSS custom properties defined in `/assets/css/global.css` (e.g. `var(--bg-primary)`, `var(--text-primary)`, `var(--accent-primary)`) to ensure dark/light mode toggles work seamlessly across all posts.

---

## 2. 2-Step Publishing Workflow for New Content

When asked to create a new interactive post (e.g., `<post-slug>`):

### Step 1: Create the Post Directory (`posts/<post-slug>/`)
Create a new folder `posts/<post-slug>/` with the following baseline template:

```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- Favicons -->
  <link rel="icon" href="/assets/img/icons/favicon-16x16.png" sizes="16x16" type="image/png">
  <link rel="icon" href="/assets/img/icons/favicon-32x32.png" sizes="32x32" type="image/png">
  <link rel="icon" href="/assets/img/icons/favicon.ico" sizes="48x48" type="image/x-icon">

  <!-- Global Base Styles & Web Components -->
  <link rel="stylesheet" href="/assets/css/reset.css">
  <link rel="stylesheet" href="/assets/css/global.css">
  <script type="module" src="/assets/js/site-components.js"></script>

  <!-- Post-specific Stylesheet -->
  <link rel="stylesheet" href="./style.css">

  <title>Post Title | Jacob's Interactive Web Lab</title>
</head>
<body>
  <site-header></site-header>

  <main class="container">
    <!-- Post Hero & Controls -->
    <!-- Interactive Canvas / UI Element -->
    <!-- Explanation & Details -->
  </main>

  <site-footer></site-footer>

  <!-- Post-specific Script -->
  <script type="module" src="./script.js"></script>
</body>
</html>
```

### Step 2: Register in `data/posts.json`
Append a new entry to the array in `data/posts.json`:

```json
{
  "id": "unique-slug",
  "title": "Human-Readable Title",
  "description": "Concise summary of the interactive applet and what the user can explore.",
  "category": "Algorithm",
  "tags": ["Tag1", "Tag2"],
  "path": "/posts/unique-slug/",
  "createdAt": "YYYY-MM-DD",
  "thumbnail": "/assets/img/covers/unique-slug.svg",
  "interactiveFeatures": ["Real-time Canvas", "Parameter Controls"],
  "featured": false,
  "status": "published"
}
```

*Note: If no custom thumbnail is ready, fallback to `/assets/img/covers/default-cover.svg`.*

---

## 3. Post Quality & Usability Requirements

- **Interactive First**: The page must have real interactive capability (sliders, buttons, canvas, sound, drag-and-drop, step-by-step simulations). Avoid static text-only write-ups.
- **Responsive Layout**: Controls and canvases must adapt smoothly to both desktop and mobile viewports.
- **Theme Awareness**: Listen for the `'themechange'` custom event if drawing on Canvas, so colors update dynamically when the user flips the dark/light mode switch:
  ```js
  window.addEventListener('themechange', () => {
    // Redraw canvas with updated theme colors
  });
  ```
- **Performance & Cleanup**:
  - Cancel `requestAnimationFrame` loops or intervals when not needed or on visibility change.
  - Keep frame rates smooth (60fps) and avoid memory leaks.

---

## 4. Do's and Don'ts

| Do | Don't |
| :--- | :--- |
| Use pure standard Web APIs (Canvas, SVG, Web Audio, CSS variables). | **Do NOT** install npm dependencies or heavy frontend frameworks. |
| Scope CSS to the post container or `./style.css`. | **Do NOT** edit `/assets/css/global.css` or `/assets/css/reset.css` for one specific post. |
| Keep `data/posts.json` formatted with valid JSON. | **Do NOT** forget to add the new post to `data/posts.json`. |
| Test links with leading absolute paths (e.g. `/assets/css/...`). | **Do NOT** use broken relative parent paths (e.g. `../../assets`). |
| Update `docs/ARCHITECTURE_AND_ROADMAP.md` if modifying site-wide architecture. | **Do NOT** re-introduce deprecated backend-style abstractions. |
