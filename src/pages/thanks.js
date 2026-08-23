const { layout, site, esc, waLink } = require('../layout.js');

module.exports = function thanks() {
  const body = `
<section class="page-hero center thanks-hero">
  <div class="wrap narrow">
    <span class="thanks-tick" aria-hidden="true">&#10003;</span>
    <h1 class="h-display">Got it. Thank you.</h1>
    <p class="lede">Your enquiry is with us. We reply to booking messages the same day
       in almost every case — check your junk folder if you have not heard from us by
       tomorrow, because that is usually where we end up.</p>
    ${site.contact.whatsapp ? `
    <p class="lede">In a hurry? <a class="text-link" href="${waLink('Hi Marce & Tony — I just sent the booking form.')}" target="_blank" rel="noopener">Message us on WhatsApp</a> and we will see it faster.</p>` : ''}
    <div class="cta-row">
      <a class="btn btn-primary btn-lg" href="/">Back to the site</a>
      <a class="btn btn-ghost btn-lg" href="/songs/">Browse the song list</a>
    </div>
    ${site.fridayRule.enabled ? `<p class="micro friday-micro"><b>And remember —</b> ${esc(site.fridayRule.short)} Come and say hello.</p>` : ''}
  </div>
</section>`;

  return layout({
    title: 'Thank you — we have your enquiry',
    description: 'Your booking enquiry has been sent to Marce & Tony.',
    path: '/thanks/',
    body,
    noindex: true,
    bodyClass: 'page-thanks',
  });
};
