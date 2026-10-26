export interface CaseStudy {
  slug: string
  number: string
  kicker: string
  title: string
  summary: string
  result: string
  tags: string
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'arcgis',
    number: '01',
    kicker: 'GIS + REAL-TIME APIS',
    title: 'Seven maps on ArcGIS 4.x',
    summary:
      'As the only developer, I moved seven public map tools to ArcGIS 4.x, despite breaking changes, after completing six Esri courses.',
    result: 'Result: faster map drawing, a clearer basemap and ArcGIS data loaded only when needed.',
    tags: 'ARCGIS JS 4.X · VUE · TYPESCRIPT · REST',
  },
  {
    slug: 'vue',
    number: '02',
    kicker: 'MODERNIZATION',
    title: 'jQuery to Vue, Bootstrap 4 to 5.3',
    summary:
      'Redeveloped each trip tool as a stand-alone Vue app initially, smallest to largest. Later, integrated into larger Vue app with shared components and a build that runs on both the legacy and new CMS.',
    result:
      'Result: a maintainable, reactive stack with shared components and bugs fixed along the way.',
    tags: 'VUE · TYPESCRIPT · VITE · PINIA',
  },
  {
    slug: 'umbraco',
    number: '03',
    kicker: 'MIGRATION',
    title: 'Mojo Portal to Umbraco',
    summary:
      'Technical lead on moving a public website from a legacy CMS to Umbraco. Styles, assets, and trip tools load via CDN for use in other supporting applications (ie. microsites, fare payments app).',
    result: "Result: Live since August 3, 2026, with multiple themes for the site's microsites.",
    tags: 'UMBRACO · VUE · ASP.NET MVC',
  },
]
