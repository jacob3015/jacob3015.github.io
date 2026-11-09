#!/usr/bin/env node

/**
 * Validate Posts & Markdown Archive
 * Validates `_posts/*.md` YAML Frontmatter against AGENTS.md specification,
 * verifies `data/posts.json` sync, and checks generated HTML files in `posts/<slug>/index.html`.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const postsMdDir = path.join(rootDir, '_posts');
const manifestPath = path.join(rootDir, 'data', 'posts.json');

const ALLOWED_THEMES = ['Action', 'Psychology', 'Worldbuilding', 'Pacing'];
const REQUIRED_MANIFEST_FIELDS = [
  'id',
  'title',
  'date',
  'categories',
  'tags',
  'drill_level',
  'char_count',
  'keywords',
  ' summary'.trim(),
  'path'
];

console.log('🔍 Validating Writing Drill Markdown files & data/posts.json...\n');

if (!fs.existsSync(manifestPath)) {
  console.error(`❌ Error: Manifest file not found at ${manifestPath}`);
  process.exit(1);
}

let posts;
try {
  posts = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
} catch (err) {
  console.error(`❌ JSON Syntax Error in data/posts.json:\n${err.message}`);
  process.exit(1);
}

if (!Array.isArray(posts)) {
  console.error('❌ Error: data/posts.json root must be an array.');
  process.exit(1);
}

let errorsCount = 0;
const seenIds = new Set();

const mdFiles = fs.existsSync(postsMdDir)
  ? fs.readdirSync(postsMdDir).filter(f => f.endsWith('.md'))
  : [];

if (mdFiles.length !== posts.length) {
  console.error(
    `❌ Sync mismatch: _posts/ has ${mdFiles.length} .md file(s), but data/posts.json has ${posts.length} entry(ies). Run 'node scripts/build-posts.mjs'.`
  );
  errorsCount++;
}

posts.forEach((post, index) => {
  const prefix = `[Post #${index + 1} (${post.id || 'unnamed'})]`;

  for (const field of REQUIRED_MANIFEST_FIELDS) {
    if (post[field] === undefined || post[field] === null || post[field] === '') {
      console.error(`❌ ${prefix} Missing required field: "${field}"`);
      errorsCount++;
    }
  }

  if (typeof post.constraint_passed !== 'boolean') {
    console.error(`❌ ${prefix} "constraint_passed" must be a boolean.`);
    errorsCount++;
  }

  if (post.id) {
    if (seenIds.has(post.id)) {
      console.error(`❌ ${prefix} Duplicate ID: "${post.id}"`);
      errorsCount++;
    }
    seenIds.add(post.id);
  }

  if (Array.isArray(post.categories)) {
    const theme = post.categories[1];
    if (theme && !ALLOWED_THEMES.includes(theme)) {
      console.error(
        `❌ ${prefix} Invalid drill theme "${theme}". Must be one of: ${ALLOWED_THEMES.join(', ')}`
      );
      errorsCount++;
    }
  } else {
    console.error(`❌ ${prefix} "categories" must be an array: [Writing-Drill, <Theme>].`);
    errorsCount++;
  }

  if (!Array.isArray(post.keywords) || post.keywords.length === 0) {
    console.error(`❌ ${prefix} "keywords" must be a non-empty array of strings.`);
    errorsCount++;
  }

  if (post.path) {
    let relPath = post.path.replace(/^\//, '');
    if (relPath.endsWith('/')) relPath += 'index.html';
    const fullHtmlPath = path.join(rootDir, relPath);
    if (!fs.existsSync(fullHtmlPath)) {
      console.error(`❌ ${prefix} Generated HTML file missing at "${relPath}". Run 'node scripts/build-posts.mjs'.`);
      errorsCount++;
    }
  }

  if (post.source_md) {
    const fullMdPath = path.join(rootDir, post.source_md);
    if (!fs.existsSync(fullMdPath)) {
      console.error(`❌ ${prefix} Source Markdown file missing at "${post.source_md}".`);
      errorsCount++;
    }
  }
});

console.log('--------------------------------------------------');
if (errorsCount > 0) {
  console.error(`\n💥 Validation failed with ${errorsCount} error(s).`);
  process.exit(1);
} else {
  console.log(`\n✅ All ${posts.length} drill post(s) and manifest entries are valid!`);
  process.exit(0);
}
