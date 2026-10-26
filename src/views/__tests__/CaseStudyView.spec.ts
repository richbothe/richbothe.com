import { describe, it, expect } from 'vitest'
import { mount, RouterLinkStub } from '@vue/test-utils'
import CaseStudyView from '../CaseStudyView.vue'
import { caseStudies } from '@/data/caseStudies'
import { caseStudyDetails } from '@/data/caseStudyDetails'

const mountStudy = (slug: string) =>
  mount(CaseStudyView, {
    props: { slug },
    global: { stubs: { RouterLink: RouterLinkStub } },
  })

describe('CaseStudyView', () => {
  it.each(caseStudies.map((c) => c.slug))('renders the full write-up for %s', (slug) => {
    const wrapper = mountStudy(slug)
    const detail = caseStudyDetails[slug]!
    expect(wrapper.findAll('h1')).toHaveLength(1)
    expect(wrapper.get('h1').text()).toBe(detail.heroTitle)
    expect(wrapper.findAll('section[aria-labelledby] h2')).toHaveLength(detail.sections.length)
  })

  it('links to the next case study', () => {
    const link = mountStudy('arcgis')
      .findAllComponents(RouterLinkStub)
      .find((l) => l.props('to') === '/work/vue')
    expect(link).toBeTruthy()
  })

  it('has a detail for every case study and no unfinished placeholders', () => {
    for (const c of caseStudies) {
      const detail = caseStudyDetails[c.slug]
      expect(detail, c.slug).toBeDefined()
      expect(caseStudies.some((n) => n.slug === detail!.next)).toBe(true)
    }
    expect(JSON.stringify(caseStudyDetails)).not.toMatch(/\[(add|Add)[^\]]*\]/)
  })
})
