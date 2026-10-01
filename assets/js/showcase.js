/**
 * Showcase Application Script
 * Fetches posts manifest and renders interactive card grid with search & filter.
 * Supports View Transitions API and keyboard shortcuts.
 */

class ShowcaseApp {
  constructor() {
    this.posts = [];
    this.activeCategory = 'all';
    this.searchQuery = '';

    // DOM Elements
    this.gridContainer = document.getElementById('posts-grid');
    this.filterContainer = document.getElementById('category-filters');
    this.searchInput = document.getElementById('search-input');
    this.countElement = document.getElementById('posts-count');
  }

  async init() {
    this.readUrlParams();
    await this.fetchPosts();
    this.setupFilters();
    this.setupSearch();
    this.setupKeyboardShortcuts();
    this.render();
  }

  readUrlParams() {
    const params = new URLSearchParams(window.location.search);
    if (params.has('category')) {
      this.activeCategory = params.get('category');
    }
    if (params.has('q')) {
      this.searchQuery = params.get('q');
      if (this.searchInput) {
        this.searchInput.value = this.searchQuery;
      }
    }
  }

  updateUrlParams() {
    const params = new URLSearchParams();
    if (this.activeCategory && this.activeCategory !== 'all') {
      params.set('category', this.activeCategory);
    }
    if (this.searchQuery.trim()) {
      params.set('q', this.searchQuery.trim());
    }

    const newUrl = params.toString() ? `${window.location.pathname}?${params.toString()}` : window.location.pathname;
    window.history.replaceState({}, '', newUrl);
  }

  async fetchPosts() {
    try {
      const response = await fetch('/data/posts.json');
      if (!response.ok) {
        throw new Error(`Failed to load posts (Status: ${response.status})`);
      }
      this.posts = await response.json();
    } catch (error) {
      console.error('[ShowcaseApp] Fetch error:', error);
      this.posts = [];
    }
  }

  setupFilters() {
    if (!this.filterContainer) return;

    // Extract unique categories
    const categories = ['all', ...new Set(this.posts.map(p => p.category).filter(Boolean))];

    this.filterContainer.innerHTML = '';
    categories.forEach(cat => {
      const btn = document.createElement('button');
      btn.className = `filter-chip ${cat.toLowerCase() === this.activeCategory.toLowerCase() ? 'active' : ''}`;
      btn.textContent = cat === 'all' ? 'All Posts' : cat;
      btn.dataset.category = cat;

      btn.addEventListener('click', () => {
        this.activeCategory = cat;
        this.updateFilterButtons();
        this.updateUrlParams();
        this.transitionRender();
      });

      this.filterContainer.appendChild(btn);
    });
  }

  updateFilterButtons() {
    const buttons = this.filterContainer.querySelectorAll('.filter-chip');
    buttons.forEach(btn => {
      if (btn.dataset.category.toLowerCase() === this.activeCategory.toLowerCase()) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  setupSearch() {
    if (!this.searchInput) return;

    let debounceTimer;
    this.searchInput.addEventListener('input', (e) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        this.searchQuery = e.target.value.trim().toLowerCase();
        this.updateUrlParams();
        this.transitionRender();
      }, 150);
    });
  }

  setupKeyboardShortcuts() {
    window.addEventListener('keydown', (e) => {
      // Focus search with '/' key
      if (e.key === '/' && document.activeElement !== this.searchInput && !['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) {
        e.preventDefault();
        this.searchInput?.focus();
        this.searchInput?.select();
      }

      // Clear search with Escape
      if (e.key === 'Escape' && document.activeElement === this.searchInput) {
        if (this.searchInput.value) {
          this.searchInput.value = '';
          this.searchQuery = '';
          this.updateUrlParams();
          this.transitionRender();
        }
        this.searchInput.blur();
      }
    });
  }

  getFilteredPosts() {
    return this.posts.filter(post => {
      // Category check
      const matchCategory = this.activeCategory === 'all' || 
        (post.category && post.category.toLowerCase() === this.activeCategory.toLowerCase());

      if (!matchCategory) return false;

      // Search query check
      if (!this.searchQuery) return true;

      const title = (post.title || '').toLowerCase();
      const desc = (post.description || '').toLowerCase();
      const tags = (post.tags || []).join(' ').toLowerCase();

      return title.includes(this.searchQuery) || desc.includes(this.searchQuery) || tags.includes(this.searchQuery);
    });
  }

  transitionRender() {
    // Utilize View Transitions API if supported and user allows motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (document.startViewTransition && !prefersReducedMotion) {
      document.startViewTransition(() => {
        this.render();
      });
    } else {
      this.render();
    }
  }

  render() {
    if (!this.gridContainer) return;

    const filtered = this.getFilteredPosts();

    // Update count badge
    if (this.countElement) {
      this.countElement.textContent = `${filtered.length} ${filtered.length === 1 ? 'post' : 'posts'}`;
    }

    if (filtered.length === 0) {
      this.renderEmptyState();
      return;
    }

    this.gridContainer.innerHTML = '';
    filtered.forEach(post => {
      const card = this.createCardElement(post);
      this.gridContainer.appendChild(card);
    });
  }

  createCardElement(post) {
    const card = document.createElement('a');
    card.href = post.path || '#';
    card.className = 'post-card';
    card.setAttribute('aria-label', post.title);

    // Escape helper
    const escapeHtml = (str) => {
      const div = document.createElement('div');
      div.textContent = str;
      return div.innerHTML;
    };

    const featuresHtml = (post.interactiveFeatures || [])
      .map(feat => `<span class="feature-pill">✦ ${escapeHtml(feat)}</span>`)
      .join('');

    const formattedDate = post.createdAt ? new Date(post.createdAt).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }) : '';

    const thumbnailSrc = post.thumbnail || '/assets/img/covers/default-cover.svg';

    card.innerHTML = `
      <div class="card-cover">
        <img src="${escapeHtml(thumbnailSrc)}" alt="${escapeHtml(post.title)}" loading="lazy" />
        ${post.category ? `<span class="card-badge-category">${escapeHtml(post.category)}</span>` : ''}
      </div>
      <div class="card-content">
        <div class="card-meta">
          <span>${formattedDate}</span>
          ${post.featured ? '<span class="badge" style="font-size:0.7rem; padding:0.1rem 0.4rem;">Featured</span>' : ''}
        </div>
        <h3 class="card-title">${escapeHtml(post.title)}</h3>
        <p class="card-desc">${escapeHtml(post.description || '')}</p>
        ${featuresHtml ? `<div class="card-features">${featuresHtml}</div>` : ''}
        <div class="card-action">
          <span>Explore Applet</span>
          <span class="action-arrow">→</span>
        </div>
      </div>
    `;

    return card;
  }

  renderEmptyState() {
    this.gridContainer.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">🔍</div>
        <h3>조건에 맞는 포스트를 찾을 수 없습니다</h3>
        <p>다른 검색어를 입력하거나 필터를 'All Posts'로 변경해 보세요.</p>
      </div>
    `;
  }
}

// Bootstrap on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  const app = new ShowcaseApp();
  app.init();
});
