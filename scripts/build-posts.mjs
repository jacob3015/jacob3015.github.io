#!/usr/bin/env node

/**
 * Build Posts & Sync Manifest (Zero-Dependency Pure Node.js)
 * Reads Markdown files in `_posts/YYYY-MM-DD-drill-XX-slug.md`,
 * parses YAML Frontmatter & 4 standard drill sections,
 * generates Medium-style static HTML pages in `posts/<slug>/index.html`,
 * and updates `data/posts.json`.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const postsMdDir = path.join(rootDir, '_posts');
const postsHtmlDir = path.join(rootDir, 'posts');
const manifestPath = path.join(rootDir, 'data', 'posts.json');

const THEME_LABELS = {
  Action: 'Action · 전투/마법',
  Psychology: 'Psychology · 심리/대사',
  Worldbuilding: 'Worldbuilding · 배경/분위기',
  Pacing: 'Pacing · 반전/절단신공'
};

function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Parse YAML Frontmatter from Markdown content.
 */
function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) {
    throw new Error('Missing or malformed YAML frontmatter (`---` block).');
  }

  const yamlStr = match[1];
  const body = match[2];
  const meta = {};

  const lines = yamlStr.split(/\r?\n/);
  for (const rawLine of lines) {
    // Strip inline comments outside quotes
    const line = rawLine.replace(/\s+#.*$/, '').trim();
    if (!line || line.startsWith('#')) continue;

    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) continue;

    const key = line.slice(0, colonIdx).trim();
    let val = line.slice(colonIdx + 1).trim();

    if (val.startsWith('[') && val.endsWith(']')) {
      const inner = val.slice(1, -1).trim();
      meta[key] = inner
        ? inner.split(',').map(item => item.trim().replace(/^["']|["']$/g, ''))
        : [];
    } else if (val === 'true') {
      meta[key] = true;
    } else if (val === 'false') {
      meta[key] = false;
    } else if (/^-?\d+$/.test(val)) {
      meta[key] = Number(val);
    } else {
      meta[key] = val.replace(/^["']|["']$/g, '');
    }
  }

  return { meta, body };
}

/**
 * Format inline markdown: bold, italic, inline code, LaTeX arrow replacements.
 */
function renderInline(text) {
  let out = escapeHtml(text);
  // Replace LaTeX arrow $\rightarrow$ or $\to$ with clean Unicode arrow
  out = out.replace(/\$\\rightarrow\$/g, '→').replace(/\$\\to\$/g, '→');
  // Inline code
  out = out.replace(/`([^`]+)`/g, '<code>$1</code>');
  // Bold
  out = out.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  // Italic
  out = out.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  return out;
}

/**
 * Convert a Markdown section body into semantic HTML.
 */
function renderMarkdownBlock(md, isManuscript = false) {
  const lines = md.trim().split(/\r?\n/);
  const htmlParts = [];

  if (isManuscript) {
    // For web novel manuscripts, preserve double-newlines as paragraphs
    // and single-newlines inside a paragraph block as <br> for mobile pacing
    const blocks = md.trim().split(/\r?\n\s*\r?\n/);
    for (const block of blocks) {
      const trimmed = block.trim();
      if (!trimmed) continue;
      if (/^(\*\s*\*\s*\*|---|___)$/.test(trimmed)) {
        htmlParts.push('<hr>');
        continue;
      }
      if (trimmed.startsWith('>')) {
        const quoteLines = trimmed
          .split(/\r?\n/)
          .map(l => renderInline(l.replace(/^>\s?/, '')))
          .join('<br>');
        htmlParts.push(`<blockquote><p>${quoteLines}</p></blockquote>`);
        continue;
      }
      const pLines = trimmed
        .split(/\r?\n/)
        .map(l => renderInline(l.trim()))
        .join('<br>\n');
      htmlParts.push(`<p>${pLines}</p>`);
    }
    return htmlParts.join('\n');
  }

  let inList = false;
  let inQuote = false;
  let quoteBuffer = [];

  const flushQuote = () => {
    if (inQuote && quoteBuffer.length > 0) {
      htmlParts.push(`<blockquote><p>${quoteBuffer.join('<br>')}</p></blockquote>`);
      quoteBuffer = [];
      inQuote = false;
    }
  };

  const flushList = () => {
    if (inList) {
      htmlParts.push('</ul>');
      inList = false;
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();

    if (!trimmed) {
      flushQuote();
      continue;
    }

    if (/^---\s*$/.test(trimmed)) {
      flushQuote();
      flushList();
      continue;
    }

    if (trimmed.startsWith('### ')) {
      flushQuote();
      flushList();
      htmlParts.push(`<h3>${renderInline(trimmed.slice(4))}</h3>`);
      continue;
    }

    if (trimmed.startsWith('>')) {
      quoteBuffer.push(renderInline(trimmed.replace(/^>\s?/, '')));
      inQuote = true;
      continue;
    }

    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      flushQuote();
      if (!inList) {
        htmlParts.push('<ul>');
        inList = true;
      }
      let itemContent = trimmed.slice(2).trim();
      // Handle inline `> "Quote"` on the same line (e.g., `- **Best Line:** > "..."`)
      const inlineQuoteIdx = itemContent.indexOf('> ');
      if (inlineQuoteIdx !== -1) {
        const prefix = itemContent.slice(0, inlineQuoteIdx).trim();
        const quoted = itemContent.slice(inlineQuoteIdx + 2).trim();
        htmlParts.push(`<li>${renderInline(prefix)}<blockquote><p>${renderInline(quoted)}</p></blockquote>`);
      } else {
        htmlParts.push(`<li>${renderInline(itemContent)}`);
      }

      // Check if following indented lines are blockquotes belonging to this list item
      const nestedQuotes = [];
      while (i + 1 < lines.length && lines[i + 1].trim().startsWith('>')) {
        i++;
        nestedQuotes.push(renderInline(lines[i].trim().replace(/^>\s?/, '')));
      }
      if (nestedQuotes.length > 0) {
        htmlParts.push(`<blockquote><p>${nestedQuotes.join('<br>')}</p></blockquote>`);
      }
      htmlParts.push('</li>');
      continue;
    }

    // Numbered constraint item inside list or standalone
    if (/^\d+\.\s+/.test(trimmed)) {
      flushQuote();
      if (!inList) {
        htmlParts.push('<ul>');
        inList = true;
      }
      htmlParts.push(`<li>${renderInline(trimmed)}</li>`);
      continue;
    }

    flushQuote();
    flushList();
    htmlParts.push(`<p>${renderInline(trimmed)}</p>`);
  }

  flushQuote();
  flushList();

  return htmlParts.join('\n');
}

/**
 * Split Markdown body by `## ` level-2 headings into structured sections.
 */
function parseSections(body) {
  const cleaned = body.replace(/^---\s*$/gm, '');
  const parts = cleaned.split(/^##\s+/m).filter(Boolean);
  const sections = [];

  for (const part of parts) {
    const firstNewline = part.indexOf('\n');
    if (firstNewline === -1) continue;
    const heading = part.slice(0, firstNewline).trim();
    const content = part.slice(firstNewline + 1).trim();
    sections.push({ heading, content });
  }

  return sections;
}

/**
 * Generate full standalone HTML page for a drill post.
 */
function generatePostHtml(postMeta, sections) {
  const themeKey = postMeta.theme || (postMeta.categories && postMeta.categories[1]) || 'Action';
  const themeClass = `pill-${themeKey.toLowerCase()}`;
  const themeLabel = THEME_LABELS[themeKey] || themeKey;
  const dateDisplay = String(postMeta.date || '').slice(0, 16);
  const charCount = Number(postMeta.char_count) || 0;
  const readMin = Math.max(1, Math.round(charCount / 500));

  const passBadgeHtml = postMeta.constraint_passed !== false
    ? `<span class="metric-chip pass">✓ 제약 조건 통과</span>`
    : `<span class="metric-chip fail">✕ 제약 조건 미달</span>`;

  const keywordsHtml = (postMeta.keywords || [])
    .map(kw => `<span class="metric-chip">#${escapeHtml(kw)}</span>`)
    .join('');

  const tagsHtml = (postMeta.tags || [])
    .map(tag => `<a href="../../?tag=${encodeURIComponent(tag)}" class="pill">#${escapeHtml(tag)}</a>`)
    .join('');

  const renderedSectionsHtml = sections.map((sec) => {
    const hLower = sec.heading.toLowerCase();
    const isPrompt = sec.heading.startsWith('1') || hLower.includes('과제');
    const isManuscript = sec.heading.startsWith('2') || hLower.includes('원고');
    const isRetro = sec.heading.startsWith('3') || hLower.includes('회고');
    const isFeedback = sec.heading.startsWith('4') || hLower.includes('피드백');

    if (isManuscript) {
      return `
        <section class="drill-section" aria-label="작성 원고">
          <h2 class="drill-section-title">${escapeHtml(sec.heading)}</h2>
          <div class="reader-toolbar" role="toolbar" aria-label="원고 뷰어 설정">
            <span class="toolbar-label">뷰어 모드 · 공백 포함 ${charCount.toLocaleString()}자</span>
            <div class="toolbar-actions">
              <button type="button" class="toolbar-btn" id="btn-mobile-width" aria-pressed="false">
                📱 모바일 폭 (390px)
              </button>
              <button type="button" class="toolbar-btn" id="btn-font-toggle" aria-pressed="false">
                Aa 고딕체 전환
              </button>
            </div>
          </div>
          <div class="manuscript-viewer" id="manuscript-viewer">
            ${renderMarkdownBlock(sec.content, true)}
          </div>
        </section>
      `;
    }

    const boxClass = isPrompt
      ? 'prompt-box'
      : isRetro
        ? 'retrospective-box'
        : isFeedback
          ? 'feedback-box'
          : 'prompt-box';

    return `
      <section class="drill-section">
        <h2 class="drill-section-title">${escapeHtml(sec.heading)}</h2>
        <div class="${boxClass}">
          ${renderMarkdownBlock(sec.content, false)}
        </div>
      </section>
    `;
  }).join('\n');

  return `<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="color-scheme" content="light dark">
    <meta name="description" content="${escapeHtml(postMeta.summary || postMeta.title)}">

    <!-- Favicons -->
    <link rel="icon" href="../../assets/img/icons/favicon-16x16.png" sizes="16x16" type="image/png">
    <link rel="icon" href="../../assets/img/icons/favicon-32x32.png" sizes="32x32" type="image/png">
    <link rel="icon" href="../../assets/img/icons/favicon.ico" sizes="48x48" type="image/x-icon">

    <!-- Stylesheets -->
    <link rel="stylesheet" href="../../assets/css/reset.css">
    <link rel="stylesheet" href="../../assets/css/global.css">
    <link rel="stylesheet" href="../../assets/css/post.css">

    <!-- Web Components -->
    <script type="module" src="../../assets/js/site-components.js"></script>

    <title>${escapeHtml(postMeta.title)} | Jacob's Novel Drill</title>
</head>
<body>
    <site-header></site-header>

    <main class="article-container">
        <article>
            <header class="article-header">
                <div class="article-category-row">
                    <span class="pill ${escapeHtml(themeClass)}">${escapeHtml(themeLabel)}</span>
                    <span class="pill">본 원고 Lv.${escapeHtml(String(postMeta.drill_level || 3))}</span>
                </div>

                <h1 class="article-title">${escapeHtml(postMeta.title)}</h1>
                ${postMeta.summary ? `<p class="article-summary">${escapeHtml(postMeta.summary)}</p>` : ''}

                <div class="article-meta-bar">
                    <div class="meta-author-group">
                        <div class="meta-avatar" aria-hidden="true">J</div>
                        <div class="meta-author-details">
                            <span class="meta-author-name">Jacob</span>
                            <span class="meta-date-sub">${escapeHtml(dateDisplay)} · ${readMin} min read</span>
                        </div>
                    </div>

                    <div class="meta-metrics-group">
                        ${passBadgeHtml}
                        <span class="metric-chip">${charCount.toLocaleString()}자</span>
                        ${keywordsHtml}
                    </div>
                </div>
            </header>

            ${renderedSectionsHtml}

            <footer class="article-footer">
                <div class="article-tags" aria-label="관련 태그">
                    ${tagsHtml}
                </div>
                <div class="article-back-row">
                    <a href="../../" class="btn btn-outline">← 전체 훈련 기록으로 돌아가기</a>
                </div>
            </footer>
        </article>
    </main>

    <site-footer></site-footer>

    <script type="module">
      const mobileBtn = document.getElementById('btn-mobile-width');
      const fontBtn = document.getElementById('btn-font-toggle');
      const viewer = document.getElementById('manuscript-viewer');

      if (mobileBtn && viewer) {
        mobileBtn.addEventListener('click', () => {
          const active = viewer.classList.toggle('mobile-preview-mode');
          mobileBtn.classList.toggle('active', active);
          mobileBtn.setAttribute('aria-pressed', String(active));
        });
      }

      if (fontBtn && viewer) {
        fontBtn.addEventListener('click', () => {
          const active = viewer.classList.toggle('font-sans-mode');
          fontBtn.classList.toggle('active', active);
          fontBtn.setAttribute('aria-pressed', String(active));
          fontBtn.textContent = active ? 'Aa 바탕체 전환' : 'Aa 고딕체 전환';
        });
      }
    </script>
</body>
</html>
`;
}

function buildAll() {
  if (!fs.existsSync(postsMdDir)) {
    fs.mkdirSync(postsMdDir, { recursive: true });
  }
  if (!fs.existsSync(postsHtmlDir)) {
    fs.mkdirSync(postsHtmlDir, { recursive: true });
  }

  const mdFiles = fs
    .readdirSync(postsMdDir)
    .filter(f => f.endsWith('.md'))
    .sort()
    .reverse();

  const manifest = [];
  const activeSlugs = new Set();

  for (const file of mdFiles) {
    const slug = file.replace(/\.md$/, '');
    activeSlugs.add(slug);

    const fullPath = path.join(postsMdDir, file);
    const raw = fs.readFileSync(fullPath, 'utf8');
    const { meta, body } = parseFrontmatter(raw);
    const sections = parseSections(body);

    // Automatically measure manuscript character count if not explicitly set
    const manuscriptSec = sections.find(s => s.heading.startsWith('2') || s.heading.includes('원고'));
    const computedCharCount = manuscriptSec ? manuscriptSec.content.trim().length : 0;
    const charCount = Number(meta.char_count) || computedCharCount;

    const categories = Array.isArray(meta.categories) ? meta.categories : ['Writing-Drill', 'Action'];
    const theme = categories[1] || 'Action';

    const postRecord = {
      id: slug,
      title: meta.title || slug,
      date: meta.date || '',
      categories,
      theme,
      tags: Array.isArray(meta.tags) ? meta.tags : ['판타지'],
      drill_level: Number(meta.drill_level) || 3,
      char_count: charCount,
      keywords: Array.isArray(meta.keywords) ? meta.keywords : [],
      constraint_passed: meta.constraint_passed !== false,
      summary: meta.summary || '',
      path: `/posts/${slug}/`,
      source_md: `_posts/${file}`
    };

    const outDir = path.join(postsHtmlDir, slug);
    fs.mkdirSync(outDir, { recursive: true });
    const htmlContent = generatePostHtml(postRecord, sections);
    fs.writeFileSync(path.join(outDir, 'index.html'), htmlContent, 'utf8');

    manifest.push(postRecord);
    console.log(`✅ Built HTML & indexed: ${slug} (${charCount} chars)`);
  }

  // Remove stale directories in `posts/` that are not in `_posts/`
  const existingHtmlDirs = fs.readdirSync(postsHtmlDir, { withFileTypes: true });
  for (const dirent of existingHtmlDirs) {
    if (dirent.isDirectory() && !activeSlugs.has(dirent.name)) {
      fs.rmSync(path.join(postsHtmlDir, dirent.name), { recursive: true, force: true });
      console.log(`🗑️ Removed stale post directory: posts/${dirent.name}`);
    }
  }

  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n', 'utf8');
  console.log(`\n📚 Updated data/posts.json with ${manifest.length} drill post(s).`);
}

buildAll();
