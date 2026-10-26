import { describe, it, expect } from 'vitest'
import { mount, RouterLinkStub } from '@vue/test-utils'
import HomeView from '../HomeView.vue'
import { caseStudies } from '@/data/caseStudies'

const mountHome = () => mount(HomeView, { global: { stubs: { RouterLink: RouterLinkStub } } })

describe('HomeView', () => {
  it('has a single h1 with the headline', () => {
    const wrapper = mountHome()
    const h1s = wrapper.findAll('h1')
    expect(h1s).toHaveLength(1)
    expect(h1s[0]?.text()).toContain('Built carefully, for real people')
  })

  it('shows the four values', () => {
    const titles = mountHome()
      .findAll('section[aria-labelledby="care-h"] h3')
      .map((h) => h.text())
    expect(titles).toEqual(['Passion', 'Quality', 'Collaboration', 'Care'])
  })

  it('links every case study card to its page', () => {
    const wrapper = mountHome()
    const links = wrapper.findAllComponents(RouterLinkStub).map((l) => l.props('to'))
    for (const study of caseStudies) {
      expect(links).toContain(`/work/${study.slug}`)
    }
  })

  it('gives the portrait descriptive alt text', () => {
    const img = mountHome().find('img')
    expect(img.attributes('alt')).toMatch(/Portrait of Rich Bothe/)
  })
})
