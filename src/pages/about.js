const { layout, site, esc, icon } = require('../layout.js');
const C = require('../components.js');

module.exports = function about() {
  const d = site.duo;
  const trail = [{ href: '/', label: 'Home' }, { href: '/about/', label: 'About' }];

  const members = d.members.map(m => `
  <article class="member" id="${esc(m.slug)}">
    <div class="member-photo">
      <img src="${esc(m.photo)}" alt="${esc(m.name)}, ${esc(m.role)}, of Marce &amp; Tony on Roatán"
           width="640" height="800" loading="lazy" decoding="async"
           onerror="this.closest('.member-photo').classList.add('is-missing')">
      <span class="photo-fallback" aria-hidden="true">${esc(m.short)}</span>
    </div>
    <div class="member-body">
      <h2 class="h-section">${esc(m.name)}</h2>
      <p class="member-role">${esc(m.role)}</p>
      <p class="lede">${esc(m.bio)}</p>

      <h3 class="h-sub">${esc(m.creditsTitle)}</h3>
      <ul class="tick">${m.credits.map(c => `<li>${esc(c)}</li>`).join('')}</ul>

      <h3 class="h-sub">${esc(m.specialtiesTitle)}</h3>
      <ul class="tick">${m.specialties.map(s => `<li>${esc(s)}</li>`).join('')}</ul>

      ${m.link ? `<p><a class="text-link" href="${esc(m.link)}" target="_blank" rel="noopener">More about ${esc(m.short)} at ${esc(m.link.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, ''))} <span aria-hidden="true">&rarr;</span></a></p>` : ''}
    </div>
  </article>`).join('');

  const body = `
<section class="page-hero">
  <div class="wrap narrow">
    <nav class="crumbs" aria-label="Breadcrumb">
      <a href="/">Home</a> <span aria-hidden="true">/</span> <span>About</span>
    </nav>
    <h1 class="h-display">Marcela Rivera &amp; Tony Peñalva</h1>
    <p class="lede">${esc(d.intro)}</p>
  </div>
</section>

${C.credentialRow()}

${C.videoSection('Watch them play')}

<section class="band">
  <div class="wrap">
    <div class="members">${members}</div>
  </div>
</section>

<section class="band band-alt" aria-labelledby="sound-h">
  <div class="wrap narrow">
    <span class="eyebrow">The sound</span>
    <h2 id="sound-h" class="h-section">Two guitars, two voices, two languages</h2>
    <p class="lede">Latin and Spanish-language standards, bossa and jazz, Caribbean and
       Garífuna music, and the English-language classics your guests already know.
       Fully self-contained — our own PA, microphones and battery power for the beach.</p>
    <p><a class="text-link" href="/songs/">See the full song list <span aria-hidden="true">&rarr;</span></a></p>
  </div>
</section>

${C.fridayBlock()}
${C.testimonials()}
${C.ctaSection(
  'Come and hear it for yourself.',
  'Or skip ahead and just tell us your date — we will let you know straight away whether we are free.',
  'a booking on Roatán'
)}
`;

  return layout({
    title: 'About Marcela Rivera & Tony Peñalva',
    description:
      'Marcela Rivera and Tony Peñalva are a bilingual live music duo on Roatán, with ' +
      'years of New York stages behind them — Lincoln Center, The Blue Note.',
    path: '/about/',
    body,
    trail,
    bodyClass: 'page-about',
    schema: [{
      '@type': 'AboutPage',
      name: 'About Marce & Tony',
      mainEntity: { '@id': site.url.replace(/\/$/, '') + '/#musicgroup' },
    }],
  });
};
