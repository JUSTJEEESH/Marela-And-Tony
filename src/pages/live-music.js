const { layout, site, esc, faqSchema } = require('../layout.js');
const C = require('../components.js');

/* This page exists to capture the single highest-volume search on this island:
   "live music Roatan [tonight]". Tourists search it constantly and almost
   nobody answers it with a real, current web page. Being genuinely useful here
   earns links and rankings that no amount of self-promotion would. */

module.exports = function liveMusic() {
  const f = site.fridayRule;
  const trail = [
    { href: '/', label: 'Home' },
    { href: '/live-music-roatan/', label: 'Live Music on Roatán' },
  ];

  const guideFaq = [
    { q: 'Where is the live music on Roatán?',
      a: 'Mostly West End and West Bay. West End — the strip along Half Moon Bay — has the highest concentration of bars and restaurants putting on live acts, and you can walk the whole thing in fifteen minutes. West Bay is more resort-driven, with music at the beach clubs and hotel bars. Sandy Bay and the East End have music too, but it is quieter and worth checking ahead.' },
    { q: 'What night is best for live music on Roatán?',
      a: 'Friday and Saturday are the busiest, but most West End venues put something on several nights a week in high season. Sunday afternoons on the beach are underrated. Cruise days bring daytime music to the beach clubs, which is a completely different scene from the evening one.' },
    { q: 'Do you need tickets for live music on Roatán?',
      a: 'Almost never. Nearly all live music here is free to walk into at a bar or restaurant — you are expected to buy a drink or a meal, and that is the whole arrangement. Ticketed shows exist but they are the exception.' },
    { q: 'What time does live music start on Roatán?',
      a: 'Early by mainland standards. Sunset sets typically start between 5 and 6pm, and evening acts usually run from around 7 to 9 or 10pm. If you turn up at 10pm expecting the night to be starting, you will often find it ending.' },
    { q: 'Is there live music on Roatán on a Friday?',
      a: `Yes, and Friday is one of the best nights for it. One fixture worth knowing: ${f.band} plays ${f.venue} on ${f.venueArea} every Friday from ${f.time}, with Tony Peñalva of Marce & Tony on guitar. It is free, it is right on the water, and the sunset does most of the work.` },
    { q: 'Can I hire live musicians on Roatán for a private event?',
      a: 'Yes. Marce & Tony play weddings, private and corporate events, proposals and venue nights across the island, and can be booked directly at marcebookings@gmail.com. Booking directly is normal here and usually costs less than going through a planner.' },
  ];

  const body = `
<section class="page-hero">
  <div class="wrap narrow">
    <nav class="crumbs" aria-label="Breadcrumb">
      <a href="/">Home</a> <span aria-hidden="true">/</span> <span>Live Music on Roatán</span>
    </nav>
    <h1 class="h-display">Live music on Roatán</h1>
    <p class="lede">Where to find it, what time it starts, and where we will be playing.
       An honest guide from two people who do this for a living on this island.</p>
  </div>
</section>

<section class="band" aria-labelledby="cal-h">
  <div class="wrap narrow">
    <span class="eyebrow">Our dates</span>
    <h2 id="cal-h" class="h-section">Where you can hear Marce &amp; Tony</h2>
    <p class="lede">Public, walk-up, no cover. Private events are not listed here for
       obvious reasons, so if the calendar looks quiet it usually is not.</p>
    ${C.upcomingGigs()}
  </div>
</section>

<section class="band band-alt" aria-labelledby="fri-guide-h">
  <div class="wrap narrow">
    <span class="eyebrow">Every single week</span>
    <h2 id="fri-guide-h" class="h-section">Friday night at ${esc(f.venue)}</h2>
    <p class="lede">If you are on the island on a Friday, this is the easy answer.
       ${esc(f.band)} plays ${esc(f.venue)} on ${esc(f.venueArea)} from ${esc(f.time)},
       every Friday, with Tony on guitar. Free, on the sand, facing west — which on
       Half Moon Bay is the entire point.</p>
    <div class="friday-card">
      <div class="fc-time">
        <span class="fc-day">${esc(f.day)}s</span>
        <span class="fc-hours">${esc(f.time)}</span>
      </div>
      <div class="fc-body">
        <h3>${esc(f.band)}</h3>
        <p>${esc(f.venue)} &middot; ${esc(f.venueArea)}</p>
        <p class="fc-note">Tony on guitar. Walk in. Order a rum. Say hello.</p>
      </div>
    </div>
    <p class="micro">This is also why we do not take Friday evening bookings — that slot
       is permanently spoken for. Friday daytime, and every other night, is open.</p>
  </div>
</section>

<section class="band" aria-labelledby="where-h">
  <div class="wrap narrow prose">
    <span class="eyebrow">The lay of the land</span>
    <h2 id="where-h" class="h-section">Where to actually go</h2>

    <h3 class="h-sub">West End</h3>
    <p>The main strip along Half Moon Bay is the densest concentration of live music on
       the island, and the great advantage is that you can walk it. Places like
       Sundowner's, Island Pearl and the Booty Bar all put on music, and on a good night
       you can stand in the road and hear three different acts. Start around six, follow
       whatever sounds best, and do not over-plan it.</p>

    <h3 class="h-sub">West Bay</h3>
    <p>More resort-driven and more polished. The beach clubs and hotel bars — Bananarama,
       Infinity Bay, the Kimpton Grand Roatán — programme music around sunset and around
       dinner service. This is where you go if you want a table, a proper meal and music
       at a volume you can talk over, rather than a barstool and a crowd.</p>

    <h3 class="h-sub">Sandy Bay and the East End</h3>
    <p>Quieter and more local. There is real music out here — Luna Beach, Blue Bahía,
       Caribe Tesoro all host acts — but it is worth checking ahead rather than driving
       out on spec. The reward is a room that is not full of people who arrived on a
       ship this morning.</p>

    <h3 class="h-sub">Cruise days</h3>
    <p>Roatán handles well over a million cruise passengers a year, and on a big ship day
       the beach clubs run live music through the middle of the day rather than the
       evening. If you are ashore for six hours, that daytime scene is the one you will
       actually catch — the evening acts start after most ships have sailed.</p>

    <h3 class="h-sub">How to find out what is on tonight</h3>
    <p>Schedules on this island move constantly — weather, boats, seasons, life. The
       Roatán Music Scene group on Facebook is where most acts and venues post, and it
       is the closest thing to a real-time listing. Failing that, walk West End at six
       o'clock and use your ears. It has never once failed.</p>
  </div>
</section>

${C.faqList(guideFaq, 'Live music on Roatán — common questions')}

${C.ctaSection(
  'Want live music at your own event?',
  'Weddings, private parties, corporate evenings, proposals, or a residency at your venue. Tell us the date.',
  'live music on Roatán'
)}
`;

  return layout({
    title: 'Live Music on Roatán — Where to Go Tonight',
    description:
      'A local guide to live music on Roatán: where to go in West End and West Bay, ' +
      'what time sets start, and where Marce & Tony play this week.',
    path: '/live-music-roatan/',
    body,
    trail,
    bodyClass: 'page-guide',
    schema: [faqSchema(guideFaq), ...C.gigSchema()].filter(Boolean),
  });
};
