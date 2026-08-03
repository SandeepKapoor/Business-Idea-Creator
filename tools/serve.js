#!/usr/bin/env node
/*
 * tools/serve.js — serve the artifact locally for development.
 *
 * Zero dependencies, same as everything else here. The artifact is a single
 * self-contained file, so there is nothing to route: every path returns it.
 *
 * REBUILDS ON EVERY REQUEST. The build is pure concatenation of ~47 small files —
 * a few milliseconds — so there is no reason to make you remember to rebuild.
 * Edit anything under src/, hit refresh, see it. A build error is served as a
 * readable error page instead of a stale artifact, so a broken build is obvious.
 *
 *   node tools/serve.js            serve on 3007
 *   node tools/serve.js 8080       serve on another port
 */

'use strict';
const http = require('http');
const path = require('path');
const { execFileSync } = require('child_process');
const fs = require('fs');

const ROOT = path.join(__dirname, '..');
const ARTIFACT = path.join(ROOT, 'sandeep-idea-map.html');
const PORT = Number(process.argv[2]) || 3007;

const escape = (s) => s.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));

function rebuild() {
  execFileSync('node', ['build.js'], { cwd: ROOT, stdio: 'pipe' });
  return fs.readFileSync(ARTIFACT, 'utf8');
}

const server = http.createServer((req, res) => {
  if (req.url === '/favicon.ico') { res.writeHead(204).end(); return; }
  try {
    const html = rebuild();
    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store', // always the fresh build, never a 304
    });
    res.end(html);
  } catch (e) {
    const detail = escape([e.stdout, e.stderr, e.message].filter(Boolean).join('\n').trim());
    res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`<!DOCTYPE html><meta charset="utf-8"><title>build failed</title>` +
      `<body style="font:14px ui-monospace,monospace;padding:2rem;background:#1a1a19;color:#f0f0ee">` +
      `<h1 style="color:#ff6b6b;font-size:1rem">BUILD FAILED</h1><pre>${detail}</pre>` +
      `<p style="color:#888">Fix the source and refresh.</p>`);
  }
});

server.on('error', (e) => {
  if (e.code === 'EADDRINUSE') {
    console.error(`\n  port ${PORT} is already in use — free it, or: node tools/serve.js <other-port>\n`);
    process.exit(1);
  }
  throw e;
});

server.listen(PORT, () => {
  console.log(`\n  serving on  http://localhost:${PORT}`);
  console.log(`  rebuilds from src/ on every request — just refresh\n`);
});
