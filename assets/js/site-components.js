/**
 * Site Web Components (<site-header>, <site-footer>)
 * Medium-inspired minimalist editorial header & footer.
 * Supports system prefers-color-scheme change listener and scroll-state auto-hide.
 */

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

    // Listen to OS color-scheme changes when user hasn't locked an explicit override
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', (e) => {
      if (!localStorage.getItem(this.STORAGE_KEY)) {
        const newTheme = e.matches ? 'dark' : 'light';
        window.dispatchEvent(new CustomEvent('themechange', { detail: { theme: newTheme } }));
      }
    });
  }
};

ThemeManager.init();

const getHomeUrl = () => {
  const pathname = window.location.pathname;
  if (pathname.includes('/jacob3015-github-io/')) {
    return '/jacob3015-github-io/';
  }
  if (pathname.includes('/posts/')) {
    return '../../';
  }
  return '/';
};

class SiteHeader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.setupListeners();
    this.setupScrollBehavior();
  }

  render() {
    const currentTheme = ThemeManager.getCurrentTheme();
    const isDark = currentTheme === 'dark';
    const homeUrl = getHomeUrl();

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          position: sticky;
          top: 0;
          z-index: 100;
          background-color: var(--bg-primary, #ffffff);
          border-block-end: 1px solid var(--border-subtle, #f2f2f2);
          transition: transform 240ms cubic-bezier(0.2, 0, 0, 1), background-color 240ms ease, border-color 240ms ease;
        }

        @container scroll-state((scrolled: bottom) and (scrollable: top)) {
          :host(:not(:focus-within)) {
            transform: translateY(-100%);
          }
        }

        :host(.is-hidden:not(:focus-within)) {
          transform: translateY(-100%);
        }

        .header-inner {
          max-width: 1120px;
          height: 57px;
          margin: 0 auto;
          padding-inline: 1rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-sizing: border-box;
        }

        @media (min-width: 768px) {
          .header-inner {
            padding-inline: 2rem;
          }
        }

        .brand-group {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          text-decoration: none;
          color: var(--text-primary, #242424);
        }

        .brand-wordmark {
          font-family: var(--font-serif, Georgia, serif);
          font-weight: 700;
          font-size: 1.3rem;
          letter-spacing: -0.03em;
          color: var(--text-primary, #242424);
        }

        .brand-divider {
          width: 1px;
          height: 16px;
          background-color: var(--border-strong, #e5e5e5);
        }

        .brand-tag {
          font-size: 0.78rem;
          font-weight: 500;
          color: var(--text-secondary, #6b6b6b);
          display: none;
        }

        @media (min-width: 560px) {
          .brand-tag {
            display: inline-block;
          }
        }

        .nav-actions {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }

        .level-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.25rem 0.65rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 600;
          background-color: var(--accent-subtle, #e8f3e8);
          color: var(--accent-primary, #1a8917);
        }

        .level-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: currentColor;
        }

        .nav-link {
          color: var(--text-secondary, #6b6b6b);
          text-decoration: none;
          font-size: 0.875rem;
          font-weight: 400;
          transition: color 150ms ease;
        }

        .nav-link:hover {
          color: var(--text-primary, #242424);
        }

        .theme-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 34px;
          height: 34px;
          border-radius: 9999px;
          border: 1px solid var(--border-strong, #e5e5e5);
          background-color: transparent;
          color: var(--text-secondary, #6b6b6b);
          cursor: pointer;
          transition: color 150ms ease, border-color 150ms ease, background-color 150ms ease;
        }

        .theme-btn:hover {
          color: var(--text-primary, #242424);
          border-color: var(--text-primary, #242424);
          background-color: var(--bg-surface, #f9f9f9);
        }

        .theme-btn svg {
          width: 16px;
          height: 16px;
          fill: none;
          stroke: currentColor;
          stroke-width: 1.8;
          stroke-linecap: round;
          stroke-linejoin: round;
        }
      </style>

      <header class="header-inner">
        <a href="${homeUrl}" class="brand-group">
          <span class="brand-wordmark">Jacob's Novel Drill</span>
          <span class="brand-divider" aria-hidden="true"></span>
          <span class="brand-tag">판타지 웹 소설 집필 훈련 아카이브</span>
        </a>

        <nav class="nav-actions" aria-label="사이트 내비게이션">
          <span class="level-pill" title="현재 본 원고 챌린지 단계: 3단계 (일일 최소 1,500자)">
            <span class="level-dot"></span>
            Lv.3 · 1,500자
          </span>
          <a href="${homeUrl}" class="nav-link">Drills</a>
          <a href="https://github.com/jacob3015/jacob3015.github.io" target="_blank" rel="noopener noreferrer" class="nav-link">GitHub</a>
          <button id="theme-toggle" class="theme-btn" aria-label="다크/라이트 테마 전환" title="테마 전환">
            ${isDark ? this.getSunIcon() : this.getMoonIcon()}
          </button>
        </nav>
      </header>
    `;
  }

  getSunIcon() {
    return `
      <svg viewBox="0 0 24 24" aria-hidden="true">
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
      <svg viewBox="0 0 24 24" aria-hidden="true">
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

  setupScrollBehavior() {
    // Fallback for browsers without CSS scroll-state container queries
    if (!CSS.supports('container-type', 'scroll-state')) {
      let lastY = window.scrollY;
      window.addEventListener('scroll', () => {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const y = Math.max(0, Math.min(window.scrollY, maxScroll));
        if (Math.abs(y - lastY) < 6) return;
        this.classList.toggle('is-hidden', y > lastY && y > 64);
        lastY = y;
      }, { passive: true });
    }
  }
}

class SiteFooter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const homeUrl = getHomeUrl();

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          margin-block-start: auto;
          background-color: var(--bg-primary, #ffffff);
          border-block-start: 1px solid var(--border-subtle, #f2f2f2);
          color: var(--text-muted, #8f8f8f);
          font-size: 0.8125rem;
        }

        .footer-inner {
          max-width: 1120px;
          margin: 0 auto;
          padding: 1.75rem 1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          gap: 0.75rem;
          box-sizing: border-box;
        }

        @media (min-width: 640px) {
          .footer-inner {
            flex-direction: row;
            padding: 1.75rem 2rem;
          }
        }

        .footer-links {
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }

        .footer-link {
          color: var(--text-secondary, #6b6b6b);
          text-decoration: none;
          transition: color 150ms ease;
        }

        .footer-link:hover {
          color: var(--text-primary, #242424);
        }
      </style>

      <footer class="footer-inner">
        <p>© 2026 Jacob · 판타지 웹 소설 3차원 입체 묘사 훈련 & 에셋 아카이브</p>
        <div class="footer-links">
          <a href="${homeUrl}" class="footer-link">Archive</a>
          <a href="https://github.com/jacob3015/jacob3015.github.io" target="_blank" rel="noopener noreferrer" class="footer-link">GitHub</a>
        </div>
      </footer>
    `;
  }
}

if (!customElements.get('site-header')) {
  customElements.define('site-header', SiteHeader);
}

if (!customElements.get('site-footer')) {
  customElements.define('site-footer', SiteFooter);
}

export { ThemeManager, SiteHeader, SiteFooter };
