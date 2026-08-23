const site = require('./content/site.js');

const esc = (s = '') => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

/* Absolute URL helper — canonical/OG tags must be absolute. */
const abs = (p = '/') => site.url.replace(/\/$/, '') + (p.startsWith('/') ? p : '/' + p);

const waLink = (text) => {
  if (!site.contact.whatsapp) return '';
  const t = encodeURIComponent(text || `Hi ${site.name} — I'd like to check your availability.`);
  return `https://wa.me/${site.contact.whatsapp}?text=${t}`;
};

const mailLink = (subject) =>
  `mailto:${site.contact.email}?subject=${encodeURIComponent(subject || 'Booking enquiry — ' + site.name)}`;

/* ── Icons (inline SVG, no icon font, no network request) ─────────────────── */
const icons = {
  rings: '<path d="M12 21a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z"/><path d="M8.5 9.5 7 4h10l-1.5 5.5"/>',
  glass: '<path d="M8 22h8"/><path d="M12 15v7"/><path d="M5 3h14l-1.5 6a5.5 5.5 0 0 1-11 0Z"/>',
  venue: '<path d="M3 21h18"/><path d="M5 21V8l7-5 7 5v13"/><path d="M9 21v-6h6v6"/>',
  heart: '<path d="M12 20.5S3.5 15 3.5 9.2A4.7 4.7 0 0 1 12 6.6a4.7 4.7 0 0 1 8.5 2.6C20.5 15 12 20.5 12 20.5Z"/>',
  ship:  '<path d="M3 17c1.5 0 2-1 3.5-1s2 1 3.5 1 2-1 3.5-1 2 1 3.5 1 2-1 3.5-1"/><path d="M5 14 4 9h16l-1 5"/><path d="M12 3v6"/>',
  mail:  '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 6 10-6"/>',
  wa:    '<path d="M3 21l1.6-4.5A8.5 8.5 0 1 1 8 20.2L3 21Z"/><path d="M9 10c.5 2 2.5 4 4.5 4.5l1-1.5 2 1a5 5 0 0 1-6-2 5 5 0 0 1-2-6l1 2Z"/>',
  ig:    '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="3.6"/><circle cx="17.2" cy="6.8" r="1"/>',
  fb:    '<path d="M14 8.5V7c0-1 .4-1.5 1.6-1.5H17V2.6A17 17 0 0 0 14.8 2.5C12.3 2.5 10.6 4 10.6 6.7v1.8H8V12h2.6v9.5H14V12h2.6l.4-3.5H14Z"/>',
  yt:    '<rect x="2.5" y="5.5" width="19" height="13" rx="4"/><path d="m10.5 9.5 5 2.5-5 2.5Z"/>',
  music: '<circle cx="7" cy="18" r="2.6"/><circle cx="18" cy="15.6" r="2.6"/><path d="M9.6 18V7.4l11-2v10.2"/>',
};
const icon = (n, cls = '') =>
  `<svg class="icon ${cls}" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${icons[n] || ''}</svg>`;

/* ── Navigation ───────────────────────────────────────────────────────────── */
const nav = [
  { href: '/',                              label: 'Home' },
  { href: '/weddings/',                     label: 'Weddings' },
  { href: '/private-and-corporate-events/', label: 'Private & Corporate' },
  { href: '/hotels-restaurants-and-venues/', label: 'For Venues' },
  { href: '/proposals/',                    label: 'Proposals' },
  { href: '/songs/',                        label: 'Songs' },
  { href: '/live-music-roatan/',            label: 'Live Music Tonight' },
  { href: '/about/',                        label: 'About' },
];

/* ── Structured data ──────────────────────────────────────────────────────── *
   The organisation graph is emitted on every page: MusicGroup + the two
   Person entities + service area. This is what teaches Google that "Marce &
   Tony", "Marcela Rivera" and "Tony Peñalva" are one connected entity, and
   it is what makes a knowledge panel possible later.                         */
function orgGraph() {
  const sameAs = [site.social.instagram, site.social.facebook, site.social.youtube,
                  site.social.spotify, site.social.tonySite].filter(Boolean);

  const people = site.duo.members.map(m => ({
    '@type': 'Person',
    '@id': abs('/about/#' + m.slug),
    name: m.name,
    jobTitle: m.role,
    description: m.bio,
    nationality: m.name.includes('Peñalva') ? { '@type': 'Country', name: 'Honduras' } : undefined,
    knowsLanguage: ['en', 'es'],
    memberOf: { '@id': abs('/#musicgroup') },
    url: m.link || abs('/about/'),
    sameAs: m.link ? [m.link] : undefined,
  }));

  return [
    {
      '@type': ['MusicGroup', 'LocalBusiness', 'PerformingGroup'],
      '@id': abs('/#musicgroup'),
      name: site.name,
      alternateName: ['Marcela Rivera & Tony Peñalva', 'Marce and Tony', 'Marce & Tony Roatán'],
      url: abs('/'),
      description: site.description,
      email: site.contact.email,
      telephone: site.contact.whatsappDisplay || undefined,
      genre: ['Latin', 'Jazz', 'Bossa Nova', 'World Music', 'Garifuna', 'Acoustic', 'Pop'],
      knowsLanguage: ['en', 'es'],
      member: people.map(p => ({ '@id': p['@id'] })),
      sameAs: sameAs.length ? sameAs : undefined,
      image: abs('/img/og.jpg'),
      logo: abs('/img/og.jpg'),
      priceRange: '$$',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Roatán',
        addressRegion: 'Bay Islands',
        addressCountry: 'HN',
      },
      areaServed: site.areas.map(a => ({ '@type': 'Place', name: a + ', Roatán' })),
      makesOffer: site.services.map(s => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: s.title,
          description: s.short,
          serviceType: s.title,
          provider: { '@id': abs('/#musicgroup') },
          areaServed: { '@type': 'Place', name: 'Roatán, Bay Islands, Honduras' },
        },
        url: abs('/' + s.slug + '/'),
      })),
      potentialAction: {
        '@type': 'ReserveAction',
        target: { '@type': 'EntryPoint', urlTemplate: abs('/contact/') },
        result: { '@type': 'Reservation', name: 'Live music booking' },
      },
    },
    ...people,
    {
      '@type': 'WebSite',
      '@id': abs('/#website'),
      url: abs('/'),
      name: site.name,
      inLanguage: 'en',
      publisher: { '@id': abs('/#musicgroup') },
    },
  ];
}

function breadcrumbs(trail) {
  if (!trail || trail.length < 2) return null;
  return {
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((t, i) => ({
      '@type': 'ListItem', position: i + 1, name: t.label, item: abs(t.href),
    })),
  };
}

function faqSchema(list) {
  if (!list || !list.length) return null;
  return {
    '@type': 'FAQPage',
    mainEntity: list.map(f => ({
      '@type': 'Question', name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

/* ── Header / Footer ──────────────────────────────────────────────────────── */
function header(current) {
  const links = nav.map(n => {
    const active = n.href === current;
    return `<li><a href="${n.href}"${active ? ' aria-current="page"' : ''}>${esc(n.label)}</a></li>`;
  }).join('');

  return `
<a class="skip" href="#main">Skip to content</a>
<header class="site-head" id="site-head">
  <div class="wrap head-inner">
    <a class="brand" href="/" aria-label="${esc(site.name)} — home">
      <span class="brand-mark" aria-hidden="true">${icon('music')}</span>
      <span class="brand-text"><b>Marce</b> <i>&amp;</i> <b>Tony</b></span>
    </a>
    <nav class="nav" id="nav" aria-label="Main">
      <ul>${links}</ul>
    </nav>
    <div class="head-cta">
      <a class="btn btn-sm btn-primary" href="/contact/">Check a date</a>
    </div>
    <button class="burger" id="burger" aria-expanded="false" aria-controls="nav" aria-label="Open menu">
      <span></span><span></span><span></span>
    </button>
  </div>
</header>`;
}

function fridayStrip() {
  const f = site.fridayRule;
  if (!f.enabled) return '';
  return `
<aside class="friday-strip" aria-label="Friday availability notice">
  <div class="wrap friday-strip-inner">
    <span class="friday-tag">Fridays</span>
    <p>${esc(f.short)} Everything else on the calendar is open —
       <a href="/contact/">check your date</a>.</p>
  </div>
</aside>`;
}

function footer() {
  const s = site.social;
  const socials = [
    s.instagram && `<a href="${s.instagram}" rel="me noopener" target="_blank" aria-label="Instagram">${icon('ig')}</a>`,
    s.facebook  && `<a href="${s.facebook}" rel="me noopener" target="_blank" aria-label="Facebook">${icon('fb')}</a>`,
    s.youtube   && `<a href="${s.youtube}" rel="me noopener" target="_blank" aria-label="YouTube">${icon('yt')}</a>`,
  ].filter(Boolean).join('');

  const serviceLinks = site.services
    .map(x => `<li><a href="/${x.slug}/">${esc(x.title)}</a></li>`).join('');

  const areaText = site.areas.join(' · ');
  const f = site.fridayRule;

  return `
<footer class="site-foot">
  <div class="wrap">
    <div class="foot-grid">
      <div class="foot-brand">
        <span class="brand-text big"><b>Marce</b> <i>&amp;</i> <b>Tony</b></span>
        <p class="foot-tag">${esc(site.tagline)}</p>
        <p class="foot-names">Marcela Rivera &amp; Tony Peñalva · Roatán, Bay Islands, Honduras</p>
        <div class="foot-social">${socials}</div>
      </div>

      <div class="foot-col">
        <h3>Book us for</h3>
        <ul>${serviceLinks}</ul>
      </div>

      <div class="foot-col">
        <h3>More</h3>
        <ul>
          <li><a href="/about/">About Marce &amp; Tony</a></li>
          <li><a href="/songs/">Song list</a></li>
          <li><a href="/live-music-roatan/">Live music on Roatán</a></li>
          <li><a href="/contact/">Check a date</a></li>
        </ul>
      </div>

      <div class="foot-col">
        <h3>Get in touch</h3>
        <ul class="foot-contact">
          <li><a href="${mailLink()}">${esc(site.contact.email)}</a></li>
          ${site.contact.whatsapp ? `<li><a href="${waLink()}" target="_blank" rel="noopener">WhatsApp ${esc(site.contact.whatsappDisplay)}</a></li>` : ''}
        </ul>
        ${f.enabled ? `<p class="foot-friday"><b>Fridays:</b> ${esc(f.short)}</p>` : ''}
      </div>
    </div>

    <p class="foot-areas"><b>We play across the island:</b> ${esc(areaText)}</p>

    <div class="foot-base">
      <p>&copy; ${new Date().getFullYear()} ${esc(site.name)}. All rights reserved.</p>
      <p class="foot-credit">Live music on Roatán, Bay Islands, Honduras.</p>
    </div>
  </div>
</footer>`;
}

/* Sticky mobile action bar — the highest-converting element on a phone. */
function mobileBar() {
  const wa = site.contact.whatsapp;
  return `
<div class="mobile-bar" role="group" aria-label="Contact ${esc(site.name)}">
  ${wa ? `<a class="mb-item mb-wa" href="${waLink()}" target="_blank" rel="noopener">${icon('wa')}<span>WhatsApp</span></a>` : ''}
  <a class="mb-item" href="${mailLink()}">${icon('mail')}<span>Email</span></a>
  <a class="mb-item mb-primary" href="/contact/">Check a date</a>
</div>`;
}

/* ── The page shell ───────────────────────────────────────────────────────── */
function layout(opts) {
  const {
    title, description, path = '/', body,
    schema = [], trail = null, ogImage = '/img/og.jpg',
    bodyClass = '', noindex = false,
  } = opts;

  const fullTitle = path === '/'
    ? `${title}`
    : `${title} | ${site.name}`;

  const graph = [...orgGraph(), breadcrumbs(trail), ...schema].filter(Boolean);
  const jsonld = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })
    .replace(/</g, '\\u003c');

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(fullTitle)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${abs(path)}">
${noindex ? '<meta name="robots" content="noindex,follow">' : '<meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1">'}
<meta name="theme-color" content="#0b1f2a">

<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(site.name)}">
<meta property="og:title" content="${esc(fullTitle)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${abs(path)}">
<meta property="og:image" content="${abs(ogImage)}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:locale" content="en_US">
<meta property="og:locale:alternate" content="es_HN">

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(fullTitle)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${abs(ogImage)}">

<meta name="geo.region" content="HN-BY">
<meta name="geo.placename" content="Roatán, Bay Islands, Honduras">
<meta name="geo.position" content="16.3167;-86.5333">
<meta name="ICBM" content="16.3167, -86.5333">

<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/img/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="/css/style.css">
<!-- Fonts load without blocking the first paint: if Google Fonts is slow or
     unreachable, the page still renders instantly in the fallback stack. -->
<link rel="stylesheet" media="print" onload="this.media='all';this.onload=null"
      href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap">
<noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap"></noscript>

<script type="application/ld+json">${jsonld}</script>
</head>
<body class="${bodyClass}">
${header(path)}
<main id="main">
${body}
</main>
${fridayStrip()}
${footer()}
${mobileBar()}
<script src="/js/main.js" defer></script>
</body>
</html>`;
}

module.exports = { layout, site, esc, abs, icon, waLink, mailLink, nav, faqSchema, breadcrumbs };
