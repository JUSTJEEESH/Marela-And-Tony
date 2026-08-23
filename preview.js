/* Bundles the built site into ONE self-contained HTML file with working
   client-side navigation, so the whole thing can be previewed from a link. */
const fs = require('fs'), path = require('path');
const D = path.join(__dirname, 'dist');
const read = p => fs.readFileSync(path.join(D, p), 'utf8');

/* The preview is injected into a host page's <body>, so a <meta charset> of our
   own would arrive too late to matter. Escaping every non-ASCII character makes
   the file render correctly regardless of how the host declares its encoding. */
const entHtml = s => s.replace(/[\u0080-\uFFFF]/g, c => '&#' + c.charCodeAt(0) + ';');
const entJs   = s => s.replace(/[\u0080-\uFFFF]/g, c =>
  '\\u' + c.charCodeAt(0).toString(16).padStart(4, '0'));
const entCss  = s => s.replace(/[\u0080-\uFFFF]/g, c =>
  '\\' + c.charCodeAt(0).toString(16).padStart(4, '0') + ' ');

const routes = [
  ['/', 'index.html'],
  ['/weddings/', 'weddings/index.html'],
  ['/private-and-corporate-events/', 'private-and-corporate-events/index.html'],
  ['/hotels-restaurants-and-venues/', 'hotels-restaurants-and-venues/index.html'],
  ['/proposals/', 'proposals/index.html'],
  ['/live-music-roatan/', 'live-music-roatan/index.html'],
  ['/songs/', 'songs/index.html'],
  ['/about/', 'about/index.html'],
  ['/contact/', 'contact/index.html'],
  ['/thanks/', 'thanks/index.html'],
];

const grab = (html, tag, cls) => {
  const re = new RegExp(`<${tag}[^>]*${cls ? `class="${cls}"` : ''}[^>]*>([\\s\\S]*?)<\\/${tag}>`);
  const m = html.match(re); return m ? m[0] : '';
};

const home = read('index.html');
const mainOf = h => { const m = h.match(/<main id="main">([\s\S]*?)<\/main>/); return m ? m[1] : ''; };

const header = grab(home, 'header');
const fridayStrip = grab(home, 'aside', 'friday-strip');
const footer = grab(home, 'footer');
const mobileBar = (home.match(/<div class="mobile-bar"[\s\S]*?<\/div>\s*(?=<script)/) || [''])[0];

const css = read('css/style.css');
const js  = read('js/main.js');

const sections = routes.map(([r, f]) =>
  `<div class="rt" data-route="${r}"${r === '/' ? '' : ' hidden'}>${mainOf(read(f))}</div>`
).join('\n');

const out = `<title>Marce &amp; Tony</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap">
<style>
${entCss(css)}

/* ── Preview-only chrome ──────────────────────────────────────────────────── */
.pv-note{position:relative;z-index:130;display:flex;flex-wrap:wrap;align-items:center;
  gap:.5rem 1rem;justify-content:center;padding:.7rem 1.15rem;font-family:var(--sans);
  font-size:.82rem;line-height:1.45;color:#0f2a18;text-align:center;
  background:linear-gradient(135deg,#7ee0a8,#4fc98a)}
.pv-note b{font-weight:700}
.pv-note span{opacity:.85}
.rt[hidden]{display:none}
</style>

<div class="pv-note">
  <b>Live preview</b>
  <span>Every link works — click through the whole site.</span>
  <span>The booking form is inert here; it delivers real enquiries once deployed.</span>
</div>

${entHtml(header)}
<main id="main">
${entHtml(sections)}
</main>
${entHtml(fridayStrip)}
${entHtml(footer)}
${entHtml(mobileBar)}

<script>
${entJs(js)}
</script>
<script>
/* Client-side router so the multi-page site previews from a single file. */
(function () {
  var routes = document.querySelectorAll('.rt');
  var navLinks = document.querySelectorAll('.nav a');

  function show(route) {
    var found = false;
    routes.forEach(function (r) {
      var match = r.dataset.route === route;
      r.hidden = !match;
      if (match) found = true;
    });
    if (!found) { routes[0].hidden = false; route = '/'; }
    navLinks.forEach(function (a) {
      var href = a.getAttribute('href');
      if (href === route) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
  }

  document.addEventListener('click', function (e) {
    var a = e.target.closest('a');
    if (!a) return;
    var href = a.getAttribute('href');
    if (!href) return;
    if (href.charAt(0) === '#') return;
    if (/^(https?:|mailto:|tel:)/.test(href)) return;   // external / email: leave alone
    e.preventDefault();
    show(href);
    var nav = document.getElementById('nav');
    var burger = document.getElementById('burger');
    if (nav && nav.classList.contains('open')) {
      nav.classList.remove('open');
      if (burger) burger.setAttribute('aria-expanded', 'false');
    }
  });

  // The form cannot post from a preview — show what would happen instead.
  var form = document.getElementById('booking-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      show('/thanks/');
    }, true);
  }
})();
</script>`;

fs.writeFileSync(path.join(__dirname, 'preview.html'), out);
console.log('preview.html', (Buffer.byteLength(out)/1024).toFixed(1) + ' KB, ' + routes.length + ' routes');
