const { layout, site, esc, icon, waLink, mailLink, faqSchema } = require('../layout.js');
const C = require('../components.js');

module.exports = function contact() {
  const f = site.fridayRule;
  const trail = [{ href: '/', label: 'Home' }, { href: '/contact/', label: 'Check a date' }];
  const wa = site.contact.whatsapp;

  const eventTypes = [
    'Wedding — ceremony only',
    'Wedding — ceremony + cocktail hour',
    'Wedding — full day (ceremony, cocktail, dinner)',
    'Proposal',
    'Private party / villa event',
    'Corporate event or retreat',
    'Open house / property launch',
    'Hotel, restaurant or bar — one night',
    'Hotel, restaurant or bar — weekly residency',
    'Boat or catamaran charter',
    'Something else',
  ];

  const body = `
<section class="page-hero contact-hero">
  <div class="wrap narrow">
    <nav class="crumbs" aria-label="Breadcrumb">
      <a href="/">Home</a> <span aria-hidden="true">/</span> <span>Check a date</span>
    </nav>
    <h1 class="h-display">Check your date</h1>
    <p class="lede">Give us the date, the place and roughly how many people, and you will
       get a straight price back — usually the same day. No forms that go nowhere, no
       "packages start from" runaround.</p>
  </div>
</section>

<section class="band contact-band">
  <div class="wrap split split-wide">

    <div class="split-main">
      <h2 class="h-section form-h">Send us the details</h2>
      <form class="booking-form" id="booking-form"
            name="booking" method="POST"
            data-netlify="true" netlify-honeypot="company-website"
            action="/thanks/">
        <input type="hidden" name="form-name" value="booking">
        <p class="hp"><label>Do not fill this in: <input name="company-website" tabindex="-1" autocomplete="off"></label></p>

        <div class="field-row">
          <div class="field">
            <label for="name">Your name <span class="req">*</span></label>
            <input type="text" id="name" name="name" required autocomplete="name">
          </div>
          <div class="field">
            <label for="email">Email <span class="req">*</span></label>
            <input type="email" id="email" name="email" required autocomplete="email"
                   inputmode="email" placeholder="you@example.com">
          </div>
        </div>

        <div class="field-row">
          <div class="field">
            <label for="date">Date of your event <span class="req">*</span></label>
            <input type="date" id="date" name="date" required>
            <p class="field-hint" id="date-hint" data-friday-msg="${esc(f.formWarning)}" hidden></p>
          </div>
          <div class="field">
            <label for="time">Roughly what time?</label>
            <input type="text" id="time" name="time" placeholder="e.g. 4pm ceremony, 6pm cocktails">
          </div>
        </div>

        <div class="field">
          <label for="type">What is the event? <span class="req">*</span></label>
          <select id="type" name="event_type" required>
            <option value="">Choose one…</option>
            ${eventTypes.map(t => `<option>${esc(t)}</option>`).join('')}
          </select>
        </div>

        <div class="field-row">
          <div class="field">
            <label for="location">Where on the island?</label>
            <input type="text" id="location" name="location"
                   placeholder="e.g. West Bay Beach, or a venue name" list="areas">
            <datalist id="areas">
              ${site.areas.map(a => `<option value="${esc(a)}">`).join('')}
            </datalist>
          </div>
          <div class="field">
            <label for="guests">Roughly how many people?</label>
            <input type="text" id="guests" name="guests" inputmode="numeric" placeholder="e.g. 40">
          </div>
        </div>

        <div class="field">
          <label for="songs">Any songs that matter? <span class="opt">optional</span></label>
          <input type="text" id="songs" name="songs"
                 placeholder="First dance, a proposal song, or a vibe">
          <p class="field-hint static">If it is a first dance or a proposal, we will learn it. Included.</p>
        </div>

        <div class="field">
          <label for="message">Anything else we should know? <span class="opt">optional</span></label>
          <textarea id="message" name="message" rows="4"
                    placeholder="Timeline, whether there is power, if your planner is handling things, questions about price…"></textarea>
        </div>

        <div class="field field-check">
          <label class="check">
            <input type="checkbox" name="bilingual" value="yes">
            <span>Our guest list is a mix of English and Spanish speakers</span>
          </label>
        </div>

        <button type="submit" class="btn btn-primary btn-lg btn-block">Send this to Marce &amp; Tony</button>
        <p class="micro center">${esc(site.contact.responseTime)} We never pass your details to anybody else.</p>
      </form>
    </div>

    <aside class="split-side">
      <div class="side-card side-card-strong">
        <h3>Prefer to just message us?</h3>
        <p class="side-p">Completely fine — most of our bookings start this way.</p>
        <div class="contact-links">
          ${wa ? `
          <a class="contact-link" href="${waLink()}" target="_blank" rel="noopener">
            ${icon('wa')}
            <span><b>WhatsApp</b><em>${esc(site.contact.whatsappDisplay)}</em></span>
          </a>` : ''}
          <a class="contact-link" href="${mailLink()}">
            ${icon('mail')}
            <span><b>Email</b><em>${esc(site.contact.email)}</em></span>
          </a>
          ${site.social.instagram ? `
          <a class="contact-link" href="${esc(site.social.instagram)}" target="_blank" rel="noopener">
            ${icon('ig')}
            <span><b>Instagram</b><em>@marceandtony</em></span>
          </a>` : ''}
        </div>
      </div>

      ${f.enabled ? `
      <div class="side-card friday-side">
        <span class="friday-tag">Fridays</span>
        <h3>Tony is taken on Friday nights</h3>
        <p>${esc(f.short)}</p>
        <p class="side-p">Friday <b>daytime</b> is open, and so is every other night of
           the week. If your date is a Friday evening, tell us anyway — we will find
           you something that works.</p>
      </div>` : ''}

      <div class="side-card">
        <h3>What we will ask you</h3>
        <ul class="tick tick-sm">
          <li>The date, and whether it is fixed</li>
          <li>Where on the island</li>
          <li>How long you want music for</li>
          <li>Whether you need a microphone for speeches</li>
          <li>Whether there is power at the spot</li>
        </ul>
        <p class="side-p">Answer those in your first message and we can quote you straight away.</p>
      </div>
    </aside>
  </div>
</section>

${C.faqList(site.faq.slice(0, 8), 'Before you write')}
`;

  return layout({
    title: 'Check a Date & Book Live Music',
    description:
      'Check availability and book Marce & Tony for live music on Roatán — weddings, ' +
      'private events, proposals and venues. Same-day replies.',
    path: '/contact/',
    body,
    trail,
    bodyClass: 'page-contact',
    schema: [{
      '@type': 'ContactPage',
      name: 'Check a date — Marce & Tony',
      mainEntity: { '@id': site.url.replace(/\/$/, '') + '/#musicgroup' },
    }, faqSchema(site.faq.slice(0, 8))].filter(Boolean),
  });
};
