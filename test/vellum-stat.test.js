import { html, fixture, expect } from '@open-wc/testing'
import './custom-assertions.js'
import '../vellum-stat.js'

describe('<vellum-stat>', async() => {

  const stat = await fixture(
    html`
      <vellum-stat name="Armor Class" values="17 (natural armor)"></vellum-stat>
    `
  )

  describe('should', async() => {

    it('displays stat name for single value', () => {
      expect(stat.shadowRoot.textContent.trim()).to.includeOnce('Armor Class')
    })

    it('display single value', () => {
      expect(stat.shadowRoot.textContent.trim()).to.includeOnce('17 (natural armor')
    })

    it('not display stat name for empty values', async() => {
      const emptyStat = await fixture(html`<vellum-stat name="Empty Stat Name"></vellum-stat>`)
      expect(emptyStat.shadowRoot.textContent.trim()).to.not.include('Empty Stat Name')
    })

    const multiValueStat = await fixture(
      html`
        <vellum-stat id="speeds" name="Speed" values='["40 ft.", "60 ft. fly"]'></vellum-stat>
      `
    )

    it('displays stat name for multi-value', () => {
      expect(multiValueStat.shadowRoot.textContent.trim()).to.includeOnce('Speed')
    })

    it('displays stat values for multi-value', () => {
      expect(multiValueStat.shadowRoot.textContent.trim(), '40 ft., 60 ft. fly')
    })

  })

})
