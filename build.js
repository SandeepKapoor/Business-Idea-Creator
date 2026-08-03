#!/usr/bin/env node
/*
 * build.js — assemble src/ into the single self-contained artifact.
 *
 * Zero dependencies. No node_modules, nothing to install, nothing to rot.
 * The whole build is: resolve includes, concatenate CSS, concatenate JS, inline both.
 *
 * WHY CONCATENATION AND NOT A BUNDLER
 * The script block is one shared scope, and the HTML uses inline `onclick="gen()"`
 * handlers that resolve against that scope. ES modules would scope every file
 * separately and break all 30-odd inline handlers. Concatenation preserves the exact
 * semantics of the original file, which is what makes the output verifiable.
 *
 * ORDER IS LOAD-BEARING. Files are concatenated in lexicographic order, which is why
 * every one carries a two-digit prefix. Some top-level statements run at parse time
 * (the framework grid, the idea bank, the picks list) and some `const`s are in their
 * temporal dead zone until later — see CONTEXT.md §16 "Gotchas". Renumbering a file
 * is a behavioural change. Don't do it casually.
 *
 * Usage:
 *   node build.js                 build once
 *   node build.js --watch         rebuild on any change under src/
 *   node build.js --no-banner     omit the "generated" banner (byte-identity checks)
 *   node build.js --out FILE      write somewhere other than the default
 */

'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const SRC = path.join(ROOT, 'src');
const DEFAULT_OUT = path.join(ROOT, 'sandeep-idea-map.html');

const argv = process.argv.slice(2);
const has = (f) => argv.includes(f);
const opt = (f, d) => { const i = argv.indexOf(f); return i >= 0 && argv[i + 1] ? argv[i + 1] : d; };

const BANNER = [
  '<!--',
  '  GENERATED FILE — do not edit directly.',
  '  Source lives in src/. Edit there, then run:  npm run build',
  '  Editing this file works, but the next build overwrites it.',
  '-->',
].join('\n');

/* Read a file and drop exactly one trailing newline, so joining with '\n'
   reproduces the original line stream with no doubled blank lines. */
function readPart(p) {
  const s = fs.readFileSync(p, 'utf8');
  return s.endsWith('\n') ? s.slice(0, -1) : s;
}

/* Every file in a directory, in lexicographic order. The numeric prefixes make that
   the load order — there is deliberately no separate manifest to fall out of sync. */
function ordered(dir, ext) {
  const d = path.join(SRC, dir);
  if (!fs.existsSync(d)) throw new Error(`missing source directory: src/${dir}`);
  const files = fs.readdirSync(d).filter((f) => f.endsWith(ext)).sort();
  if (!files.length) throw new Error(`no ${ext} files in src/${dir}`);
  return files.map((f) => path.join(d, f));
}

function concat(files) {
  return files.map(readPart).join('\n');
}

/* Resolve <!--@include path--> directives, recursively, with a cycle guard. */
function resolveIncludes(text, seen = []) {
  return text.replace(/^[ \t]*<!--@include\s+([^\s>]+?)\s*-->[ \t]*$/gm, (_, rel) => {
    if (seen.includes(rel)) throw new Error(`circular include: ${[...seen, rel].join(' -> ')}`);
    const p = path.join(SRC, rel);
    if (!fs.existsSync(p)) throw new Error(`include not found: src/${rel}`);
    return resolveIncludes(readPart(p), [...seen, rel]);
  });
}

function build() {
  const cssFiles = ordered('styles', '.css');
  const jsFiles = ordered('js', '.js');

  const css = concat(cssFiles);
  const js = concat(jsFiles);

  /* A literal </script> or </style> anywhere in the source would terminate the block
     early and silently produce a broken artifact. Catch it here, not in the browser. */
  if (/<\/script/i.test(js)) throw new Error('JS source contains a literal "</script" — split it as "<\\/script"');
  if (/<\/style/i.test(css)) throw new Error('CSS source contains a literal "</style"');

  let out = resolveIncludes(readPart(path.join(SRC, 'index.html')));

  const swap = (marker, open, body, close) => {
    const re = new RegExp(`^[ \\t]*<!--@${marker}-->[ \\t]*$`, 'm');
    if (!re.test(out)) throw new Error(`src/index.html is missing the <!--@${marker}--> marker`);
    out = out.replace(re, `${open}\n${body}\n${close}`);
  };
  swap('css', '<style>', css, '</style>');
  swap('js', '<script>', js, '</script>');

  if (!has('--no-banner')) out = out.replace(/^(<!DOCTYPE html>\n)/i, `$1${BANNER}\n`);

  const dest = path.resolve(ROOT, opt('--out', DEFAULT_OUT));
  fs.writeFileSync(dest, out + '\n');

  const kb = (Buffer.byteLength(out) / 1024).toFixed(0);
  const lines = out.split('\n').length;
  return { dest, kb, lines, css: cssFiles.length, js: jsFiles.length };
}

function once() {
  try {
    const r = build();
    const stamp = new Date().toTimeString().slice(0, 8);
    console.log(
      `${stamp}  built ${path.relative(ROOT, r.dest)} — ${r.lines} lines, ${r.kb} KB ` +
      `(${r.css} css + ${r.js} js + 15 sections)`
    );
    return true;
  } catch (e) {
    console.error(`\n  BUILD FAILED: ${e.message}\n`);
    if (!has('--watch')) process.exitCode = 1;
    return false;
  }
}

once();

if (has('--watch')) {
  console.log('watching src/ — ctrl-c to stop');
  let t = null;
  fs.watch(SRC, { recursive: true }, (_, f) => {
    if (f && /\.(css|js|html)$/.test(f)) {
      clearTimeout(t);
      t = setTimeout(once, 60); // debounce: editors write in bursts
    }
  });
}
