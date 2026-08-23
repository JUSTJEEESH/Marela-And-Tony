const { layout, site, esc } = require('../layout.js');

module.exports = function notfound() {
  const body = `
<section class="page-hero center">
  <div class="wrap narrow">
    <p class="hero-eyebrow">404</p>
    <h1 class="h-display">That page has wandered off down West End</h1>
    <p class="lede">It happens. Here is everything that definitely does exist:</p>
    <ul class="nf-links">
      ${site.services.map(s => `<li><a href="/${s.slug}/">${esc(s.title)}</a></li>`).join('')}
      <li><a href="/songs/">Song list</a></li>
      <li><a href="/live-music-roatan/">Live music on Roatán</a></li>
      <li><a href="/about/">About Marce &amp; Tony</a></li>
      <li><a href="/contact/">Check a date</a></li>
    </ul>
  </div>
</section>`;

  return layout({
    title: 'Page not found',
    description: 'That page could not be found.',
    path: '/404.html',
    body,
    noindex: true,
    bodyClass: 'page-404',
  });
};
