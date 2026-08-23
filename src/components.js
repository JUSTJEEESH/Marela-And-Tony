const { site, esc, icon, waLink, mailLink } = require('./layout.js');

/* ── Primary call-to-action pair, used at the end of every page ───────────── */
function ctaButtons(label = 'Check your date', context = '') {
  const wa = site.contact.whatsapp;
  const msg = context
    ? `Hi Marce & Tony — I'm enquiring about ${context}.`
    : `Hi Marce & Tony — I'd like to check your availability.`;
  return `
<div class="cta-row">
  <a class="btn btn-primary btn-lg" href="/contact/">${esc(label)}</a>
  ${wa ? `<a class="btn btn-ghost btn-lg" href="${waLink(msg)}" target="_blank" rel="noopener">${icon('wa')} WhatsApp us</a>`
       : `<a class="btn btn-ghost btn-lg" href="${mailLink('Booking enquiry — ' + (context || site.name))}">${icon('mail')} ${esc(site.contact.email)}</a>`}
</div>`;
}

/* ── Big closing band ─────────────────────────────────────────────────────── */
function ctaSection(headline, sub, context) {
  const f = site.fridayRule;
  return `
<section class="band cta-band" aria-labelledby="cta-h">
  <div class="wrap narrow center">
    <h2 id="cta-h" class="h-display">${esc(headline)}</h2>
    <p class="lede">${esc(sub)}</p>
    ${ctaButtons('Check your date', context)}
    <p class="micro">${esc(site.contact.responseTime)}</p>
    ${f.enabled ? `<p class="micro friday-micro"><b>Friday note —</b> ${esc(f.short)} Daytime Fridays are open.</p>` : ''}
  </div>
</section>`;
}

/* ── FAQ accordion. Uses <details> so it works with JS disabled and is
      readable by Google for FAQ rich results. ──────────────────────────────── */
function faqList(items, heading = 'Questions people actually ask') {
  if (!items || !items.length) return '';
  return `
<section class="band" aria-labelledby="faq-h">
  <div class="wrap narrow">
    <h2 id="faq-h" class="h-section">${esc(heading)}</h2>
    <div class="faq">
      ${items.map((f, i) => `
      <details class="faq-item"${i === 0 ? ' open' : ''}>
        <summary><span>${esc(f.q)}</span><span class="chev" aria-hidden="true"></span></summary>
        <div class="faq-a"><p>${esc(f.a)}</p></div>
      </details>`).join('')}
    </div>
  </div>
</section>`;
}

/* ── Credential ticker — the single most persuasive element on the site ───── */
function credentialRow() {
  const c = site.duo.credentials;
  return `
<section class="creds" aria-label="Selected stages">
  <div class="wrap">
    <p class="creds-label">Stages they have played</p>
    <ul class="creds-list">
      ${c.map(x => `<li>${esc(x)}</li>`).join('')}
    </ul>
    <p class="creds-note">Tony Peñalva spent fifteen years as a core collaborator with Garífuna artist Aurelio Martínez, and performs as leader of The Garífuna Experiment.</p>
  </div>
</section>`;
}

/* ── Island venue proof — targeted at local venue managers & planners ─────── */
function islandProof() {
  const v = site.duo.islandVenues;
  return `
<div class="island-proof">
  <p class="island-proof-label">Already played on Roatán</p>
  <ul>${v.map(x => `<li>${esc(x)}</li>`).join('')}</ul>
</div>`;
}

/* ── Service cards ────────────────────────────────────────────────────────── */
function serviceCards(exclude) {
  const list = site.services.filter(s => s.slug !== exclude);
  return `
<div class="svc-grid">
  ${list.map(s => `
  <a class="svc-card" href="/${s.slug}/">
    <span class="svc-icon">${icon(s.icon)}</span>
    <h3>${esc(s.title)}</h3>
    <p>${esc(s.short)}</p>
    <span class="svc-more">See details <span aria-hidden="true">&rarr;</span></span>
  </a>`).join('')}
</div>`;
}

/* ── Testimonials — renders nothing until real quotes exist ───────────────── */
function testimonials() {
  const t = site.testimonials;
  if (!t || !t.length) return '';
  return `
<section class="band band-alt" aria-labelledby="tst-h">
  <div class="wrap">
    <h2 id="tst-h" class="h-section center">What clients say</h2>
    <div class="tst-grid">
      ${t.map(x => `
      <figure class="tst">
        <blockquote><p>${esc(x.quote)}</p></blockquote>
        <figcaption><b>${esc(x.author)}</b><span>${esc(x.context)}</span></figcaption>
      </figure>`).join('')}
    </div>
  </div>
</section>`;
}

/* ── Upcoming gigs. Past dates are filtered at build time. ─────────────────── */
function upcomingGigs(limit) {
  const today = new Date().toISOString().slice(0, 10);
  let list = (site.gigs || []).filter(g => g.date >= today).sort((a, b) => a.date.localeCompare(b.date));
  if (limit) list = list.slice(0, limit);
  if (!list.length) {
    return `<p class="gig-empty">No public dates listed right now — we are mostly on private events at the moment.
      <a href="/contact/">Ask us about your date.</a></p>`;
  }
  return `
<ul class="gigs">
  ${list.map(g => {
    const d = new Date(g.date + 'T12:00:00Z');
    const day = d.toLocaleDateString('en-US', { weekday: 'short', timeZone: 'UTC' });
    const dom = d.toLocaleDateString('en-US', { day: 'numeric', timeZone: 'UTC' });
    const mon = d.toLocaleDateString('en-US', { month: 'short', timeZone: 'UTC' });
    return `
  <li class="gig">
    <time class="gig-date" datetime="${esc(g.date)}">
      <span class="gd-day">${day}</span><span class="gd-dom">${dom}</span><span class="gd-mon">${mon}</span>
    </time>
    <div class="gig-info">
      <h3>${esc(g.venue)}</h3>
      <p>${esc(g.area)} · ${esc(g.start)}&ndash;${esc(g.end)}${g.note ? ' · ' + esc(g.note) : ''}</p>
    </div>
  </li>`;
  }).join('')}
</ul>`;
}

/* Google Event structured data for the gig calendar. */
function gigSchema() {
  const today = new Date().toISOString().slice(0, 10);
  return (site.gigs || [])
    .filter(g => g.date >= today && !/^TODO/i.test(g.venue))
    .map(g => ({
      '@type': 'MusicEvent',
      name: `${site.name} live at ${g.venue}`,
      startDate: `${g.date}T${g.start}:00-06:00`,
      endDate: `${g.date}T${g.end}:00-06:00`,
      eventStatus: 'https://schema.org/EventScheduled',
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
      performer: { '@id': site.url.replace(/\/$/, '') + '/#musicgroup' },
      location: {
        '@type': 'Place',
        name: g.venue,
        address: {
          '@type': 'PostalAddress',
          addressLocality: g.area,
          addressRegion: 'Bay Islands',
          addressCountry: 'HN',
        },
      },
      image: site.url.replace(/\/$/, '') + '/img/og.jpg',
      description: `${site.name} performing live at ${g.venue}, ${g.area}, Roatán.`,
    }));
}

/* ── The Friday block. Short: the card carries it. ────────────────────────── */
function fridayBlock() {
  const f = site.fridayRule;
  if (!f.enabled) return '';
  return `
<section class="band friday-band" id="fridays" aria-labelledby="fri-h">
  <div class="wrap narrow">
    <span class="eyebrow">The one exception</span>
    <h2 id="fri-h" class="h-section">${esc(f.day)} nights, Tony is taken</h2>
    <p class="lede">${esc(f.short)} It is the best free show in West End —
       come down, order a rum, say hello. Every other night, and Friday daytime,
       is bookable.</p>
    <div class="friday-card">
      <div class="fc-time">
        <span class="fc-day">${esc(f.day)}s</span>
        <span class="fc-hours">${esc(f.time)}</span>
      </div>
      <div class="fc-body">
        <h3>${esc(f.band)}</h3>
        <p>${esc(f.venue)} &middot; ${esc(f.venueArea)}</p>
        <p class="fc-note">Tony on guitar. Free to walk in.</p>
      </div>
    </div>
  </div>
</section>`;
}

/* ── Videos: the highest-converting content on the site ───────────────────── *
   Click-to-play facade: renders as a thumbnail + play button (a plain link to
   YouTube when JS is off), and swaps in the real player only when tapped, so
   the page stays fast. The first video gets the feature slot.                */
function videoSection(heading = 'Hear us before you book us') {
  const v = site.videos || [];
  if (!v.length) return '';
  const card = (x, feature) => `
  <a class="yt${feature ? ' yt-feature' : ''}" data-yt="${esc(x.id)}"
     href="https://www.youtube.com/watch?v=${esc(x.id)}" target="_blank" rel="noopener"
     aria-label="Play video: ${esc(x.title)}">
    <span class="yt-thumb">
      <img src="https://i.ytimg.com/vi/${esc(x.id)}/hqdefault.jpg"
           alt="" loading="lazy" decoding="async"
           onerror="this.closest('.yt').classList.add('no-thumb')">
      <span class="yt-play" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M8 5.5v13l11-6.5Z"/></svg></span>
    </span>
    <span class="yt-meta">
      <b>${esc(x.title)}</b>
      ${x.note ? `<em>${esc(x.note)}</em>` : ''}
    </span>
  </a>`;
  return `
<section class="band video-band" id="listen" aria-labelledby="vid-h">
  <div class="wrap">
    <span class="eyebrow center-block">Press play</span>
    <h2 id="vid-h" class="h-section center">${esc(heading)}</h2>
    <div class="video-grid${v.length === 1 ? ' one' : ''}">
      ${v.map((x, i) => card(x, i === 0)).join('')}
    </div>
    <p class="micro center video-micro">Tap to play. More on
      <a href="${esc(site.social.instagram)}" target="_blank" rel="noopener">Instagram</a>${site.social.youtube ? ` and <a href="${esc(site.social.youtube)}" target="_blank" rel="noopener">YouTube</a>` : ''}.</p>
  </div>
</section>`;
}

/* VideoObject structured data — makes the clips eligible for video results. */
function videoSchema() {
  return (site.videos || []).map(v => ({
    '@type': 'VideoObject',
    name: v.title,
    description: (v.note ? v.note + '. ' : '') + 'Live performance video — ' + site.name + ', live music on Roatán.',
    thumbnailUrl: `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`,
    embedUrl: `https://www.youtube-nocookie.com/embed/${v.id}`,
    contentUrl: `https://www.youtube.com/watch?v=${v.id}`,
    uploadDate: '2021-02-21',
    publisher: { '@id': site.url.replace(/\/$/, '') + '/#musicgroup' },
  }));
}

module.exports = {
  ctaButtons, ctaSection, faqList, credentialRow, islandProof, serviceCards,
  testimonials, upcomingGigs, gigSchema, fridayBlock, videoSection, videoSchema,
};
