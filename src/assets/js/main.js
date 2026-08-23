/* ============================================================================
   MARCE & TONY — front-end behaviour
   Small, dependency-free, and everything degrades gracefully without it.
   ========================================================================== */
(function () {
  'use strict';

  /* ── Mobile menu ────────────────────────────────────────────────────────── */
  var burger = document.getElementById('burger');
  var nav = document.getElementById('nav');
  if (burger && nav) {
    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        nav.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        nav.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
        burger.focus();
      }
    });
  }

  /* ── Header shadow on scroll ────────────────────────────────────────────── */
  var head = document.getElementById('site-head');
  if (head) {
    var ticking = false;
    var onScroll = function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        head.classList.toggle('scrolled', window.scrollY > 12);
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── The Friday detector ────────────────────────────────────────────────── *
     If somebody picks a Friday on the booking form, tell them immediately
     rather than letting them find out a week later over email.               */
  var dateInput = document.getElementById('date');
  var dateHint = document.getElementById('date-hint');

  if (dateInput && dateHint) {
    // Cannot book in the past.
    var today = new Date();
    var pad = function (n) { return String(n).padStart(2, '0'); };
    dateInput.min = today.getFullYear() + '-' + pad(today.getMonth() + 1) + '-' + pad(today.getDate());

    var FRIDAY_MSG = dateHint.getAttribute('data-friday-msg') ||
      'Heads up — that’s a Friday. Tony is on stage at Sundowner’s with ' +
      'The Josh Green Band from 7 to 9pm. We can absolutely do your event earlier in ' +
      'the day, or pick another night. Tell us below and we’ll sort it out.';

    var checkDate = function () {
      var v = dateInput.value;
      if (!v) { dateHint.hidden = true; return; }
      // Parse as local noon so timezone never shifts the weekday.
      var parts = v.split('-');
      var d = new Date(+parts[0], +parts[1] - 1, +parts[2], 12, 0, 0);
      if (d.getDay() === 5) {
        dateHint.textContent = FRIDAY_MSG;
        dateHint.hidden = false;
      } else {
        dateHint.hidden = true;
      }
    };

    dateInput.addEventListener('change', checkDate);
    dateInput.addEventListener('input', checkDate);
    checkDate();
  }

  /* ── Form: honest inline validation, no library ─────────────────────────── */
  var form = document.getElementById('booking-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      var invalid = form.querySelector(':invalid');
      if (invalid) {
        e.preventDefault();
        invalid.focus();
        invalid.scrollIntoView({ block: 'center', behavior: 'smooth' });
        return;
      }
      var btn = form.querySelector('button[type="submit"]');
      if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }
    });
  }

  /* ── Only one FAQ open at a time (keeps long pages scannable) ───────────── */
  var groups = document.querySelectorAll('.faq');
  Array.prototype.forEach.call(groups, function (group) {
    var items = group.querySelectorAll('details');
    Array.prototype.forEach.call(items, function (item) {
      item.addEventListener('toggle', function () {
        if (!item.open) return;
        Array.prototype.forEach.call(items, function (other) {
          if (other !== item) other.open = false;
        });
      });
    });
  });

})();

/* ── Click-to-play YouTube ──────────────────────────────────────────────────
   Cards are plain links to YouTube until this runs; a tap then swaps in the
   real player inline, muted-free and autoplaying, with zero YouTube weight
   loaded before that tap. */
(function () {
  'use strict';
  document.addEventListener('click', function (e) {
    var card = e.target.closest('.yt[data-yt]');
    if (!card || card.classList.contains('playing')) return;
    e.preventDefault();
    var id = card.getAttribute('data-yt');
    var thumb = card.querySelector('.yt-thumb');
    var iframe = document.createElement('iframe');
    iframe.src = 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(id) +
      '?autoplay=1&rel=0&modestbranding=1';
    iframe.title = card.getAttribute('aria-label') || 'Video player';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.allowFullscreen = true;
    thumb.innerHTML = '';
    thumb.appendChild(iframe);
    card.classList.add('playing');
    card.removeAttribute('href');
    card.setAttribute('role', 'group');
  });
})();
