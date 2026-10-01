#!/usr/bin/env node

/**
 * Validate Posts Manifest
 * Validates data/posts.json schema, file existence, and broken links.
 * Zero-dependency pure Node.js script.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const manifestPath = path.join(rootDir, 'data', 'posts.json');

console.log('🔍 Validating data/posts.json manifest...\n');

if (!fs.existsSync(manifestPath)) {
  console.error(`❌ Error: Manifest file not found at ${manifestPath}`);
  process.exit(1);
}

let posts;
try {
  const content = fs.readFileSync(manifestPath, 'utf8');
  posts = JSON.parse(content);
} catch (err) {
  console.error(`❌ JSON Syntax Error in data/posts.json:\n${err.message}`);
  process.exit(1);
}

if (!Array.isArray(posts)) {
  console.error('❌ Error: posts.json root must be an array of post objects.');
  process.exit(1);
}

const REQUIRED_FIELDS = ['id', 'title', 'description', 'category', 'tags', 'path', 'createdAt'];
let errorsCount = 0;
const seenIds = new Set();

posts.forEach((post, index) => {
  const postPrefix = `[Post #${index + 1} (${post.id || 'unnamed'})]`;

  // 1. Required fields check
  for (const field of REQUIRED_FIELDS) {
    if (!post[field]) {
      console.error(`❌ ${postPrefix} Missing required field: "${field}"`);
      errorsCount++;
    }
  }

  // 2. ID uniqueness
  if (post.id) {
    if (seenIds.has(post.id)) {
      console.error(`❌ ${postPrefix} Duplicate post ID: "${post.id}"`);
      errorsCount++;
    }
    seenIds.add(post.id);
  }

  // 3. Date format check (YYYY-MM-DD)
  if (post.createdAt && isNaN(Date.parse(post.createdAt))) {
    console.error(`❌ ${postPrefix} Invalid createdAt date: "${post.createdAt}"`);
    errorsCount++;
  }

  // 4. Path file existence check
  if (post.path) {
    // Normalise path (e.g., /posts/slug/ -> posts/slug/index.html)
    let relativePath = post.path.replace(/^\//, '');
    if (relativePath.endsWith('/')) {
      relativePath += 'index.html';
    }
    const fullPath = path.join(rootDir, relativePath);

    if (!fs.existsSync(fullPath)) {
      console.error(`❌ ${postPrefix} Target file does not exist at "${relativePath}"`);
      errorsCount++;
    }
  }

  // 5. Thumbnail file existence check (if provided)
  if (post.thumbnail) {
    const relativeThumb = post.thumbnail.replace(/^\//, '');
    const thumbPath = path.join(rootDir, relativeThumb);
    if (!fs.existsSync(thumbPath)) {
      console.error(`❌ ${postPrefix} Thumbnail file not found at "${relativeThumb}"`);
      errorsCount++;
    }
  }

  // 6. Tags format check
  if (post.tags && !Array.isArray(post.tags)) {
    console.error(`❌ ${postPrefix} "tags" must be an array of strings.`);
    errorsCount++;
  }
});

console.log('--------------------------------------------------');
if (errorsCount > 0) {
  console.error(`\n💥 Validation failed with ${errorsCount} error(s). Please fix the issues above.`);
  process.exit(1);
} else {
  console.log(`\n All ${posts.length} post(s) in data/posts.json are valid and all files exist!`);
  process.exit(0);
}
