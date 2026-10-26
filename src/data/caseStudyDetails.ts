/** Full write-ups for the case study pages. Summaries for the home page live in caseStudies.ts. */

export interface LeadItem {
  lead?: string
  text?: string
}

export type Block =
  | { type: 'p'; text: string; link?: { to: string; label: string }; after?: string }
  | { type: 'steps'; items: { title: string; text: string }[] }
  | { type: 'bullets'; items: LeadItem[] }
  | {
      type: 'pattern'
      kicker: string
      title: string
      steps: { label: string; title: string; text: string; tabs?: string[] }[]
      note?: string
    }
  | { type: 'detail'; kicker?: string; title: string; intro?: string; items: LeadItem[] }
  | { type: 'chips'; items: string[]; note?: string }
  | { type: 'courses'; note: string; items: { title: string; meta: string }[] }

export interface Aside {
  text: string
  note?: string
  link?: { to: string; label: string }
}

export interface Section {
  label: string
  title: string
  blocks: Block[]
  aside?: Aside
}

export interface CaseStudyDetail {
  heroTitle: string
  heroSub: string
  heroTags: string[]
  glance: { label: string; value: string }[]
  sections: Section[]
  next: string
}

export const caseStudyDetails: Record<string, CaseStudyDetail> = {
  arcgis: {
    heroTitle: "Seven maps, one developer: moving Metro Transit's trip tools to ArcGIS 4.x",
    heroSub:
      'I was the only developer on seven public map tools. I trained with Esri, started with the smallest tool, and carried what I learned into each one after it.',
    heroTags: ['ARCGIS JS 4.X', 'VUE.JS', 'TYPESCRIPT', 'REST ENDPOINTS', 'GEOLOCATION'],
    glance: [
      { label: 'ROLE', value: 'Sole developer on all seven map tools' },
      { label: 'SCOPE', value: 'Seven public tools with interactive maps' },
      { label: 'STACK', value: 'ArcGIS API for JavaScript 4.x, Vue.js, REST endpoints' },
      { label: 'TRAINING', value: 'Six Esri web courses, Feb – Mar 2025' },
    ],
    sections: [
      {
        label: '01 — THE PROBLEM',
        title: 'Seven maps, a major upgrade, and breaking changes.',
        blocks: [
          {
            type: 'p',
            text: "Seven of Metro Transit's public tools show an interactive map. They ran on version 3.x of the ArcGIS API for JavaScript. Version 4.x is a major upgrade with breaking changes, so moving over meant rethinking how every map was built, not swapping a library.",
          },
          {
            type: 'p',
            text: 'Riders use these maps to pan and zoom, follow trip plan routes, see routes and stops, track real-time vehicle locations, find park & ride lots and Go-To card retailers, and explore the full system map.',
          },
        ],
        aside: { text: 'Every one of those features had to survive the upgrade.' },
      },
      {
        label: '02 — MY ROLE',
        title: 'The only developer, start to finish.',
        blocks: [
          {
            type: 'p',
            text: 'I was the only developer on the maps. I learned ArcGIS, designed and built each of the seven tools, and carried them through the move to 4.x as part of the Vue rebuild described in',
            link: { to: '/work/vue', label: 'Case 02' },
            after: '.',
          },
          {
            type: 'p',
            text: 'I wrote each tool independently, as its own Vue project, before the tools were brought together.',
          },
        ],
        aside: { text: 'No team to hand the hard parts to, so I learned them.' },
      },
      {
        label: '03 — THE APPROACH',
        title: 'Start small, spot the pattern, then scale up.',
        blocks: [
          {
            type: 'steps',
            items: [
              {
                title: 'Learn the platform first',
                text: 'In February and March 2025 I completed six Esri web courses, from GIS basics and coordinate systems to building maps with the ArcGIS JavaScript SDK.',
              },
              {
                title: 'Begin with the smallest tool',
                text: 'Park & Rides was small, which let me apply what I was learning a little at a time instead of all at once.',
              },
              {
                title: 'Recognize what the tools have in common',
                text: 'Stops & Stations and Go-To Retailers work the same way as Park & Rides, so what I built for one carried straight over to the others. That included the autocomplete: the old tools used jQuery autocomplete, and I rewrote it from scratch, including the highlighting and formatting. The shared pattern is below.',
              },
              {
                title: 'Work up to the largest tools',
                text: 'With the shared pieces in place, I moved on to the bigger tools, finishing with Trip Planner.',
              },
              {
                title: 'Improve it while I was in there',
                text: 'I lazy-loaded ArcGIS data so it is requested only when needed, switched to an easier-to-read basemap, and fixed a GPS bug that asked riders for location permission twice.',
              },
            ],
          },
          {
            type: 'pattern',
            kicker: 'THE SHARED PATTERN',
            title: 'Park & Rides, Stops & Stations and Go-To Retailers: one design, three tools.',
            steps: [
              {
                label: 'STEP 1',
                title: 'Create autocomplete search component',
                text: 'A reusable component that replaces the jQuery autocomplete, with its own match highlighting and formatting and a search by current location. The same component in all three. Details below.',
              },
              {
                label: 'STEP 2',
                title: 'Fetch from an endpoint',
                text: 'Each tool requests its data from its own endpoint.',
              },
              {
                label: 'STEP 3',
                title: 'Show a tabbed result',
                text: 'The list view opens first, with the map one tab away.',
                tabs: ['List', 'Map'],
              },
            ],
          },
          {
            type: 'detail',
            title: 'Inside the autocomplete',
            intro:
              "One reusable Vue component with a small props, slot and events interface. Four of the seven map tools share it. Trip Planner's search was built separately inside its module, and moving it onto the shared component is the next step.",
            items: [
              {
                lead: 'Debounced suggestions.',
                text: "It waits 300 ms after typing stops and starts at three characters, so riders don't trigger a request on every keystroke.",
              },
              {
                lead: 'Cleaned-up queries.',
                text: 'Ampersands become “and” and stray punctuation is removed before the search runs.',
              },
              {
                lead: 'Favors nearby results.',
                text: "Each search sends the rider's location when it's known, so the geocoder can rank closer places higher. It falls back to the center of the Twin Cities when the location isn't known.",
              },
              {
                lead: 'Highlighted matches, safely.',
                text: 'Each suggestion is split into matching and non-matching parts and rendered as text, never as raw HTML.',
              },
              {
                lead: 'Keyboard and screen-reader support.',
                text: 'Arrow keys move through suggestions, Enter selects and Escape closes. The input follows the ARIA combobox pattern, with a listbox of options and a tracked active option.',
              },
              {
                lead: '“Use current location.”',
                text: "The browser's permission prompt appears only when the rider clicks the button, never on page load, and the button is disabled when location is blocked or unsupported.",
              },
              {
                lead: 'Warmed up in advance.',
                text: "On load it warms the search service, so the first real search doesn't pay the cold-start cost.",
              },
            ],
          },
          {
            type: 'detail',
            kicker: 'THE LARGEST TOOL: TRIP PLANNER',
            title: 'Inside Trip Planner',
            intro:
              'The tool I saved for last. A rider enters a start and a destination and gets trip options by bus, light rail and commuter rail. Unlike the first three tools, it has its own results flow instead of the shared list-and-map tabs, and its search was built separately, with the plan to move it onto the shared autocomplete.',
            items: [
              {
                lead: "Planned around the rider's priorities.",
                text: "Leave now, depart at or arrive by. Riders choose a faster trip, fewer transfers or less walking, set how far they're willing to walk (¼, ½ or 1 mile), limit the service type, and ask for accessible stops only.",
              },
              {
                lead: 'Options to compare, then the detail.',
                text: 'Each option shows total time, departure and arrival times, and color-coded route badges with the walking between them. Opening one gives a leg-by-leg itinerary with stops, times and fares.',
              },
              {
                lead: 'A map drawn from the trip itself.',
                text: 'Walking is a dotted light-blue line, each transit leg is a solid line in its route color with a route label on it, and stops are marked green at the start, red at the end and white in between. The map zooms to fit the whole trip.',
              },
              {
                lead: 'Loaded only when needed.',
                text: "The ArcGIS code and the route geometry load when a rider opens a trip, not when the page loads. Service alerts load once on the first open.",
              },
              {
                lead: 'Alerts where they matter.',
                text: 'Alerts are matched to the routes on each leg and appear under that leg as an expandable “view alerts” section, newest first.',
              },
              {
                lead: 'One color per route.',
                text: 'The result badges, the itinerary and the map lines all draw from the same route-color map, so a route looks the same everywhere.',
              },
              {
                lead: 'Picks up where the rider left off.',
                text: 'The last search is saved for the browser session. “Edit trip” brings the inputs back and “Start over” clears them. A swap button flips the start and destination, and focus moves to the first result when results appear.',
              },
              {
                lead: 'Built for the edge cases.',
                text: "Trips that cross midnight get the right duration. When no trip is found, the rider sees a clear message with a way to adjust the search. If the map can't load, the written itinerary still works.",
              },
            ],
          },
          {
            type: 'detail',
            kicker: 'REAL-TIME DEPARTURES: NEXTRIP',
            title: 'Inside NexTrip',
            intro:
              'NexTrip answers two questions: when is my bus or train coming, and where is it now? It has its own tabs and its own stop search, built around stop numbers and names, and its map shows live vehicles.',
            items: [
              {
                lead: 'Three ways in.',
                text: 'Riders can pick a route, a direction and a stop, type a stop number or name, or look at the stops near them. Whichever they choose, they land on the same departures view.',
              },
              {
                lead: 'A forgiving stop search.',
                text: "One box takes a stop number or a name. Suggestions start after two characters, match “&” and “and” interchangeably, and highlight the matching text. The first suggestion is preselected, so Enter picks it. Errors appear only after the rider submits, never while they're typing.",
              },
              {
                lead: 'Stops near the rider.',
                text: 'The Location tab asks for the current position each time it opens, so a rider who has walked a few blocks gets fresh results. Stops with no current service are dropped, and if location is blocked the rider sees a plain explanation.',
              },
              {
                lead: 'Departures that stay fresh.',
                text: 'A table of color-coded route badges shows the first four departures, with a toggle for more, plus any service alerts. Departures refresh on their own while the view is open.',
              },
              {
                lead: 'Vehicles moving on the map.',
                text: 'The map centers on the stop, draws the routes that serve it and shows vehicles updating every 7 seconds. Icons differ for buses, bus rapid transit and light rail, and each carries its route label.',
              },
              {
                lead: 'Smooth by design.',
                text: "The vehicle markers are drawn as an overlay and reused from one update to the next, so panning, zooming and refreshing don't make them flicker. Vehicles with no GPS fix or outside the view aren't drawn, and one that drops out of the feed disappears after 20 seconds.",
              },
              {
                lead: "Clear about what it can't show.",
                text: "Routes run by another agency don't report vehicle positions. For those, the map shows just the route lines, and when every route at a stop is like that, the rider is told real-time data isn't available.",
              },
              {
                lead: 'Shareable and tidy.',
                text: "Stops and route selections have their own links, and the browser's back and forward buttons work. Live updates pause after about 30 minutes of inactivity, with Resume and Start over. Closing the view stops the refreshing and tears down the map.",
              },
            ],
          },
          {
            type: 'detail',
            kicker: 'SCHEDULES & MAPS AND ROUTE SCHEDULES',
            title: 'Inside Schedules & Maps and Route Schedules',
            intro:
              "Two tools that make one rider journey. Schedules & Maps is the starting point for riders who know what they're looking for: a route, a stop or the whole system. Picking a route opens Route Schedules, with that route's timetables, map and alerts. Both follow the same tabbed idea as the first three tools, with a browse view first and the map one tab away.",
            items: [
              {
                lead: 'Shortcuts to what riders look for most.',
                text: 'The Schedules tab opens with a route search and grouped buttons for light rail, popular bus routes, bus rapid transit, Metro micro areas and partner on-demand services. Only the light rail buttons depend on live route data, and each appears only if that route exists, so if the route list fails to load the rest of the page still renders.',
              },
              {
                lead: 'The shared search, reused.',
                text: 'On the Maps tab, searching for a stop or station uses the same autocomplete as the other tools, including “Use current location.” Picking a result centers a marker on it and zooms in.',
              },
              {
                lead: 'Show the entire system.',
                text: "A labeled switch zooms out and adds every route line and route label. Switching it off restores the stops and Park & Rides and returns the rider to the view they left. The code releases the old layers' zoom watchers first, so stale layers can't reappear during the zoom.",
              },
              {
                lead: 'Timetables that match how people ride.',
                text: "Choosing a route opens its own page. Riders pick a direction and see weekday, Saturday and Sunday schedules, or choose where they'll board and exit to see just those two stops. Rush-hour times are shaded, footnotes explain special service, and when a schedule change is coming, riders can compare the upcoming one with the current one.",
              },
              {
                lead: 'A map of one route.',
                text: "The route page's map draws only the selected route and its stops, then zooms to fit the whole line. Stops appear once the rider zooms in far enough to tell them apart, and tapping one opens a popup for it.",
              },
              {
                lead: 'Live vehicles, on request.',
                text: 'A “Show real-time bus locations” switch starts the live view, and turning it off stops the updates and clears the markers. The switch stays disabled until the map has finished loading.',
              },
              {
                lead: 'Alerts for this route.',
                text: "A second tab lists the route's alerts as expandable items, with the type of change, whether it's new, ongoing or upcoming, when it was last updated and any detour images. A “Sign up for alerts” banner sits underneath.",
              },
              {
                lead: 'Paper and PDF friendly.',
                text: 'Thumbnails of the full system map and the METRO network map open the PDFs in a new tab. Route pages link to a detailed PDF route map where one exists and hide the link where it doesn’t. Print styles hide the tabs so timetables print cleanly.',
              },
              {
                lead: 'Loaded only when needed.',
                text: "The landing page's map isn't created until the rider opens the Maps tab, and it starts at their location when known, or downtown Minneapolis when not. Bus stops and Park & Rides are added only once the rider has zoomed in far enough to see them, with their popups set up first so even the first click works.",
              },
              {
                lead: 'Careful about timing, tidy on exit.',
                text: "A route page builds its map once, even if two parts of the page ask for it at the same moment, and waits until the map's container has a real size, which matters inside a tab. The loading spinner gives up after 8 seconds, and the page tells “no data right now” apart from “not a valid route.” When the rider leaves, live updates stop and the map is destroyed.",
              },
            ],
          },
          {
            type: 'chips',
            items: [
              'Park & Rides',
              'Stops & Stations',
              'Go-To Retailers',
              'NexTrip',
              'Schedules & Maps',
              'Route Schedules',
              'Trip Planner',
            ],
            note: 'The seven map tools, built on the shared list-and-map pattern above.',
          },
        ],
        aside: { text: 'Smallest first, on purpose: learn a bit, apply it right away.' },
      },
      {
        label: '04 — TRAINING',
        title: 'Six Esri courses, about 13 hours.',
        blocks: [
          {
            type: 'courses',
            note: 'Completed February 26 to March 13, 2025, with certificates from each.',
            items: [
              { title: 'GIS Basics', meta: 'FEB 26, 2025 · 2 H 35 M' },
              {
                title: 'Getting Started with ArcGIS Maps SDK for JavaScript',
                meta: 'FEB 27, 2025 · 3 H 40 M',
              },
              { title: 'Basics of JavaScript Web Apps', meta: 'FEB 28, 2025 · 1 H 15 M' },
              {
                title: 'Working with Maps in ArcGIS Maps SDK for JavaScript',
                meta: 'FEB 28, 2025 · 2 H 25 M',
              },
              { title: 'Introduction to Coordinate Systems', meta: 'MAR 13, 2025 · 2 H 25 M' },
              { title: 'Displaying Coordinate Data on a Map', meta: 'MAR 13, 2025 · 35 M' },
            ],
          },
        ],
        aside: { text: "I'd rather learn it properly than guess at it." },
      },
      {
        label: '05 — THE RESULT',
        title: 'Faster, clearer, and less annoying.',
        blocks: [
          {
            type: 'bullets',
            items: [
              { text: 'All seven map tools now run on ArcGIS 4.x.' },
              { text: 'Faster map drawing.' },
              { text: "A basemap that's easier to read." },
              { text: 'One location-permission prompt instead of two.' },
              {
                lead: 'Far less data to load a page.',
                text: 'The ArcGIS core (about 12 MB) used to download when the page loaded. Now it loads once, and only when the first map is drawn, so the first map pays that one-time cost. Each map after that loads only the data it needs, about 2 MB. It supports an equity goal: less bandwidth to load a page, by loading only what’s necessary and what the rider asks for.',
              },
            ],
          },
        ],
        aside: { text: 'Small fix I’m fond of: the location prompt now asks once, not twice.' },
      },
      {
        label: "06 — WHAT I'D DO NEXT",
        title: 'Next on the map.',
        blocks: [
          {
            type: 'bullets',
            items: [
              {
                lead: 'Move Trip Planner onto the shared autocomplete.',
                text: 'Its search was built separately, so switching it over means one search component to maintain across all the tools that need one.',
              },
              {
                lead: 'Bring the other tools onto Pinia.',
                text: 'Only one tool uses it for state today. Converting the rest would give all seven the same way of handling state.',
              },
              {
                lead: 'Keep improving accessibility.',
                text: 'The tools already support keyboard use and screen readers. The next step is to test all seven with automated checks and assistive technology, and fix whatever turns up.',
              },
            ],
          },
        ],
      },
    ],
    next: 'vue',
  },

  vue: {
    heroTitle: "From jQuery to Vue: rebuilding Metro Transit's trip tools",
    heroSub:
      'Moving a family of public trip tools off a legacy stack, one tool at a time, while keeping the live site running.',
    heroTags: ['VUE.JS', 'TYPESCRIPT', 'VITE', 'PINIA', 'BOOTSTRAP 5.3', 'JEST'],
    glance: [
      { label: 'ROLE', value: 'Technical lead and lead developer' },
      { label: 'TOOLS', value: 'Seven map tools, from Park & Rides to Trip Planner' },
      { label: 'STACK', value: 'Vue.js, TypeScript, Vite, Pinia, Bootstrap 5.3, Jest' },
    ],
    sections: [
      {
        label: '01 — THE PROBLEM',
        title: 'An aging CMS, and a stack to match.',
        blocks: [
          {
            type: 'p',
            text: 'The public website ran on an older CMS whose source code was no longer being maintained. The trip tools on it were built with jQuery and Bootstrap 4.',
          },
          {
            type: 'p',
            text: 'I saw the migration as the moment to modernize the front end for longevity, and to take advantage of reactivity instead of hand-managing the page.',
          },
        ],
        aside: { text: 'The goal was longevity, not just a fresh coat of paint.' },
      },
      {
        label: '02 — MY ROLE',
        title: 'Leading the project and keeping production running.',
        blocks: [
          {
            type: 'p',
            text: 'I was the technical lead and lead developer on the project, while still supporting the existing production site on the legacy CMS almost daily.',
          },
        ],
        aside: { text: 'The hardest part: doing both at once.' },
      },
      {
        label: '03 — THE APPROACH',
        title: 'One tool at a time, shared parts as I went.',
        blocks: [
          {
            type: 'steps',
            items: [
              {
                title: 'Learn the mapping layer first',
                text: 'I started by learning ArcGIS, since every one of these tools depends on its maps.',
              },
              {
                title: 'Rebuild each tool as its own Vue app',
                text: 'I rewrote the tools separately, starting with the smallest, Park & Rides, and finishing with the largest, Trip Planner.',
              },
              {
                title: 'Build shared components along the way',
                text: "Components built for one tool carried over to the next, so the shared parts grew as the project did. One example: an autocomplete I wrote from scratch to replace jQuery's, including its highlighting and formatting.",
              },
              {
                title: 'One build, two homes',
                text: 'During the transition, every tool had to work on both the legacy CMS and the new one. That took some unconventional Vite configuration.',
              },
              {
                title: 'Keep state predictable',
                text: 'State is handled in two parts: TypeScript interfaces that describe it, and a state factory function that returns the initial store values. One tool uses Pinia so far.',
              },
              {
                title: 'Bring it all together',
                text: 'The finished tools were then integrated into a larger Vue app.',
              },
            ],
          },
        ],
        aside: { text: 'Park & Rides first, Trip Planner last.' },
      },
      {
        label: '04 — THE RESULT',
        title: 'A stack built to last.',
        blocks: [
          {
            type: 'bullets',
            items: [
              {
                text: 'A modern, reactive Vue front end in place of legacy jQuery, built on Bootstrap 5.3.',
              },
              { text: 'Shared components reused across the trip tools.' },
              {
                text: 'Tools that ran on both the legacy and the new CMS throughout the transition.',
              },
              { text: 'Lingering bugs fixed along the way.' },
            ],
          },
        ],
        aside: {
          text: 'The ArcGIS 4.x upgrade rode along.',
          link: { to: '/work/arcgis', label: 'See Case 01 →' },
        },
      },
      {
        label: "05 — WHAT I'D DO NEXT",
        title: 'Finish the job.',
        blocks: [
          {
            type: 'p',
            text: 'Only one tool uses Pinia so far. Next, I’d move the others over so all of the state is managed the same way.',
          },
        ],
      },
    ],
    next: 'umbraco',
  },

  umbraco: {
    heroTitle: 'Mojo Portal to Umbraco: moving a public website to a supported CMS',
    heroSub:
      'Choosing the front-end stack, running two CMSs side by side for years, and keeping production steady until the move.',
    heroTags: ['UMBRACO CMS', 'ASP.NET MVC', 'VUE.JS', 'VITE', 'PINIA', 'JEST', 'PLAYWRIGHT'],
    glance: [
      { label: 'ROLE', value: 'Technical lead' },
      { label: 'TIMELINE', value: 'Started in 2018; went live August 3, 2026' },
      { label: 'GOAL', value: 'One CMS that can run multiple websites' },
      { label: 'STACK', value: 'Umbraco CMS, Vue.js, Vite, Pinia, Jest, Playwright' },
    ],
    sections: [
      {
        label: '01 — THE PROBLEM',
        title: 'A CMS that had lost support.',
        blocks: [
          {
            type: 'p',
            text: 'The public website ran on Mojo Portal, a CMS built on an older ASP.NET web platform that was no longer supported. We needed to move to a CMS built on ASP.NET MVC.',
          },
          {
            type: 'p',
            text: 'We also wanted a single CMS that could run multiple websites, instead of one platform per site.',
          },
        ],
        aside: { text: 'A supported platform, and one home for several sites.' },
      },
      {
        label: '02 — MY ROLE',
        title: 'Choosing the front end, together.',
        blocks: [
          {
            type: 'p',
            text: 'The project began in 2018. As technical lead, I worked with the IS lead to make sure the front-end stack we picked would work well with the CMS.',
          },
          {
            type: 'p',
            text: 'I had planned on React with webpack. Then we went to an Umbraco conference and were introduced to Vue.js. Reactivity mattered to us, and Vue offered it, with ideas drawn from both Angular and React. We chose Vue.',
          },
        ],
        aside: { text: 'I came in planning on React. Vue changed my mind.' },
      },
      {
        label: '03 — THE APPROACH',
        title: 'Vue first, years before launch.',
        blocks: [
          {
            type: 'steps',
            items: [
              {
                title: 'Pick the stack with the CMS in mind',
                text: 'The front-end choice had to fit Umbraco, so the IS lead and I settled it before building anything. Our first plan, React with webpack, gave way to Vue.js.',
              },
              {
                title: 'Write all new work in Vue',
                text: 'It would be several years before we went live on Umbraco. In the meantime, we decided all new development on Mojo Portal would use Vue.js, so it could move to Umbraco later with less rework.',
              },
              {
                title: 'Plug Vue into the old CMS',
                text: "I loaded ArcGIS core in Mojo Portal's shared template, so a Vue app could be connected to any CMS page. The trip tools with maps were built as independent Vue projects, partly because ArcGIS 3.x was deprecated and heading for end of support.",
              },
              {
                title: 'Run both sites side by side',
                text: 'New sub-domains were set up for the Umbraco implementation, while the production site stayed on Mojo Portal.',
              },
              {
                title: 'One front end, two builds',
                text: 'The front end had two build scripts, one for Mojo Portal and one for Umbraco.',
              },
              {
                title: 'Mimic the site in development',
                text: "I used Vue Router in development only, to mimic the site's navigation and keep page names and URLs the same.",
              },
            ],
          },
        ],
        aside: { text: 'Two CMSs, one front end.' },
      },
      {
        label: '04 — THE RESULT',
        title: 'A cleaner, better-tested front end.',
        blocks: [
          {
            type: 'bullets',
            items: [
              {
                text: "Live on Umbraco since August 3, 2026, with multiple themes supporting the site's microsites.",
              },
              {
                text: 'ArcGIS now loads once, and only when the first map is drawn, instead of its 12 MB core loading with the page. Each map after that loads only what it needs, about 2 MB, which supports an equity goal of using less bandwidth.',
              },
              { text: 'A much cleaner DOM structure.' },
              { text: 'A formal GitHub deployment pipeline.' },
              {
                text: "A more organized project that shares code wherever it can. A few earlier tools aren't yet fully integrated into the larger trip tools project.",
              },
              {
                text: 'Pinia for state, Jest for code and accessibility testing, and Playwright for end-to-end testing.',
              },
              {
                text: 'A geolocation bug fixed. Location sometimes came from GIS and sometimes from the browser, which asked riders for permission twice. It now comes from one shared source.',
              },
              { text: 'A CDN serving the CSS and JavaScript for the website theme and the trip tools.' },
            ],
          },
        ],
        aside: {
          text: 'The ArcGIS 4.x upgrade rode along.',
          link: { to: '/work/arcgis', label: 'See Case 01 →' },
        },
      },
      {
        label: '05 — THE HARDEST PART',
        title: 'Remembering how it all fit together.',
        blocks: [
          {
            type: 'p',
            text: "With years between the first decision and launch, the hardest part was remembering how everything worked across the two systems, from the code build to the dependencies the trip tools' maps needed.",
          },
        ],
        aside: {
          text: 'Years apart, two systems, one front end.',
          note: "What helped: sticky notes, and notes kept directly in my Adobe Workfront tasks, since that's where I worked from.",
        },
      },
      {
        label: "06 — WHAT I'D DO NEXT",
        title: 'Finish the integration, then go further.',
        blocks: [
          {
            type: 'bullets',
            items: [
              {
                lead: 'Fully integrate the remaining tools.',
                text: "A few tools written earlier aren't part of the larger trip tools project yet. Folding them in means more of the code is shared.",
              },
              { lead: 'Enhance the site as a progressive web app.' },
            ],
          },
        ],
      },
    ],
    next: 'arcgis',
  },
}
