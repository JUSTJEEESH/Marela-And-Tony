const { layout, site, esc, icon, faqSchema } = require('../layout.js');
const C = require('../components.js');

module.exports = function servicePage(svc) {
  const trail = [
    { href: '/', label: 'Home' },
    { href: '/' + svc.slug + '/', label: svc.title },
  ];

  const body = `
<section class="page-hero">
  <div class="wrap narrow">
    <nav class="crumbs" aria-label="Breadcrumb">
      <a href="/">Home</a> <span aria-hidden="true">/</span> <span>${esc(svc.title)}</span>
    </nav>
    <span class="page-hero-icon">${icon(svc.icon)}</span>
    <h1 class="h-display">${esc(svc.title)} on Roatán</h1>
    <p class="lede">${esc(svc.short)}</p>
    ${C.ctaButtons('Check your date', svc.title.toLowerCase() + ' on Roatán')}
  </div>
</section>

${C.credentialRow()}

<section class="band" aria-labelledby="blurb-h">
  <div class="wrap split">
    <div class="split-main">
      <h2 id="blurb-h" class="h-section">Why book us for this</h2>
      <p class="lede">${esc(svc.blurb)}</p>

      <h3 class="h-sub">${esc(svc.packagesTitle)}</h3>
      <div class="pkg-grid">
        ${svc.packages.map(p => `
        <div class="pkg">
          <h4>${esc(p.name)}</h4>
          <p>${esc(p.text)}</p>
        </div>`).join('')}
      </div>
    </div>

    <aside class="split-side">
      <div class="side-card side-card-strong">
        <h3>What is included</h3>
        <ul class="tick">
          ${svc.includes.map(i => `<li>${esc(i)}</li>`).join('')}
        </ul>
        <a class="btn btn-primary btn-block" href="/contact/">Check your date</a>
        ${site.fridayRule.enabled ? `<p class="side-friday"><b>Fridays:</b> ${esc(site.fridayRule.short)}</p>` : ''}
      </div>
      ${C.islandProof()}
    </aside>
  </div>
</section>

${C.testimonials()}
${C.faqList(svc.faq, 'Questions about ' + svc.title.toLowerCase())}

<section class="band band-alt" aria-labelledby="also-h">
  <div class="wrap">
    <h2 id="also-h" class="h-section center">We also play</h2>
    ${C.serviceCards(svc.slug)}
  </div>
</section>

${C.ctaSection(
  'Is your date free? Usually the answer is yes.',
  'Send the date, the location and roughly how many people. You will have a straight price back, usually the same day.',
  svc.title.toLowerCase() + ' on Roatán'
)}
`;

  return layout({
    title: svc.metaTitle,
    description: svc.metaDesc,
    path: '/' + svc.slug + '/',
    body,
    trail,
    bodyClass: 'page-service',
    schema: [
      faqSchema(svc.faq),
      {
        '@type': 'Service',
        name: svc.title + ' on Roatán',
        serviceType: svc.title,
        description: svc.metaDesc,
        provider: { '@id': site.url.replace(/\/$/, '') + '/#musicgroup' },
        areaServed: site.areas.map(a => ({ '@type': 'Place', name: a + ', Roatán, Honduras' })),
        audience: { '@type': 'Audience', audienceType: svc.title },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: svc.packagesTitle,
          itemListElement: svc.packages.map(p => ({
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: p.name, description: p.text },
          })),
        },
      },
    ].filter(Boolean),
  });
};
