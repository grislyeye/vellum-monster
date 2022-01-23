import { fixture, assert } from '@open-wc/testing'
import { html } from 'lit/static-html.js'
import '../vellum-stat-block-section.js'

suite('<vellum-stat-block-section>', () => {

  const statBlockSection =
    html`
      <vellum-stat-block-section name="Section Title">
        <div>Section Content</div>
      </vellum-stat>
    `

  test('displays section heading', async() => {
    const element = await fixture(statBlockSection)
    assert.include(element.shadowRoot.textContent.trim(), 'Section Title')
  })

  test('displays section content', async() => {
    const element = await fixture(statBlockSection)
    assert.include(element.textContent.trim(), 'Section Content')
  })

})
