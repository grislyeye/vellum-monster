import { html, fixture, expect } from '@open-wc/testing'
import '../vellum-stat.js'

describe('<vellum-stat>', async() => {

  describe('should', () => {
    it('not display stat name for empty values', async() => {
      const stat = await fixture(html`<vellum-stat name="Empty Stat Name"></vellum-stat>`)
      expect(stat.shadowRoot.textContent.trim()).to.not.include('Empty Stat Name')
    })
  })

})
