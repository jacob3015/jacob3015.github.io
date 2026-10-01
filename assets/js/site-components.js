/**
 * Site Web Components
 * Reusable <site-header> and <site-footer> custom elements.
 * Encapsulated via Shadow DOM with theme variables inheritance.
 */

// Theme Management Helper
const ThemeManager = {
  STORAGE_KEY: 'jacob_theme',
  
  getSystemPreference() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  },

  getCurrentTheme() {
    return localStorage.getItem(this.STORAGE_KEY) || document.documentElement.getAttribute('data-theme') || this.getSystemPreference();
  },

  setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(this.STORAGE_KEY, theme);
    window.dispatchEvent(new CustomEvent('themechange', { detail: { theme } }));
  },

  toggle() {
    const current = this.getCurrentTheme();
    const next = current === 'dark' ? 'light' : 'dark';
    this.setTheme(next);
    return next;
  },

  init() {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    if (saved) {
      document.documentElement.setAttribute('data-theme', saved);
    }
  }
};

ThemeManager.init();

class SiteHeader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.setupListeners();
  }

  render() {
    const currentTheme = ThemeManager.getCurrentTheme();
    const isDark = currentTheme === 'dark';

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          position: sticky;
          top: 0;
          z-index: 100;
          background-color: var(--bg-surface, #ffffff);
          border-bottom: 1px solid var(--border-subtle, #e2e8f0);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          transition: background-color 250ms ease, border-color 250ms ease;
        }

        .header-container {
          max-width: 1080px;
          margin: 0 auto;
          padding: 0.85rem 1rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-sizing: border-box;
        }

        @media (min-width: 768px) {
          .header-container {
            padding: 1rem 2rem;
          }
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          text-decoration: none;
          color: var(--text-primary, #0f172a);
          font-weight: 700;
          font-size: 1.15rem;
          letter-spacing: -0.01em;
        }

        .brand-badge {
          font-size: 0.75rem;
          padding: 0.15rem 0.45rem;
          border-radius: 9999px;
          background-color: var(--accent-subtle, #eff6ff);
          color: var(--accent-primary, #2563eb);
          font-weight: 600;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .nav-link {
          color: var(--text-secondary, #475569);
          text-decoration: none;
          font-size: 0.95rem;
          font-weight: 500;
          transition: color 150ms ease;
        }

        .nav-link:hover {
          color: var(--accent-primary, #2563eb);
        }

        .theme-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 8px;
          border: 1px solid var(--border-subtle, #e2e8f0);
          background-color: var(--bg-surface, #ffffff);
          color: var(--text-primary, #0f172a);
          cursor: pointer;
          transition: all 150ms ease;
        }

        .theme-btn:hover {
          background-color: var(--bg-surface-hover, #f1f5f9);
          border-color: var(--text-muted, #94a3b8);
        }

        .theme-btn svg {
          width: 18px;
          height: 18px;
          fill: none;
          stroke: currentColor;
          stroke-width: 2;
          stroke-linecap: round;
          stroke-linejoin: round;
        }
      </style>

      <header class="header-container">
        <a href="/" class="brand">
          <span>Jacob's Web Lab</span>
          <span class="brand-badge">Pure Web</span>
        </a>

        <nav class="nav-links">
          <a href="/" class="nav-link">Home</a>
          <a href="https://github.com/jacob3015/jacob3015.github.io" target="_blank" rel="noopener noreferrer" class="nav-link">GitHub</a>
          <button id="theme-toggle" class="theme-btn" aria-label="Toggle dark/light mode" title="Toggle theme">
            ${isDark ? this.getSunIcon() : this.getMoonIcon()}
          </button>
        </nav>
      </header>
    `;
  }

  getSunIcon() {
    return `
      <svg viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg>
    `;
  }

  getMoonIcon() {
    return `
      <svg viewBox="0 0 24 24">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
    `;
  }

  setupListeners() {
    const toggleBtn = this.shadowRoot.getElementById('theme-toggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        const nextTheme = ThemeManager.toggle();
        toggleBtn.innerHTML = nextTheme === 'dark' ? this.getSunIcon() : this.getMoonIcon();
      });
    }

    window.addEventListener('themechange', (e) => {
      if (toggleBtn) {
        toggleBtn.innerHTML = e.detail.theme === 'dark' ? this.getSunIcon() : this.getMoonIcon();
      }
    });
  }
}

class SiteFooter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          margin-top: auto;
          background-color: var(--bg-surface, #ffffff);
          border-top: 1px solid var(--border-subtle, #e2e8f0);
          color: var(--text-muted, #94a3b8);
          font-size: 0.875rem;
          transition: background-color 250ms ease, border-color 250ms ease;
        }

        .footer-container {
          max-width: 1080px;
          margin: 0 auto;
          padding: 2rem 1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          text-align: center;
          box-sizing: border-box;
        }

        @media (min-width: 640px) {
          .footer-container {
            flex-direction: row;
            text-align: left;
            padding: 2rem;
          }
        }

        .footer-links {
          display: flex;
          gap: 1.25rem;
        }

        .footer-link {
          color: var(--text-secondary, #475569);
          text-decoration: none;
          transition: color 150ms ease;
        }

        .footer-link:hover {
          color: var(--accent-primary, #2563eb);
        }
      </style>

      <footer class="footer-container">
        <p>© 2026 Jacob (Jaimin Pak). Built with Pure Web Standards & AI Agents.</p>
        <div class="footer-links">
          <a href="/" class="footer-link">Home</a>
          <a href="https://github.com/jacob3015/jacob3015.github.io" target="_blank" rel="noopener noreferrer" class="footer-link">GitHub</a>
          <a href="/docs/ARCHITECTURE_AND_ROADMAP.md" class="footer-link">Architecture</a>
        </div>
      </footer>
    `;
  }
}

// Define Custom Elements
if (!customElements.get('site-header')) {
  customElements.define('site-header', SiteHeader);
}

if (!customElements.get('site-footer')) {
  customElements.define('site-footer', SiteFooter);
}

export { ThemeManager, SiteHeader, SiteFooter };
