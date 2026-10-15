# AGENTS.md: AI Agent Development & Game Resource Guidelines

> **Project**: Jacob's Interactive Game Lab (`jacob3015.github.io`)  
> **Target Audience**: AI Agents (Coding Assistants, Game Resource Generators, Maintenance Bots) & Human Collaborators.

Welcome! This repository is a zero-build, pure web standards (Vanilla JS, CSS3, HTML5) static blog and resource hub hosted on GitHub Pages. Instead of plain text or markdown articles, our content consists of **client-side playable game development resources (Worldbuilding Codex, Interactive Sprites, Procedural Audio, Branching Dialogue, and Mechanics Simulators)**.

As an AI agent, you must strictly adhere to the following architectural rules and workflows when maintaining the codebase or creating new game resource posts.

---

## 1. Core Architectural Principles

1. **Zero-Build & Pure Web Standards**:
   - **DO NOT** introduce bundlers (Vite, Webpack, Rollup) or Node.js build pipelines for post content.
   - Use native browser capabilities: ES Modules (`import`/`export`), Custom Elements (Web Components), Canvas 2D/WebGL, Web Audio API, CSS Custom Properties, and Modern CSS (`:has()`, container queries, nesting).
2. **Self-Contained Content Isolation**:
   - Every resource post lives in its own directory: `posts/<slug>/`.
   - Each post must contain its own `index.html`, `style.css`, and `script.js` (or be bundled in a single self-contained `index.html`).
   - Styles and scripts within a post must be scoped so they never leak or cause regressions in other posts or the main showcase.
3. **Single Source of Truth (`data/posts.json`)**:
   - All published posts are indexed in `data/posts.json`. The showcase home page dynamically renders posts from this manifest.
4. **Theme & Site Consistency**:
   - Reusable site headers and footers are provided as native Web Components: `<site-header>` and `<site-footer>`.
   - Use CSS custom properties defined in `/assets/css/global.css` (e.g. `var(--bg-primary)`, `var(--text-primary)`, `var(--accent-primary)`) to ensure dark/light mode toggles work seamlessly across all posts.
5. **Lightweight & Web-Optimized Media Assets**:
   - Use **WebP** or **SVG** for graphics and sprites instead of uncompressed PNG/PSD.
   - Use **OGG** or **MP3** for audio loops, or synthesize sounds procedurally using **Web Audio API**.
   - Do **NOT** commit heavy binary assets (> 1MB) directly to Git. Provide an external download link (`downloadUrl`) pointing to GitHub Releases, itch.io, or cloud storage.

---

## 2. Game Resource Taxonomy (Categories)

Every post must belong to one of the following 5 standard categories:

| Category | Description & Examples | Typical Tech |
| :--- | :--- | :--- |
| `Lore & Story` | Interactive world maps, faction relationship graphs, bestiary/character codex, branching dialogue simulators. | SVG, Canvas, Semantic DOM |
| `Art & Visuals` | Sprite sheet animation testers, tilemap previews, particle & shader labs, pixel art palette pickers. | Canvas 2D, WebGL, CSS Keyframes |
| `Audio & Sound` | Adaptive BGM layer mixers, procedural SFX generators (8-bit synth), ambience soundscapes. | Web Audio API, Canvas Visualizer |
| `Mechanics & Systems` | Combat math/stat balancing calculators, procedural map generation (Noise/Cellular), A* pathfinding. | Canvas 2D, JS Algorithms |
| `Game Tools` | In-browser dev utilities (sprite slicer, dialogue script tester, level JSON exporter). | DOM, Web APIs |

---

## 3. 2-Step Publishing Workflow for New Content

When asked to create a new game resource post (e.g., `<post-slug>`):

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

  <title>Resource Title | Jacob's Interactive Game Lab</title>
</head>
<body>
  <site-header></site-header>

  <main class="container">
    <header class="post-header">
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <a href="/">Home</a>
        <span>/</span>
        <span>Lore & Story</span> <!-- Category -->
        <span>/</span>
        <span>Resource Title</span>
      </nav>
      <h1 class="post-title">Resource Title</h1>
      <p class="post-lead">Brief description of the game resource and how to interact with it.</p>
    </header>

    <!-- Interactive Applet Section -->
    <section class="interactive-workspace">
      <!-- Controls Panel, Canvas, Audio Mixer, or Map -->
    </section>

    <!-- Details, Lore, Specs & Download Section -->
    <article class="resource-details">
      <!-- Specifications, Implementation Notes, or Lore Text -->
    </article>
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
  "description": "Concise summary of the playable game resource and what the user can explore.",
  "category": "Lore & Story",
  "gameProject": "Project Name (e.g. Project Ruins or Prototype)",
  "resourceType": "interactive-map",
  "tags": ["Worldbuilding", "Map", "Lore"],
  "path": "/posts/unique-slug/",
  "createdAt": "YYYY-MM-DD",
  "thumbnail": "/assets/img/covers/unique-slug.svg",
  "interactiveFeatures": ["Interactive Tooltips", "Faction Overlay"],
  "downloadUrl": "https://github.com/.../releases (Optional)",
  "featured": false,
  "status": "published"
}
```

*Note: If no custom thumbnail is ready, fallback to `/assets/img/covers/default-cover.svg`.*

### Step 3: Run Integrity Validation
Always verify manifest and links before finishing:
```bash
node scripts/validate-posts.mjs
```

---

## 4. Post Quality & Usability Patterns

- **Interactive First**: Avoid static text-only write-ups. The page must provide real interactive capability (sliders, buttons, canvas, sound, drag-and-drop, step-by-step simulations).
- **Web Audio Policy Awareness**: Modern browsers block auto-playing audio. Audio applets must provide an explicit "Start Audio" or "Play Sound" button clicked by the user to initialize `AudioContext`.
- **Responsive Layout**: Controls and canvases must adapt smoothly to both desktop and mobile viewports.
- **Theme Awareness**: Listen for the `'themechange'` custom event if drawing on Canvas, so colors update dynamically when the user flips the dark/light mode switch:
  ```js
  window.addEventListener('themechange', () => {
    // Redraw canvas with updated theme colors
  });
  ```
- **Performance & Cleanup**:
  - Cancel `requestAnimationFrame` loops or intervals when not needed or on visibility change (`document.hidden`).
  - Keep frame rates smooth (60fps) and avoid memory leaks.

---

## 5. Do's and Don'ts

| Do | Don't |
| :--- | :--- |
| Use pure standard Web APIs (Canvas, SVG, Web Audio, CSS variables). | **Do NOT** install npm dependencies or heavy frontend frameworks. |
| Use one of the 5 allowed categories in `data/posts.json`. | **Do NOT** create arbitrary category names that break filter tabs. |
| Scope CSS to the post container or `./style.css`. | **Do NOT** edit `/assets/css/global.css` or `/assets/css/reset.css` for one specific post. |
| Compress media into WebP / Ogg format or synthesize procedurally. | **Do NOT** commit heavy binary assets (> 1MB) directly to Git repository. |
| Test links with leading absolute paths (e.g. `/assets/css/...`). | **Do NOT** use broken relative parent paths (e.g. `../../assets`). |
