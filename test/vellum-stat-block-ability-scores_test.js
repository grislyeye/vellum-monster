import { fixture, assert } from '@open-wc/testing'
import { html } from 'lit/static-html.js'
import '../vellum-stat-block-ability-scores.js'
import { trimAll } from './test-util.js'

suite('<vellum-stat-block-ability-scores>', () => {

  const abilityScores =
    html`
      <vellum-stat-block-ability-scores str="18" dex="16" con="14" int="12" wis="10" cha="8"></vellum-stat-block-ability-scores>
    `

  test('displays strength with bonus', async() => {
    const element = await fixture(abilityScores)
    assert.include(trimAll(element.shadowRoot.textContent), '18 (+4)')
  })

  test('displays dexterity with bonus', async() => {
    const element = await fixture(abilityScores)
    assert.include(trimAll(element.shadowRoot.textContent), '16 (+3)')
  })

  test('displays constitution with bonus', async() => {
    const element = await fixture(abilityScores)
    assert.include(trimAll(element.shadowRoot.textContent), '14 (+2)')
  })

  test('displays intelligence with bonus', async() => {
    const element = await fixture(abilityScores)
    assert.include(trimAll(element.shadowRoot.textContent), '12 (+1)')
  })

  test('displays wisdom with bonus', async() => {
    const element = await fixture(abilityScores)
    assert.include(trimAll(element.shadowRoot.textContent), '10 (+0)')
  })

  test('displays charisma with bonus', async() => {
    const element = await fixture(abilityScores)
    assert.include(trimAll(element.shadowRoot.textContent), '8 (-1)')
  })

})
