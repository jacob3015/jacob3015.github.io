/**
 * Editorial Feed & Training Dashboard Controller
 * Renders Medium-style chronological drill feed, theme filters, tag filters, and training metrics.
 */

const DRILL_THEMES = [
  { id: 'all', label: 'All Drills', desc: '전체 훈련 기록' },
  { id: 'Action', label: 'Action · 전투/마법', desc: 'Drill A: 전투/마법 연출' },
  { id: 'Psychology', label: 'Psychology · 심리/대사', desc: 'Drill B: 심리/대사 티키타카' },
  { id: 'Worldbuilding', label: 'Worldbuilding · 배경/분위기', desc: 'Drill C: 역동적 배경/분위기' },
  { id: 'Pacing', label: 'Pacing · 반전/절단신공', desc: 'Drill D: 급반전과 절단신공' }
];

const THEME_LABELS = {
  Action: 'Action · 전투/마법',
  Psychology: 'Psychology · 심리/대사',
  Worldbuilding: 'Worldbuilding · 배경/분위기',
  Pacing: 'Pacing · 반전/절단신공'
};

class DrillArchiveApp {
  constructor() {
    this.posts = [];
    this.activeTheme = 'all';
    this.activeTag = '';
    this.searchQuery = '';

    // DOM References
    this.storiesContainer = document.getElementById('stories-list');
    this.tabsContainer = document.getElementById('category-tabs');
    this.tagsContainer = document.getElementById('tags-cloud');
    this.searchInput = document.getElementById('search-input');

    // Stats References
    this.statTotalEl = document.getElementById('stat-total-drills');
    this.statAvgCharsEl = document.getElementById('stat-avg-chars');
    this.statPassRateEl = document.getElementById('stat-pass-rate');
  }

  async init() {
    this.readUrlParams();
    await this.fetchPosts();
    this.renderStats();
    this.setupThemeTabs();
    this.setupTagsCloud();
    this.setupSearch();
    this.setupKeyboardShortcuts();
    this.renderFeed();
  }

  readUrlParams() {
    const params = new URLSearchParams(window.location.search);
    if (params.has('theme')) {
      this.activeTheme = params.get('theme');
    }
    if (params.has('tag')) {
      this.activeTag = params.get('tag');
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
    if (this.activeTheme && this.activeTheme !== 'all') {
      params.set('theme', this.activeTheme);
    }
    if (this.activeTag) {
      params.set('tag', this.activeTag);
    }
    if (this.searchQuery.trim()) {
      params.set('q', this.searchQuery.trim());
    }

    const newUrl = params.toString()
      ? `${window.location.pathname}?${params.toString()}`
      : window.location.pathname;
    window.history.replaceState({}, '', newUrl);
  }

  async fetchPosts() {
    try {
      const response = await fetch('./data/posts.json');
      if (!response.ok) {
        throw new Error(`Failed to fetch posts.json (${response.status})`);
      }
      const data = await response.json();
      this.posts = Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('[DrillArchiveApp] Failed to load posts:', error);
      this.posts = [];
    }
  }

  renderStats() {
    const total = this.posts.length;
    if (this.statTotalEl) {
      this.statTotalEl.textContent = `${total}편`;
    }

    if (total === 0) {
      if (this.statAvgCharsEl) this.statAvgCharsEl.textContent = '0자';
      if (this.statPassRateEl) this.statPassRateEl.textContent = '-';
      return;
    }

    const totalChars = this.posts.reduce((acc, p) => acc + (Number(p.char_count) || 0), 0);
    const avgChars = Math.round(totalChars / total);
    const passedCount = this.posts.filter(p => p.constraint_passed !== false).length;
    const passRate = Math.round((passedCount / total) * 100);

    if (this.statAvgCharsEl) {
      this.statAvgCharsEl.textContent = `${avgChars.toLocaleString()}자`;
    }
    if (this.statPassRateEl) {
      this.statPassRateEl.textContent = `${passRate}%`;
    }
  }

  setupThemeTabs() {
    if (!this.tabsContainer) return;
    this.tabsContainer.innerHTML = '';

    DRILL_THEMES.forEach(theme => {
      const btn = document.createElement('button');
      const isActive = theme.id.toLowerCase() === this.activeTheme.toLowerCase();
      btn.className = `tab-btn ${isActive ? 'active' : ''}`;
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
      btn.dataset.theme = theme.id;
      btn.textContent = theme.label;

      btn.addEventListener('click', () => {
        this.activeTheme = theme.id;
        this.updateThemeTabsUI();
        this.updateUrlParams();
        this.transitionRender();
      });

      this.tabsContainer.appendChild(btn);
    });
  }

  updateThemeTabsUI() {
    if (!this.tabsContainer) return;
    const buttons = this.tabsContainer.querySelectorAll('.tab-btn');
    buttons.forEach(btn => {
      const isMatch = btn.dataset.theme.toLowerCase() === this.activeTheme.toLowerCase();
      btn.classList.toggle('active', isMatch);
      btn.setAttribute('aria-selected', isMatch ? 'true' : 'false');
    });
  }

  setupTagsCloud() {
    if (!this.tagsContainer) return;

    const allTags = new Set();
    this.posts.forEach(post => {
      (post.tags || []).forEach(t => allTags.add(t));
    });

    if (allTags.size === 0) {
      const defaultTags = ['판타지', '전투연출', '마법묘사', '심리티키타카', '던전', '오감묘사'];
      defaultTags.forEach(t => allTags.add(t));
    }

    this.tagsContainer.innerHTML = '';
    [...allTags].forEach(tag => {
      const btn = document.createElement('button');
      const isActive = this.activeTag.toLowerCase() === tag.toLowerCase();
      btn.className = `tag-chip ${isActive ? 'active' : ''}`;
      btn.textContent = `#${tag}`;

      btn.addEventListener('click', () => {
        if (this.activeTag.toLowerCase() === tag.toLowerCase()) {
          this.activeTag = '';
        } else {
          this.activeTag = tag;
        }
        this.setupTagsCloud();
        this.updateUrlParams();
        this.transitionRender();
      });

      this.tagsContainer.appendChild(btn);
    });
  }

  setupSearch() {
    if (!this.searchInput) return;

    let timer;
    this.searchInput.addEventListener('input', (e) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        this.searchQuery = e.target.value.trim().toLowerCase();
        this.updateUrlParams();
        this.transitionRender();
      }, 150);
    });
  }

  setupKeyboardShortcuts() {
    window.addEventListener('keydown', (e) => {
      if (
        e.key === '/' &&
        document.activeElement !== this.searchInput &&
        !['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)
      ) {
        e.preventDefault();
        this.searchInput?.focus();
        this.searchInput?.select();
      }

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
      // Theme filter check (matches post.theme or post.categories)
      if (this.activeTheme !== 'all') {
        const categories = (post.categories || []).map(c => c.toLowerCase());
        const postTheme = (post.theme || '').toLowerCase();
        const target = this.activeTheme.toLowerCase();
        if (postTheme !== target && !categories.includes(target)) {
          return false;
        }
      }

      // Tag filter check
      if (this.activeTag) {
        const tags = (post.tags || []).map(t => t.toLowerCase());
        if (!tags.includes(this.activeTag.toLowerCase())) {
          return false;
        }
      }

      // Search query check
      if (!this.searchQuery) return true;

      const haystack = [
        post.title || '',
        post.summary || '',
        ...(post.keywords || []),
        ...(post.tags || []),
        ...(post.categories || [])
      ].join(' ').toLowerCase();

      return haystack.includes(this.searchQuery);
    });
  }

  transitionRender() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (document.startViewTransition && !prefersReducedMotion) {
      document.startViewTransition(() => {
        this.renderFeed();
      });
    } else {
      this.renderFeed();
    }
  }

  renderFeed() {
    if (!this.storiesContainer) return;

    const filtered = this.getFilteredPosts();

    if (filtered.length === 0) {
      this.renderEmptyState();
      return;
    }

    this.storiesContainer.innerHTML = '';
    filtered.forEach(post => {
      const articleEl = this.createStoryElement(post);
      this.storiesContainer.appendChild(articleEl);
    });
  }

  createStoryElement(post) {
    const link = document.createElement('a');
    const path = (post.path || '#').replace(/^\//, './');
    link.href = path;
    link.className = 'story-item';
    link.setAttribute('aria-label', post.title);

    const escapeHtml = (str) => {
      const div = document.createElement('div');
      div.textContent = str ?? '';
      return div.innerHTML;
    };

    const themeKey = post.theme || (post.categories && post.categories[1]) || 'Action';
    const themeClass = `pill-${themeKey.toLowerCase()}`;
    const themeLabel = THEME_LABELS[themeKey] || themeKey;

    const dateStr = post.date ? post.date.slice(0, 10) : '';
    const charCount = Number(post.char_count) || 0;
    const readMin = Math.max(1, Math.round(charCount / 500));

    const keywordsHtml = (post.keywords || [])
      .map(kw => `<span class="keyword-chip">${escapeHtml(kw)}</span>`)
      .join('');

    const passedHtml = post.constraint_passed !== false
      ? `<span class="constraint-badge passed">✓ 제약 통과</span>`
      : `<span class="constraint-badge failed">✕ 제약 미달</span>`;

    link.innerHTML = `
      <article>
        <div class="story-meta-top">
          <span class="pill ${escapeHtml(themeClass)}">${escapeHtml(themeLabel)}</span>
          <span class="meta-dot">·</span>
          <time datetime="${escapeHtml(dateStr)}">${escapeHtml(dateStr)}</time>
          <span class="meta-dot">·</span>
          <span>Lv.${escapeHtml(String(post.drill_level || 3))}</span>
          <span class="meta-dot">·</span>
          ${passedHtml}
        </div>

        <h2 class="story-title">${escapeHtml(post.title)}</h2>
        <p class="story-summary">${escapeHtml(post.summary || '')}</p>

        <div class="story-footer">
          <div class="story-keywords" aria-label="필수 포함 키워드">
            ${keywordsHtml}
          </div>
          <div class="story-stats">
            <span>${charCount.toLocaleString()}자</span>
            <span>·</span>
            <span>${readMin} min read</span>
          </div>
        </div>
      </article>
    `;

    return link;
  }

  renderEmptyState() {
    if (this.posts.length === 0) {
      this.storiesContainer.innerHTML = `
        <div class="empty-feed">
          <span class="empty-feed-badge">Ready for Drill #01</span>
          <h3>아직 등록된 집필 훈련 기록이 없습니다</h3>
          <p>
            새로운 1시간 판타지 장면 묘사 훈련을 시작할 준비가 완료되었습니다.
            에이전트에게 과제를 요청하면 <code>draft.md</code> 파일에 오늘의 시추에이션과 제약 조건이 자동으로 세팅됩니다.
          </p>
          <div class="empty-command-box">
            💡 <strong>시작 방법:</strong> 채팅창에 <strong>"오늘의 과제 줘"</strong> 또는 <strong>"전투 묘사 과제 줘"</strong>라고 입력해 보세요.
          </div>
        </div>
      `;
    } else {
      this.storiesContainer.innerHTML = `
        <div class="empty-feed">
          <span class="empty-feed-badge">No Matches</span>
          <h3>조건에 맞는 훈련 기록을 찾지 못했습니다</h3>
          <p>다른 검색어를 입력하거나 상단 테마 탭을 'All Drills'로 변경해 보세요.</p>
        </div>
      `;
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const app = new DrillArchiveApp();
  app.init();
});
