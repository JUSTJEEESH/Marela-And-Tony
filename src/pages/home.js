const { layout, site, esc } = require('../layout.js');
const C = require('../components.js');

module.exports = function home() {
  const d = site.duo;

  const body = `
<section class="hero">
  <div class="hero-bg" aria-hidden="true">
    <div class="hero-sky"></div>
    <div class="hero-sun"></div>
    <div class="hero-sea"></div>
    <div class="hero-scrim"></div>
    <div class="hero-grain"></div>
  </div>
  <div class="wrap hero-inner">
    <p class="hero-eyebrow">Marcela Rivera &amp; Tony Peñalva &middot; Roatán, Bay Islands</p>
    <h1 class="hero-title">${esc(d.hook)}</h1>
    <p class="hero-sub">${esc(d.subhook)}</p>
    <div class="cta-row">
      <a class="btn btn-primary btn-lg" href="/contact/">Check your date</a>
      <a class="btn btn-ghost btn-lg" href="#listen">&#9654;&#xFE0E;&nbsp; Hear us play</a>
    </div>
    <p class="hero-micro">Bilingual English &amp; Spanish &middot; Own sound system &middot; Weddings, events, venues</p>
  </div>
  <div class="hero-fade" aria-hidden="true"></div>
</section>

${C.videoSection()}

${C.credentialRow()}

<section class="band" aria-labelledby="intro-h">
  <div class="wrap narrow">
    <span class="eyebrow">Who you are hiring</span>
    <h2 id="intro-h" class="h-section">New York stages, island time</h2>
    <p class="lede">${esc(d.intro)}</p>
    ${C.islandProof()}
    <p><a class="text-link" href="/about/">More about Marcela &amp; Tony <span aria-hidden="true">&rarr;</span></a></p>
  </div>
</section>

<section class="band band-alt" aria-labelledby="svc-h">
  <div class="wrap">
    <h2 id="svc-h" class="h-section center">What we play, and who we play it for</h2>
    ${C.serviceCards()}
  </div>
</section>

${C.fridayBlock()}

<section class="band" aria-labelledby="gig-h">
  <div class="wrap narrow">
    <span class="eyebrow">On the island</span>
    <h2 id="gig-h" class="h-section">Where to hear us live</h2>
    ${C.upcomingGigs(4)}
    <p><a class="text-link" href="/live-music-roatan/">Full calendar and the island guide <span aria-hidden="true">&rarr;</span></a></p>
  </div>
</section>

${C.testimonials()}
${C.faqList(site.faq.slice(0, 5))}
${C.ctaSection(
  'Tell us your date. We will tell you if it is free.',
  'One message with the date, the place and the rough headcount gets you a straight price — usually the same day.',
  'a booking on Roatán'
)}
`;

  return layout({
    title: 'Marce & Tony — Live Music on Roatán for Weddings & Events',
    description:
      'Bilingual live music duo on Roatán. Vocals and guitars for weddings, private ' +
      'events, proposals, hotels and restaurants. Watch them play, check your date.',
    path: '/',
    body,
    bodyClass: 'page-home',
    schema: [C.gigSchema(), C.videoSchema(), require('../layout.js').faqSchema(site.faq)].flat().filter(Boolean),
  });
};
