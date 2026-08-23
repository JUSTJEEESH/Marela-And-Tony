/* ============================================================================
   MARCE & TONY — SITE CONTENT
   ----------------------------------------------------------------------------
   THIS IS THE ONLY FILE YOU NEED TO EDIT for normal updates.
   Change something, run `npm run build`, push. That's it.

   Anything marked  // TODO  needs a real value before launch.
   Search this file for "TODO" to find every one of them.
   ========================================================================== */

const site = {

  /* ── 1. THE BASICS ──────────────────────────────────────────────────────── */
  name: 'Marce & Tony',
  legalNames: ['Marcela Rivera', 'Tony Peñalva'],
  tagline: 'Vocals & guitars. Live music on Roatán.',
  brandSuffix: 'Live Music Roatán',

  // TODO: buy this domain. It matches the Instagram handle (@marceandtony),
  // so it is the one to get. A *.canva.site subdomain CANNOT rank on Google —
  // this single change is the biggest SEO win available to you.
  //
  // SITE_URL overrides this at build time, which is how the GitHub Pages
  // deploy points canonical tags and the sitemap at the real published URL.
  // Once the domain is bought, set it here and it wins everywhere.
  url: process.env.SITE_URL || 'https://marceandtony.com',

  description:
    'Marce & Tony are a bilingual live music duo on Roatán — vocals and guitars ' +
    'for weddings, private and corporate events, proposals, hotels and ' +
    'restaurants. Nineteen years on New York stages, now based in the Bay Islands.',

  /* ── 2. CONTACT ─────────────────────────────────────────────────────────── */
  contact: {
    email: 'marcebookings@gmail.com',

    // TODO — ADD THIS. On Roatán, WhatsApp is how business actually happens.
    // Email loses bookings to whoever replies on WhatsApp first. Full
    // international format, digits only. Honduras is country code 504.
    // Example: '50412345678'.  Leave '' and every WhatsApp button disappears.
    whatsapp: '',
    whatsappDisplay: '',            // e.g. '+504 9876-5432'

    baseLocation: 'Roatán, Bay Islands, Honduras',
    responseTime: 'We reply to booking enquiries the same day, most days.',
  },

  social: {
    instagram: 'https://www.instagram.com/marceandtony',
    facebook:  '',   // TODO — add if they have a page
    youtube:   '',   // TODO — a 60-second live reel converts better than any photo
    spotify:   '',
    // Tony's professional site — a real, indexed domain linking back to you is
    // worth genuine SEO authority. Keep it.
    tonySite:  'https://www.tonypenalva.com/',
  },

  /* -- 2b. VIDEOS -- the most important content on the site ---------------- *
     Nobody books a band they have not heard. Each entry here becomes a
     click-to-play player on the homepage and the About page.

     To add a video: take the YouTube URL, e.g.
        https://www.youtube.com/watch?v=S5G4pfl3DJA
     and copy the part after "v=" as the id. That's it.

     Put the best 30-seconds-in video FIRST -- it gets the big slot.          */
  videos: [
    {
      id: 'S5G4pfl3DJA',
      title: 'Amanecer — The Garífuna Experiment, live',
      note: 'Tony Peñalva on guitar',
    },
    // TODO: add Marcela's videos and the duo videos from the Canva page here:
    // { id: 'XXXXXXXXXXX', title: 'Song name — where it was filmed', note: '' },
  ],

  /* ── 3. THE PITCH ───────────────────────────────────────────────────────── *
     This is the whole business in three lines. Their Canva page buries it on
     page two; here it is the first thing anybody reads.                      */
  duo: {
    hook: 'The duo that played Lincoln Center now plays Roatán.',

    subhook:
      'Bilingual vocals and guitars for weddings, private events and the best ' +
      'rooms on the island.',

    intro:
      'Marce & Tony are Marcela Rivera and Tony Peñalva — a bilingual ' +
      '(English/Spanish) vocals-and-guitars duo based in the Bay Islands. ' +
      'Between them they spent nearly two decades playing New York: Lincoln ' +
      'Center, The Blue Note, the Hollywood Bowl, the Carlyle and the Waldorf ' +
      'Astoria, Rockwood Music Hall, an NPR Tiny Desk Concert. In 2025 they ' +
      'moved to Roatán. Now they bring that same standard to a beach ceremony ' +
      'in West Bay, a corporate reception, or a Friday night on the water.',

    // Shown as a row of logos/wordmarks near the top of the homepage.
    // These are the credentials that make a wedding planner stop scrolling.
    credentials: [
      'NPR Tiny Desk',
      'Lincoln Center',
      'The Blue Note NYC',
      'The Hollywood Bowl',
      'The Carlyle',
      'Waldorf Astoria',
    ],

    // Roatán venues they have already played. For a local venue manager or a
    // wedding planner, THIS list closes the deal — it says "we are not a risk".
    islandVenues: [
      'Kimpton Grand Roatán',
      'Luna Beach Resort',
      'Blue Bahía Resort',
      'Caribe Tesoro',
    ],

    members: [
      {
        slug: 'marcela-rivera',
        name: 'Marcela Rivera',
        short: 'Marce',
        role: 'Singer-Songwriter · Vocals & Guitar',
        photo: '/img/marcela.jpg',                       // TODO: add real photo
        bio:
          'Bilingual singer-songwriter and guitarist. Fourteen years on New ' +
          'York stages, now in the Bay Islands — known for warm, atmospheric ' +
          'sets that make a cocktail hour feel like the point of the evening.',
        creditsTitle: 'Selected performances',
        credits: [
          'New York: Rockwood Music Hall, ShapeShifter Lab, Shrine, Silvana, Arlene’s Grocery, Branded Saloon, Music Inn World Instruments',
          'Make Music NY Summer Music Festival',
          'Bay Islands: Kimpton Grand Roatán, Luna Beach, Blue Bahía, Caribe Tesoro',
        ],
        specialtiesTitle: 'Specialties',
        specialties: [
          'Bilingual sets with seamless English–Spanish transitions',
          'Atmospheric performance tailored to cocktail hours, corporate lounges and private receptions',
          'Original songwriting alongside a deep cover repertoire',
        ],
      },
      {
        slug: 'tony-penalva',
        name: 'Tony Peñalva',
        short: 'Tony',
        role: 'Guitarist · Composer',
        photo: '/img/tony.jpg',                          // TODO: add real photo
        bio:
          'Honduran guitarist and composer. Nineteen years in New York, ' +
          'fifteen of them with Garífuna legend Aurelio Martínez — jazz and ' +
          'world music fused with the traditional rhythm of this coast.',
        creditsTitle: 'Selected credits',
        credits: [
          'Fifteen-year core member and collaborator with world-renowned Garífuna artist Aurelio Martínez (Garífuna Soul)',
          'Leader of The Garífuna Experiment, blending guitar, contemporary styles and Garífuna tradition',
          'Trusted performer for premier New York entertainment agencies including Elan Artists and Hank Lane Music',
          'Stages include the NPR Tiny Desk, Lincoln Center, The Blue Note NYC, the Hollywood Bowl, The Carlyle Hotel and the Waldorf Astoria',
        ],
        specialtiesTitle: 'Specialties',
        specialties: [
          'Jazz, bossa and world-music guitar for refined rooms',
          'Contemporary and traditional Garífuna repertoire',
          'Composition and arrangement for bespoke event music',
        ],
        // Shown as a small "more about Tony" link. Real backlink, real authority.
        link: 'https://www.tonypenalva.com/',
      },
    ],
  },

  /* ── 4. THE FRIDAY RULE ─────────────────────────────────────────────────── *
     Tony has a standing Friday-night commitment. Surfaced on the booking form,
     the availability section and the calendar so nobody wastes a week of email
     finding out. Set `enabled: false` if it ever changes.                     */
  fridayRule: {
    enabled: true,
    band: 'The Josh Green Band',
    venue: 'Sundowner’s',
    venueArea: 'Half Moon Bay, West End',
    time: '7–9pm',
    day: 'Friday',
    short: 'Tony plays Fridays with The Josh Green Band at Sundowner’s, 7–9pm.',
    long:
      'One standing rule, and it is not negotiable: Tony is spoken for on ' +
      'Friday nights. He plays guitar with The Josh Green Band at Sundowner’s ' +
      'on Half Moon Bay, 7–9pm, every single Friday. It is the best free show ' +
      'in West End and we are not moving it for anybody. So — book us Saturday ' +
      'through Thursday, or book us Friday daytime. Or just come down Friday ' +
      'evening, order a rum, and say hello.',
    formWarning:
      'Heads up — that’s a Friday. Tony is on stage at Sundowner’s with The ' +
      'Josh Green Band from 7 to 9pm. We can absolutely do your event earlier ' +
      'in the day, or pick another night. Tell us below and we’ll sort it out.',
  },

  /* ── 5. SERVICES ────────────────────────────────────────────────────────── *
     Each one becomes its own page with its own Google ranking. `slug` = URL.  */
  services: [
    {
      slug: 'weddings',
      icon: 'rings',
      title: 'Weddings',
      navTitle: 'Weddings',
      short: 'Ceremony, cocktail hour and dinner — live, on the sand.',
      metaTitle: 'Wedding Music on Roatán — Ceremony & Cocktail',
      metaDesc:
        'Live wedding music on Roatán from a bilingual duo with Lincoln Center ' +
        'credits. Ceremony, cocktail hour and dinner across the Bay Islands.',
      blurb:
        'You are planning the biggest day of your life from another country, ' +
        'and every vendor is a stranger on the internet. Here is what you are ' +
        'actually getting: two musicians who have played Lincoln Center and the ' +
        'Waldorf Astoria, who bring their own sound system, who work off your ' +
        'timeline to the minute, and who will learn your first-dance song ' +
        'whether or not we have ever heard it. We do this in English and in ' +
        'Spanish, which matters more than most couples expect when half the ' +
        'guest list flew in from somewhere else.',
      packagesTitle: 'The three moments we cover',
      packages: [
        { name: 'Ceremony',     text: 'Processional, the moment itself, recessional — plus a microphone for your officiant and your vows. Guests hear every word.' },
        { name: 'Cocktail hour', text: 'The stretch between the ceremony and dinner is where a wedding either lifts off or stalls. This is exactly what Marcela specialises in.' },
        { name: 'Dinner',       text: 'Warm, low, bilingual background sets that let people talk — then lift when the speeches and the first dance arrive.' },
      ],
      includes: [
        'A planning call to lock your songs and your timeline',
        'Your first-dance song learned for the day, at no extra cost',
        'Full PA, microphones and stands — we are entirely self-contained',
        'A microphone for the officiant, vows, readings and toasts',
        'Bilingual English/Spanish sets for international guest lists',
        'Setup, soundcheck and teardown you never have to think about',
        'We coordinate directly with your planner or coordinator',
      ],
      faq: [
        { q: 'Can you learn our first-dance song?',
          a: 'Yes, and it is included. Send it to us when you book and it will be ready on the day. We have never turned a song down.' },
        { q: 'Do you provide a microphone for the ceremony and speeches?',
          a: 'Yes — a microphone for your officiant, your vows and your toasts is part of every wedding booking. It is the single most common thing couples forget to arrange, and the one guests notice most when it is missing.' },
        { q: 'Do you play in Spanish as well as English?',
          a: 'Both, fluently, and we move between them inside a single set. If your guest list is split between countries, this is the detail that makes everyone feel like the wedding was for them too.' },
        { q: 'What if it rains?',
          a: 'It is the Caribbean; it rains, usually briefly. We move under cover with your planner and keep playing. Our gear is protected and weather never costs you extra.' },
        { q: 'Is there power on the beach?',
          a: 'Most venues have an outlet within reach. Where there is none, we can run a full ceremony on battery power — just tell us early so we bring the right rig.' },
        { q: 'How far in advance should we book?',
          a: 'High season on Roatán runs roughly December through April and those Saturdays go first. Six to twelve months out is sensible; if your date is closer than that, ask anyway.' },
      ],
    },

    {
      slug: 'private-and-corporate-events',
      icon: 'glass',
      title: 'Private & Corporate Events',
      navTitle: 'Private & Corporate',
      short: 'Villas, receptions, retreats, open houses and milestone birthdays.',
      metaTitle: 'Private & Corporate Event Music, Roatán',
      metaDesc:
        'Live music for private and corporate events on Roatán — villa parties, ' +
        'receptions, retreats and birthdays. Bilingual vocals and guitars.',
      blurb:
        'Rented a villa in West Bay for the week. Flying a leadership team in ' +
        'for a retreat. Opening a property and needing the room to feel alive ' +
        'the second people walk through the door. This is the work we did for ' +
        'New York agencies — Elan Artists, Hank Lane Music — for years, which ' +
        'means we know the difference between music that fills a room and music ' +
        'that takes it over. We come to you, anywhere on the island.',
      packagesTitle: 'What we cover',
      packages: [
        { name: 'Private celebrations', text: 'Milestone birthdays, anniversaries, family reunions, villa parties and boat charters.' },
        { name: 'Corporate & retreats', text: 'Welcome receptions, dinners, incentive trips and lounge sets that read as expensive because they are good.' },
        { name: 'Open houses',          text: 'Property launches and open houses where the room has to feel warm from the first minute.' },
      ],
      includes: [
        'We travel to your villa, dock, deck, terrace or resort suite',
        'Fully self-contained — PA, microphones, cabling, power solutions',
        'Bilingual sets for mixed international groups',
        'Background-volume or full sing-along, and we read which one you need',
        'Requests taken ahead of time and built into the night',
        'Boat and catamaran charters — we have sea legs',
      ],
      faq: [
        { q: 'Will you come to our villa?',
          a: 'Anywhere on Roatán. Anything past French Harbour may carry a small travel fee, and we will always tell you that up front rather than at the end.' },
        { q: 'Can you play on a boat?',
          a: 'Yes. Let us know the size of the vessel and whether there is power, and we will bring the right setup.' },
        { q: 'Can you keep it at background volume?',
          a: 'That is most of what we do. A corporate reception needs music people can talk over; a birthday at 11pm does not. We read the room and adjust.' },
        { q: 'Do you work with event planners and DMCs?',
          a: 'Regularly, and we are easy to work with — we hit the timeline, we do not need managing, and we communicate in English or Spanish.' },
      ],
    },

    {
      slug: 'hotels-restaurants-and-venues',
      icon: 'venue',
      title: 'Hotels, Restaurants & Venues',
      navTitle: 'For Venues',
      short: 'A residency that fills tables and keeps guests ordering.',
      metaTitle: 'Live Music for Roatán Hotels & Restaurants',
      metaDesc:
        'Book live music for your Roatán hotel or restaurant. Bilingual duo, own ' +
        'PA, weekly residencies or single nights. Played Kimpton Grand Roatán.',
      blurb:
        'If you run a resort restaurant or a beach bar here, you already know ' +
        'the failure modes: the act that arrives late, the act that plays over ' +
        'the conversation, the act that empties the terrace by nine. We have ' +
        'already played Kimpton Grand Roatán, Luna Beach, Blue Bahía and Caribe ' +
        'Tesoro on this island, and rooms like The Carlyle and the Waldorf ' +
        'Astoria before that. We turn up early, we soundcheck before service, ' +
        'and we play at a volume your guests can talk — and order — over.',
      packagesTitle: 'How we work with venues',
      packages: [
        { name: 'Weekly residency', text: 'A fixed night, every week. Your regulars build a habit around it and your slowest night stops being your slowest night.' },
        { name: 'Seasonal contract', text: 'High-season cover, agreed in advance, at a rate that works because the dates are guaranteed.' },
        { name: 'One-off nights',    text: 'Holidays, special events, or covering a gap when another act falls through.' },
      ],
      includes: [
        'Set up and soundchecked before your service begins — every time',
        'Self-contained PA sized for restaurant and beach-bar rooms, or we plug into your house system',
        'Conversation-friendly volume by default',
        'Repertoire read to your crowd: honeymooners, ship days, expat regulars',
        'Bilingual sets for guests and for your team',
        'Every date promoted to our own audience, driving covers to you',
      ],
      faq: [
        { q: 'Do you bring your own sound system?',
          a: 'Yes, sized for restaurants and beach bars rather than nightclubs. If you have a house system we will happily plug into it instead.' },
        { q: 'How long is a typical set?',
          a: 'Two to three hours with short breaks, which fits standard dinner service on the island. We will match whatever shape your night takes.' },
        { q: 'Can you do a weekly residency?',
          a: 'It is the arrangement we like most. Ask about seasonal rates for a guaranteed weekly night.' },
        { q: 'Are you available on Fridays?',
          a: 'Daytime yes, evenings no. Tony plays with The Josh Green Band at Sundowner’s from 7 to 9pm every Friday. Every other night of the week is open.' },
      ],
    },

    {
      slug: 'proposals',
      icon: 'heart',
      title: 'Romantic Proposals',
      navTitle: 'Proposals',
      short: 'The song playing when you ask. Timed to the second.',
      metaTitle: 'Proposal Musicians on Roatán',
      metaDesc:
        'Live music for a proposal on Roatán. We learn your song, stay hidden ' +
        'until your cue, and play the moment you kneel. Beaches, docks, boats.',
      blurb:
        'This is the smallest booking we take and the one we get most anxious ' +
        'about getting right. You tell us the song, the spot and the signal. We ' +
        'arrive early, stay out of sight, and start playing at the exact moment ' +
        'you turn around. It works on a beach at sunset, on a dock, on a boat, ' +
        'on a villa terrace. Afterwards we play for as long as you want, or we ' +
        'disappear and leave you to it — your call, decided in advance.',
      packagesTitle: 'How it works',
      packages: [
        { name: 'You pick the song',  text: 'Any song. We will learn it. If you have no idea, tell us about them and we will suggest three.' },
        { name: 'You pick the cue',   text: 'A hand signal, a text, a time on the clock, or a nod from your photographer. We rehearse it with you.' },
        { name: 'We stay invisible',  text: 'Until we are not. Nobody sees us until the first chord, and that is the entire trick.' },
      ],
      includes: [
        'Your song learned specifically for the moment',
        'A rehearsed cue so the timing is exact',
        'Discreet arrival and setup — completely hidden until the cue',
        'We coordinate directly with your photographer if you have one',
        'Continue playing afterwards, or vanish — agreed beforehand',
        'Beaches, docks, boats, terraces, anywhere on the island',
      ],
      faq: [
        { q: 'How far ahead do you need to know?',
          a: 'Two weeks is comfortable, one week is workable, and we have done it in three days. The earlier you tell us, the more we can rehearse the song and the cue.' },
        { q: 'What if they say no?',
          a: 'We stop playing immediately and we were never there. It has not happened yet.' },
        { q: 'Can you coordinate with our photographer?',
          a: 'Yes, and we recommend it. Photographers are usually the ones holding the timing anyway, so we take the cue from them.' },
        { q: 'Can you do this on a boat or at sunset on the beach?',
          a: 'Both, and both are worth it. Tell us the spot and we will scout the practicalities — power, footing, wind — before the day.' },
      ],
    },
  ],

  /* ── 6. UPCOMING GIGS ───────────────────────────────────────────────────── *
     Your best free traffic source. People google "live music Roatan tonight"
     constantly, and almost nobody on this island answers that question with a
     real web page. Keep it current — a stale calendar is worse than none.
     date: 'YYYY-MM-DD'. Past dates vanish from the site automatically.
     Each gig is emitted as Google Event structured data.                     */
  gigs: [
    // TODO: replace with real, confirmed dates.
    { date: '2026-09-05', start: '18:00', end: '21:00', venue: 'TODO — Venue', area: 'West Bay',  note: '' },
    { date: '2026-09-10', start: '17:30', end: '20:30', venue: 'TODO — Venue', area: 'West End',  note: '' },
    { date: '2026-09-13', start: '18:00', end: '21:00', venue: 'TODO — Venue', area: 'Sandy Bay', note: '' },
  ],

  /* ── 7. REPERTOIRE ──────────────────────────────────────────────────────── *
     A real song list is a booking tool. Planners search for specific songs and
     couples relax when they can see what they are getting.
     TODO: prune to what they actually play, and add their own originals.     */
  repertoire: [
    { group: 'Latin & Español', songs: [
      'Bésame Mucho — Consuelo Velázquez', 'Sabor a Mí — Los Panchos',
      'Guantanamera — Traditional', 'La Bamba — Ritchie Valens',
      'Oye Como Va — Santana', 'Corazón Espinado — Santana',
      'Vivir Mi Vida — Marc Anthony', 'Bailando — Enrique Iglesias',
    ]},
    { group: 'Bossa, Jazz & Standards', songs: [
      'The Girl from Ipanema — Jobim', 'Corcovado — Jobim',
      'Mas Que Nada — Jorge Ben', 'Fly Me to the Moon — Bart Howard',
      'Autumn Leaves — Kosma / Mercer', 'Summertime — Gershwin',
      'La Vie en Rose — Édith Piaf', 'Blue Bossa — Kenny Dorham',
    ]},
    { group: 'Caribbean & Garífuna', songs: [
      'Traditional Garífuna repertoire (Tony)', 'Three Little Birds — Bob Marley',
      'Is This Love — Bob Marley', 'Redemption Song — Bob Marley',
      'Waiting in Vain — Bob Marley', 'Kingston Town — UB40',
    ]},
    { group: 'First Dances & Slow Ones', songs: [
      'Can’t Help Falling in Love — Elvis Presley', 'At Last — Etta James',
      'Perfect — Ed Sheeran', 'Thinking Out Loud — Ed Sheeran',
      'Make You Feel My Love — Dylan / Adele', 'Stand By Me — Ben E. King',
      'Your Song — Elton John', 'Wonderful Tonight — Eric Clapton',
    ]},
    { group: 'Classics & Sing-Alongs', songs: [
      'Brown Eyed Girl — Van Morrison', 'Into the Mystic — Van Morrison',
      'Valerie — Amy Winehouse', 'Riptide — Vance Joy',
      'I’m Yours — Jason Mraz', 'Ho Hey — The Lumineers',
      'Free Fallin’ — Tom Petty', 'Sweet Caroline — Neil Diamond',
    ]},
    { group: 'Originals', songs: [
      'TODO — add Marcela’s original songs here. Originals are a differentiator: ' +
      'nobody else on this island can offer them.',
    ]},
  ],

  /* ── 8. TESTIMONIALS ────────────────────────────────────────────────────── *
     IMPORTANT — READ THIS.
     These are EMPTY on purpose. Do not launch with invented quotes: fake
     reviews are illegal in the US, UK, Canada and the EU (where your wedding
     clients live) and Google actively penalises them.

     Instead: message your last five clients — Kimpton, Luna Beach, Blue Bahía,
     Caribe Tesoro, and any wedding couple — and ask for two sentences. They
     will say yes. Then fill this in like so:

       { quote: 'They were the best decision we made.',
         author: 'Sarah & Mark',
         context: 'Wedding, West Bay, March 2026' },

     The section hides itself completely while this array is empty.           */
  testimonials: [],

  /* ── 9. SERVICE AREA (local SEO) ────────────────────────────────────────── */
  areas: [
    'West Bay', 'West End', 'Sandy Bay', 'Half Moon Bay', 'Coxen Hole',
    'French Harbour', 'Punta Gorda', 'Camp Bay', 'Utila', 'Guanaja',
  ],

  /* -- 11. GENERAL FAQ (feeds Google's FAQ rich results) ------------------- */
  faq: [
    { q: 'How do we book you?',
      a: 'Email marcebookings@gmail.com — or use the form on this site — with your date, location, event type and rough headcount. You get a straight price back, usually the same day.' },
    { q: 'Are you available on Fridays?',
      a: 'Daytime yes, evenings no. Tony plays guitar with The Josh Green Band at Sundowner’s on Half Moon Bay every Friday from 7 to 9pm. Every other night of the week is open.' },
    { q: 'Do you play in English and Spanish?',
      a: 'Both, fluently, and we move between them inside a single set — which matters when your guest list is split across countries.' },
    { q: 'Do you bring your own sound system?',
      a: 'Yes. PA, microphones, stands and cabling — and we can run on battery power for beach ceremonies with no outlet nearby.' },
    { q: 'Can you learn a specific song for our event?',
      a: 'Yes, and it is included. Send it when you book and it will be ready on the day. This matters most for first dances and proposals.' },
    { q: 'How much do you charge?',
      a: 'It depends on set length, location and whether we are providing sound for speeches. Send your date and details and you get a straight number back — no runaround.' },
    { q: 'What areas of Roatán do you cover?',
      a: 'All of it — West Bay, West End, Sandy Bay, French Harbour and the East End, plus Utila and Guanaja for weddings and private events.' },
  ],
};

module.exports = site;
