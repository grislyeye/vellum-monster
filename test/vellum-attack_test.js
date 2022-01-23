import { fixture, assert } from '@open-wc/testing'
import { html } from 'lit/static-html.js'
import './custom-assertions.js'
import '../vellum-attack.js'
import { trimAll } from './test-util.js'

suite('<vellum-attack>', () => {

  const clawAttack =
    html`
      <vellum-attack name="Claw" type="melee-attack" bonus="+9" reach="5ft." target="one target" damage="2d8 + 4" damage-type="slashing" notes=". This is a magic weapon attack."></vellum-attack>
    `

  const spearAttack =
    html`
      <vellum-attack name="Spear" type="melee-or-ranged-attack" bonus="+3" reach="5 ft." range="20/60 ft." target="one target" damage="2d8 + 4" damage-type="piercing"></vellum-attack>
    `

  const crossbowAttack =
    html`
      <vellum-attack name="Crossbow" type="ranged-attack" bonus="+3" range="20/60 ft." target="one target" damage="2d8 + 4" damage-type="piercing"></vellum-attack>
    `

  const magicalAttack =
    html`
      <vellum-attack name="Crossbow" type="ranged-attack" bonus="+3" range="20/60 ft." target="one target" damage="2d8 + 4" damage-type="fire" effects='[{"roll": "2", "name": "Blinded", "effect": "The target becomes blinded."}, {"roll": "1", "name": "Confusion", "effect": "The target becomes confused."}]'></vellum-attack>
    `

  const limitedUsageAttack =
    html`
      <vellum-attack name="Poison Breath" limited-usage="Recharge 6"></vellum-attack>
    `

  test('displays attack name', async() => {
    const element = await fixture(clawAttack)
    assert.include(trimAll(element.shadowRoot.textContent), 'Claw')
  })

  test('displays attack type', async() => {
    const element = await fixture(clawAttack)
    assert.include(trimAll(element.shadowRoot.textContent), 'Melee Weapon Attack')
  })

  test('displays attack bonus', async() => {
    const element = await fixture(clawAttack)
    assert.include(trimAll(element.shadowRoot.textContent), '+9 to hit')
  })

  test('displays attack reach', async() => {
    const element = await fixture(clawAttack)
    assert.include(trimAll(element.shadowRoot.textContent), 'reach 5ft.')
  })

  test('displays attack target', async() => {
    const element = await fixture(clawAttack)
    assert.include(trimAll(element.shadowRoot.textContent), 'one target')
  })

  test('displays attack damage', async() => {
    const element = await fixture(clawAttack)
    assert.include(trimAll(element.shadowRoot.textContent), '13 (2d8 + 4)')
  })

  test('displays attack damage type', async() => {
    const element = await fixture(clawAttack)
    assert.include(trimAll(element.shadowRoot.textContent), 'slashing damage.')
  })

  test('displays attack notes', async() => {
    const element = await fixture(clawAttack)
    assert.include(trimAll(element.shadowRoot.textContent), 'damage. This is a magic weapon attack.')
  })

  test('does not display melee attack range', async() => {
    const element = await fixture(clawAttack)
    assert.notInclude(trimAll(element.shadowRoot.textContent), 'range')
  })

  test('displays melee or ranged attack type', async() => {
    const element = await fixture(spearAttack)
    assert.include(trimAll(element.shadowRoot.textContent), 'Melee or Ranged Weapon Attack')
  })

  test('displays melee or ranged attack range and reach', async() => {
    const element = await fixture(spearAttack)
    assert.include(trimAll(element.shadowRoot.textContent), 'reach 5 ft. or range 20/60 ft.')
  })

  test('displays ranged attack type', async() => {
    const element = await fixture(crossbowAttack)
    assert.include(trimAll(element.shadowRoot.textContent), 'Ranged Weapon Attack')
  })

  test('displays ranged attack range', async() => {
    const element = await fixture(crossbowAttack)
    assert.include(trimAll(element.shadowRoot.textContent), 'range 20/60 ft.')
  })

  test('does not display ranged attack reach', async() => {
    const element = await fixture(crossbowAttack)
    assert.notInclude(trimAll(element.shadowRoot.textContent), 'reach')
  })

  test('displays random effects', async() => {
    const element = await fixture(magicalAttack)
    assert.include(trimAll(element.shadowRoot.textContent), '1. Confusion. The target becomes confused.')
  })

  test('displays random effects in order of roll', async() => {
    const element = await fixture(magicalAttack)
    assert.include(trimAll(element.shadowRoot.textContent), '1. Confusion. The target becomes confused. 2. Blinded. The target becomes blinded.')
  })

  test('displays limited usage', async() => {
    const element = await fixture(limitedUsageAttack)
    assert.include(trimAll(element.shadowRoot.textContent), 'Poison Breath (Recharge 6)')
  })

})
