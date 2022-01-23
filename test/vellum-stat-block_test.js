import { fixture, assert } from '@open-wc/testing'
import { html } from 'lit/static-html.js'
import '../vellum-stat-block.js'
import { trimAll } from './test-util.js'

suite('<vellum-stat-block>', () => {

  const statBlock =
    html`
      <vellum-stat-block name="Test Name" description="Test description">
        <p>Test content.</p>
      </vellum-stat-block>
    `

  test('displays name', async() => {
    const element = await fixture(statBlock)
    assert.include(trimAll(element.shadowRoot.textContent), 'Test Name')
  })

  test('displays description', async() => {
    const element = await fixture(statBlock)
    assert.include(trimAll(element.shadowRoot.textContent), 'Test description')
  })

  test('displays content', async() => {
    const element = await fixture(statBlock)
    assert.include(trimAll(element.textContent), 'Test content.')
  })
})
