# Marce & Tony — marceandtony.com

The website for **Marcela Rivera & Tony Peñalva**, a live music duo on Roatán,
Bay Islands, Honduras.

Built to do one job: **turn a stranger searching Google into a booking enquiry.**

- 11 pages of static HTML. No database, no logins, nothing to break.
- **Zero dependencies.** Node 18+ is the only requirement.
- Builds in about 30ms. Total homepage weight: **~15 KB gzipped, 4 requests.**
- First contentful paint measured at **144ms.**
- Every page passes WCAG AA contrast, has valid structured data, and has a
  title and description inside Google's truncation limits.

---

## Everything you'll ever edit lives in one file

```
src/content/site.js
```

Gig dates, prices, bios, song list, contact details, testimonials, the FAQ —
all of it. Change something there, run `npm run build`, push. That's the
whole workflow.

```bash
npm run build     # build the site into dist/
npm run dev       # build and rebuild automatically as you edit
npm run serve     # build, then preview at http://localhost:4321
```

The build prints a warning for anything still unfinished, so you always know
what's left.

---

## 🚨 Before this goes live

Work top to bottom. The first three matter far more than the rest.

### 1. Buy the domain — `marceandtony.com`

This is the single biggest win available and it costs about $12/year.

A `*.canva.site` subdomain **cannot rank on Google.** You are building
authority on Canva's domain, not your own, and you can never move it. Every
link anyone ever shares points at someone else's property. Buy the real
domain (it matches the Instagram handle), then set `url` in `site.js`.

### 2. Add a WhatsApp number

On Roatán, WhatsApp *is* the phone. Right now the site only offers email,
and in a market where couples message four musicians at once, whoever answers
on WhatsApp first gets the booking.

In `site.js`, set `contact.whatsapp` to the number in full international
format, digits only — Honduras is country code `504`, so `50412345678`. Every
WhatsApp button on the site turns itself on automatically. Leave it blank and
they stay hidden.

### 3. Add real photos

Two files, and they carry more weight than any paragraph on the site:

| File | What it should be |
|---|---|
| `public/img/marcela.jpg` | Marcela performing. Portrait, roughly 800×1000. |
| `public/img/tony.jpg` | Tony performing. Portrait, roughly 800×1000. |

Shot live, with an audience or an instrument in frame — not a posed headshot.
Until they exist the About page shows a tasteful initial instead, so nothing
looks broken, but real photos convert far better.

Also worth replacing: `public/img/og.jpg` is the image that appears whenever
anyone shares the link on Facebook, WhatsApp or iMessage. A generated card
ships as a placeholder; a great live photo would do better.

### 4. Get real testimonials

`site.testimonials` is **deliberately empty**, and the section hides itself
while it is. Please don't invent quotes — fake reviews are illegal in the US,
UK, Canada and the EU (where most destination-wedding clients live) and
Google penalises them.

Instead, message the last five clients — Kimpton Grand Roatán, Luna Beach,
Blue Bahía, Caribe Tesoro, and any wedding couple — and ask for two sentences.
They will say yes. Then:

```js
testimonials: [
  { quote: 'They were the best decision we made all week.',
    author: 'Sarah & Mark',
    context: 'Wedding, West Bay, March 2026' },
],
```

### 5. Fill in the remaining `TODO`s

```bash
grep -n TODO src/content/site.js
```

Real gig dates, a Facebook link, a YouTube reel, and pruning the song list to
what they genuinely play.

---

## Deploying (free, about five minutes)

**Netlify** is the recommendation, because the booking form works with no
server and no third-party service.

1. Push this repo to GitHub.
2. netlify.com → *Add new site* → *Import an existing project* → pick the repo.
3. Build command `npm run build`, publish directory `dist`. Netlify reads the
   rest from `netlify.toml`.
4. *Domain settings* → add `marceandtony.com`.

Form submissions then appear under **Forms** in the Netlify dashboard.
Turn on email notifications so nothing sits unread — a missed enquiry is a
missed booking.

Vercel, Cloudflare Pages and GitHub Pages all work too, with the same build
command and output directory. On those hosts the booking form needs a service
like [Formspree](https://formspree.io) instead — swap the form's `action` in
`src/pages/contact.js` for your Formspree endpoint and delete the
`data-netlify` attribute.

---

## After launch — the SEO work that actually moves the needle

Ranked by return on effort.

1. **Google Business Profile.** Free, and the highest-value thing on this list.
   Register at [business.google.com](https://business.google.com) as a service-area
   business covering Roatán. It puts them in Google Maps and in the local pack,
   which is where "live music near me" searches actually land. Add photos monthly.
2. **Submit the sitemap.** [Google Search Console](https://search.google.com/search-console)
   → add the domain → submit `https://marceandtony.com/sitemap.xml`. This is also
   where you find out which searches are finding them.
3. **Update the gig calendar.** `site.gigs` feeds Google Event structured data,
   so real dates can appear directly in Google's event results. Nobody else on
   this island does this properly. A stale calendar is worse than an empty one.
4. **Get listed where the island already looks.** The Roatán Music Scene group
   on Facebook, Roatán wedding planners, resort activity pages, roatanet.com.
   Every link from a local site that Google already trusts is worth more than
   anything you can write about yourselves.
5. **Ask venues to link back.** Kimpton, Luna Beach, Blue Bahía and Caribe
   Tesoro all have websites. A link from a hotel's entertainment page is exactly
   the signal Google wants and it costs nothing but an email.

Already handled for you, so you never have to think about it: canonical URLs,
Open Graph and Twitter cards, `MusicGroup` / `LocalBusiness` / `Person` /
`Service` / `FAQPage` / `BreadcrumbList` / `MusicEvent` structured data,
a sitemap, robots.txt, geo tags, and a page-per-service so each one competes
for its own search.

---

## Why the pages are shaped the way they are

Four services, four pages, because "wedding musicians Roatán" and "live music
for restaurants Roatán" are completely different searches by completely
different people, and one page cannot win both.

**`/live-music-roatan/`** exists to catch tourists searching *"live music
Roatán tonight"* — one of the highest-volume searches on the island, and one
almost nobody answers with a real page. It's written to be genuinely useful
even to someone who never books them, because that is what earns links.

**`/proposals/`** is a small market with almost no competition and very high
intent. It costs one page to own it outright.

---

## The Friday rule

Tony plays guitar with **The Josh Green Band at Sundowner's on Half Moon Bay,
every Friday, 7–9pm.** Friday evenings are permanently unavailable.

Rather than bury that in an FAQ, it's built into the site as a feature:

- A note in the footer and a strip above it on every page.
- Its own section on the homepage, the About page and the island guide.
- On the booking form, **picking a Friday triggers an instant warning** before
  anyone wastes a week of email finding out.
- It's answered directly in the FAQ, which feeds Google's rich results.

It's charming, it's honest, and it saves real time. All of it is driven from
`site.fridayRule` — including the exact wording of the form warning. If the
arrangement ever changes, set `enabled: false` and every trace disappears.

---

## Project layout

```
src/content/site.js     ← all content. the only file you normally touch
src/layout.js           page shell, SEO tags, structured data
src/components.js       reusable sections (FAQ, gigs, CTAs, Friday block)
src/pages/              one file per page type
src/assets/css/         the stylesheet
src/assets/js/          menu, FAQ accordion, Friday detector
public/                 images and files copied straight through
build.js                the build. plain Node, no dependencies
dist/                   generated output — never edit, never commit
```
