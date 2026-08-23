const { layout, site, esc, icon, waLink, mailLink } = require('../layout.js');
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
    ${C.ctaButtons('Check your date')}
    <p class="hero-micro">Bilingual English &amp; Spanish &middot; Fully self-contained sound &middot; Weddings, private events, hotels &amp; restaurants</p>
  </div>
  <div class="hero-fade" aria-hidden="true"></div>
</section>

${C.credentialRow()}

<section class="band intro-band" aria-labelledby="intro-h">
  <div class="wrap split">
    <div class="split-main">
      <span class="eyebrow">Who you are hiring</span>
      <h2 id="intro-h" class="h-section">Nineteen years of New York stages, now on island time</h2>
      <p class="lede">${esc(d.intro)}</p>
      <p>What that means for you in practice: two musicians who show up early, who
         read a room instead of a setlist, who own and run their own sound, and who
         can move between English and Spanish without the evening losing its thread.
         There is a lot of live music on this island. There is not a lot of this.</p>
      <p><a class="text-link" href="/about/">Read the full story of Marce &amp; Tony <span aria-hidden="true">&rarr;</span></a></p>
    </div>
    <aside class="split-side">
      ${C.islandProof()}
      <div class="side-card">
        <h3>Book them for</h3>
        <ul class="tick">
          ${site.services.map(s => `<li><a href="/${s.slug}/">${esc(s.title)}</a></li>`).join('')}
        </ul>
      </div>
    </aside>
  </div>
</section>

<section class="band band-alt" aria-labelledby="svc-h">
  <div class="wrap">
    <h2 id="svc-h" class="h-section center">What we play, and who we play it for</h2>
    <p class="lede center narrow-p">Four different rooms, four different jobs. Pick the one that
       sounds like your event and we will tell you exactly what it costs.</p>
    ${C.serviceCards()}
  </div>
</section>

${C.fridayBlock()}

<section class="band" aria-labelledby="gig-h">
  <div class="wrap narrow">
    <span class="eyebrow">On the island this week</span>
    <h2 id="gig-h" class="h-section">Where to hear us live</h2>
    <p class="lede">Looking for live music on Roatán tonight? Here is where we will be.
       Walk up, no ticket, no cover.</p>
    ${C.upcomingGigs(4)}
    <p><a class="text-link" href="/live-music-roatan/">See the full calendar and the island guide <span aria-hidden="true">&rarr;</span></a></p>
  </div>
</section>

${C.processSteps()}
${C.testimonials()}
${C.faqList(site.faq.slice(0, 8))}
${C.ctaSection(
  'Tell us your date. We will tell you if it is free.',
  'One message with the date, the place and the rough headcount is all we need to send you a straight price.',
  'a booking on Roatán'
)}
`;

  return layout({
    title: 'Marce & Tony — Live Music on Roatán for Weddings & Events',
    description:
      'Bilingual live music duo on Roatán. Vocals and guitars for weddings, private ' +
      'events, proposals, hotels and restaurants. Check your date today.',
    path: '/',
    body,
    bodyClass: 'page-home',
    schema: [C.gigSchema(), require('../layout.js').faqSchema(site.faq)].flat().filter(Boolean),
  });
};
