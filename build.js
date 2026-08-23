#!/usr/bin/env node
/* ============================================================================
   BUILD — turns src/ into a static site in dist/
   Zero dependencies. Run: npm run build
   ========================================================================== */
const fs = require('fs');
const path = require('path');

const site = require('./src/content/site.js');
const { abs } = require('./src/layout.js');

const OUT = path.join(__dirname, 'dist');

/* GitHub Pages project sites are served from a subpath —
   https://<user>.github.io/<repo>/ — so every root-absolute href and src has to
   be prefixed or the whole site 404s. BASE_PATH is supplied by the deploy
   workflow; locally it is empty and nothing changes.
   Set it to '' (or leave it unset) once a real domain is in place. */
const BASE = (process.env.BASE_PATH || '').replace(/\/$/, '');

/* Rewrites internal links only. Absolute URLs (https://…, mailto:, tel:) and
   protocol-relative URLs (//…) are left alone, as are the absolute URLs inside
   the JSON-LD block, which are already built from site.url. */
function applyBase(html) {
  if (!BASE) return html;
  return html.replace(/\s(href|src|action)="\/(?!\/)([^"]*)"/g,
    (_, attr, rest) => ` ${attr}="${BASE}/${rest}"`);
}
const rm = (p) => fs.existsSync(p) && fs.rmSync(p, { recursive: true, force: true });
const mk = (p) => fs.mkdirSync(p, { recursive: true });

function write(routePath, html) {
  // '/'            -> dist/index.html
  // '/weddings/'   -> dist/weddings/index.html
  // '/404.html'    -> dist/404.html
  let file;
  if (routePath.endsWith('.html')) file = path.join(OUT, routePath.replace(/^\//, ''));
  else file = path.join(OUT, routePath.replace(/^\//, ''), 'index.html');
  mk(path.dirname(file));
  fs.writeFileSync(file, applyBase(html));
  return file;
}

function copyDir(from, to) {
  if (!fs.existsSync(from)) return;
  mk(to);
  for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
    const s = path.join(from, entry.name), d = path.join(to, entry.name);
    if (entry.isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

/* ── Routes ───────────────────────────────────────────────────────────────── */
function buildRoutes() {
  const home       = require('./src/pages/home.js');
  const servicePg  = require('./src/pages/service.js');
  const about      = require('./src/pages/about.js');
  const songs      = require('./src/pages/songs.js');
  const liveMusic  = require('./src/pages/live-music.js');
  const contact    = require('./src/pages/contact.js');
  const thanks     = require('./src/pages/thanks.js');
  const notfound   = require('./src/pages/notfound.js');

  const routes = [
    { path: '/',                    html: home(),      priority: '1.0',  freq: 'weekly'  },
    ...site.services.map(s => ({
      path: `/${s.slug}/`,          html: servicePg(s), priority: '0.9', freq: 'monthly',
    })),
    { path: '/live-music-roatan/',  html: liveMusic(), priority: '0.8',  freq: 'weekly'  },
    { path: '/songs/',              html: songs(),     priority: '0.7',  freq: 'monthly' },
    { path: '/about/',              html: about(),     priority: '0.7',  freq: 'monthly' },
    { path: '/contact/',            html: contact(),   priority: '0.9',  freq: 'monthly' },
    { path: '/thanks/',             html: thanks(),    noindex: true },
    { path: '/404.html',            html: notfound(),  noindex: true },
  ];
  return routes;
}

/* ── sitemap.xml ──────────────────────────────────────────────────────────── */
function sitemap(routes) {
  const today = new Date().toISOString().slice(0, 10);
  const urls = routes.filter(r => !r.noindex).map(r => `  <url>
    <loc>${abs(r.path)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.freq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

/* ── robots.txt ───────────────────────────────────────────────────────────── */
function robots() {
  return `# ${site.name} — ${site.url}
User-agent: *
Allow: /
Disallow: /thanks/

Sitemap: ${abs('/sitemap.xml')}
`;
}

/* ── Web app manifest ─────────────────────────────────────────────────────── */
function manifest() {
  return JSON.stringify({
    name: site.name + ' — Live Music Roatán',
    short_name: site.name,
    description: site.description,
    start_url: (BASE || '') + '/',
    display: 'standalone',
    background_color: '#0b1f2a',
    theme_color: '#0b1f2a',
    icons: [
      { src: BASE + '/favicon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
      { src: BASE + '/img/apple-touch-icon.png', sizes: '180x180', type: 'image/png', purpose: 'any maskable' },
    ],
  }, null, 2);
}

/* ── Favicon (inline SVG — no image file needed, scales perfectly) ────────── */
function favicon() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#ff9a5a"/><stop offset="1" stop-color="#e8544e"/>
  </linearGradient></defs>
  <rect width="64" height="64" rx="14" fill="#0b1f2a"/>
  <circle cx="21" cy="45" r="7" fill="url(#g)"/>
  <circle cx="45" cy="39" r="7" fill="url(#g)"/>
  <path d="M28 45V20l24-4.5V39" fill="none" stroke="url(#g)" stroke-width="5"
        stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
}

/* ── Netlify / host config ────────────────────────────────────────────────── */
function netlifyToml() {
  return `[build]
  command = "npm run build"
  publish = "dist"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "SAMEORIGIN"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Permissions-Policy = "geolocation=(), microphone=(), camera=()"

[[headers]]
  for = "/css/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/js/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/img/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

# Old Canva URLs -> new pages, so nothing already shared on Facebook 404s.
[[redirects]]
  from = "/music"
  to = "/"
  status = 301

[[redirects]]
  from = "/index.html"
  to = "/"
  status = 301
`;
}

/* ── Run ──────────────────────────────────────────────────────────────────── */
function build() {
  const t0 = Date.now();
  rm(OUT); mk(OUT);

  const routes = buildRoutes();
  routes.forEach(r => write(r.path, r.html));

  copyDir(path.join(__dirname, 'src/assets'), OUT);
  copyDir(path.join(__dirname, 'public'), OUT);

  // Without this, GitHub Pages runs the output through Jekyll.
  fs.writeFileSync(path.join(OUT, '.nojekyll'), '');
  fs.writeFileSync(path.join(OUT, 'sitemap.xml'), sitemap(routes));
  fs.writeFileSync(path.join(OUT, 'robots.txt'), robots());
  fs.writeFileSync(path.join(OUT, 'site.webmanifest'), manifest());
  fs.writeFileSync(path.join(OUT, 'favicon.svg'), favicon());
  mk(path.join(OUT, 'img'));
  fs.writeFileSync(path.join(__dirname, 'netlify.toml'), netlifyToml());

  // --- Launch checklist: surface every remaining TODO ---
  const raw = fs.readFileSync(path.join(__dirname, 'src/content/site.js'), 'utf8');
  const todos = (raw.match(/TODO[^\n]*/g) || []).length;

  console.log(`\n  Built ${routes.length} pages in ${Date.now() - t0}ms -> dist/`);
  console.log(`  Site URL: ${site.url}${BASE ? `   (base path ${BASE})` : ''}`);
  routes.forEach(r => console.log(`    ${r.path}`));
  console.log(`\n  sitemap.xml · robots.txt · site.webmanifest · favicon.svg`);
  if (!site.contact.whatsapp)
    console.log(`\n  ! No WhatsApp number set in src/content/site.js — WhatsApp buttons are hidden.`);
  if (!site.testimonials.length)
    console.log(`  ! No testimonials yet — that section is hidden (correctly).`);
  if (todos) console.log(`  ! ${todos} TODO markers left in src/content/site.js\n`);
}

build();

if (process.argv.includes('--watch')) {
  console.log('  Watching src/ …');
  let t;
  fs.watch(path.join(__dirname, 'src'), { recursive: true }, () => {
    clearTimeout(t);
    t = setTimeout(() => {
      Object.keys(require.cache).forEach(k => { if (k.includes('/src/')) delete require.cache[k]; });
      try { build(); } catch (e) { console.error('  Build error:', e.message); }
    }, 80);
  });
}
