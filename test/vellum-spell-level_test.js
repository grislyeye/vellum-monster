import { fixture, assert } from '@open-wc/testing'
import { html } from 'lit/static-html.js'
import '../vellum-spell-level.js'
import { trimAll } from './test-util.js'

suite('<vellum-spell-level>', () => {

  const cantrips =
    html`
      <vellum-spell-level level='Cantrips' spells='["mage hand", "minor illusion"]'></vellum-spell-level>
    `

  const level1Spells =
    html`
      <vellum-spell-level level='1st' slots='3' spells='["charm person", "sleep"]'></vellum-spell-level>
    `

  const level5Spells =
    html`
      <vellum-spell-level level='5th' slots='1' spells='legend lore'></vellum-spell-level>
    `

  const atWill =
    html`
      <vellum-spell-level level='at-will' spells='["mage hand", "minor illusion"]'></vellum-spell-level>
    `

  const oncePerDay =
    html`
      <vellum-spell-level level='1/day' spells='["mage hand", "minor illusion"]'></vellum-spell-level>
    `

  test('displays spell level', async() => {
    const element = await fixture(level5Spells)
    assert.include(trimAll(element.shadowRoot.textContent), '5th level (1 slot): legend lore')
  })

  test('displays spell level', async() => {
    const element = await fixture(level1Spells)
    assert.include(trimAll(element.shadowRoot.textContent), '1st level')
  })

  test('displays spell slots', async() => {
    const element = await fixture(level1Spells)
    assert.include(trimAll(element.shadowRoot.textContent), '(3 slots)')
  })

  test('displays spell slot', async() => {
    const element = await fixture(level5Spells)
    assert.include(trimAll(element.shadowRoot.textContent), '(1 slot)')
  })

  test('displays spells', async() => {
    const element = await fixture(level1Spells)
    assert.include(trimAll(element.shadowRoot.textContent), 'charm person, sleep')
  })

  test('displays single spell for level', async() => {
    const element = await fixture(level5Spells)
    assert.include(trimAll(element.shadowRoot.textContent), 'legend lore')
  })

  test('displays cantrips', async() => {
    const element = await fixture(cantrips)
    assert.include(trimAll(element.shadowRoot.textContent), 'Cantrips')
    assert.notInclude(trimAll(element.shadowRoot.textContent), 'Level')
  })

  test('displays "at will" as slows', async() => {
    const element = await fixture(cantrips)
    assert.include(trimAll(element.shadowRoot.textContent), 'at will')
  })

  test('displays at will spell level', async() => {
    const element = await fixture(atWill)
    assert.include(trimAll(element.shadowRoot.textContent), 'At will:')
  })

  test('displays once-per-day spell level', async() => {
    const element = await fixture(oncePerDay)
    assert.include(trimAll(element.shadowRoot.textContent), '1/day each:')
  })

})
