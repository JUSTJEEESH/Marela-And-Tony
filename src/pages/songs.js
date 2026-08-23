const { layout, site, esc } = require('../layout.js');
const C = require('../components.js');

module.exports = function songs() {
  const trail = [{ href: '/', label: 'Home' }, { href: '/songs/', label: 'Song list' }];
  const total = site.repertoire.reduce((a, g) => a + g.songs.length, 0);

  const groups = site.repertoire.map(g => `
  <section class="rep-group">
    <h2 class="h-sub">${esc(g.group)}</h2>
    <ul class="rep-list">
      ${g.songs.map(s => `<li>${esc(s)}</li>`).join('')}
    </ul>
  </section>`).join('');

  const body = `
<section class="page-hero">
  <div class="wrap narrow">
    <nav class="crumbs" aria-label="Breadcrumb">
      <a href="/">Home</a> <span aria-hidden="true">/</span> <span>Song list</span>
    </nav>
    <h1 class="h-display">The song list</h1>
    <p class="lede">A working sample of what we play — bilingual, across five decades and
       four or five traditions. It is not the whole list, and it is never the whole night:
       we read the room and we take requests.</p>
    <p class="micro">Roughly ${total} songs shown. Ask for anything you do not see.</p>
  </div>
</section>

<section class="band">
  <div class="wrap">
    <div class="rep-grid">${groups}</div>
  </div>
</section>

<section class="band band-alt" aria-labelledby="req-h">
  <div class="wrap narrow center">
    <h2 id="req-h" class="h-section">Do not see your song?</h2>
    <p class="lede">We will learn it. For weddings and proposals, learning your song is
       included in the booking rather than charged as an extra — send it to us when you
       book and it will be ready on the day. We have not turned one down yet.</p>
    ${C.ctaButtons('Send us your song', 'a song request')}
  </div>
</section>

${C.ctaSection(
  'Ready to hear it at your event?',
  'Send the date and the details and we will come back with a straight price.',
  'a booking on Roatán'
)}
`;

  return layout({
    title: 'Song List & Repertoire',
    description:
      'The Marce & Tony song list — bilingual English and Spanish repertoire for Roatán ' +
      'weddings and events. Latin, jazz, Garífuna and first dances.',
    path: '/songs/',
    body,
    trail,
    bodyClass: 'page-songs',
  });
};
