import { fixture, assert } from '@open-wc/testing'
import { html } from 'lit/static-html.js'
import '../vellum-legendary-action.js'

suite('<vellum-legendary-action>', () => {

  const simpleLegendaryAction =
    html`
      <vellum-legendary-action name="Claw Attack" actions="1" description="The sphinx makes one claw attack."></vellum-legendary-action>
    `

  const complexLegendaryAction =
    html`
      <vellum-legendary-action name="Claw Attack" actions="3" description="The sphinx makes one claw attack."></vellum-legendary-action>
    `

  test('displays legendary action name', async() => {
    const element = await fixture(simpleLegendaryAction)
    assert.include(element.shadowRoot.textContent.trim(), 'Claw Attack.')
  })

  test('displays action description for multiattack', async() => {
    const element = await fixture(simpleLegendaryAction)
    assert.include(element.shadowRoot.textContent.trim(), 'The sphinx makes one claw attack.')
  })

  test('does not display action cost for one action cost', async() => {
    const element = await fixture(simpleLegendaryAction)
    assert.notInclude(element.shadowRoot.textContent.trim(), '(Costs 1 Actions)')
  })

  test('does display action cost for three action cost', async() => {
    const element = await fixture(complexLegendaryAction)
    assert.include(element.shadowRoot.textContent.trim(), '(Costs 3 Actions).')
  })

})
