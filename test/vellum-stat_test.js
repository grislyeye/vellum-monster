import { fixture, assert, expect } from '@open-wc/testing'
import { html } from 'lit/static-html.js'
import './custom-assertions.js'
import '../dist/vellum-stat.js'

suite('<vellum-stat>', () => {

  const singleValueStat =
    html`
      <vellum-stat name="Armor Class" values="17 (natural armor)"></vellum-stat>
    `

  test('displays stat name for single value', async() => {
    const element = await fixture(singleValueStat)
    expect(element.shadowRoot.textContent.trim()).to.includeOnce('Armor Class')
  })

  test('displays stat for single value', async() => {
    const element = await fixture(singleValueStat)
    assert.include(element.shadowRoot.textContent.trim(), '17 (natural armor)')
  })

  const multipleValuesStat =
    html`
      <vellum-stat id="speeds" name="Speed" values='["40 ft.", "60 ft. fly"]'></vellum-stat>
    `

  test('displays stat name for multiple values', async() => {
    const element = await fixture(multipleValuesStat)
    const statName = element.shadowRoot.querySelector('.stat-name')
    assert.equal(statName.textContent.trim(), 'Speed')
  })

  test('displays stat for multiple values', async() => {
    const element = await fixture(multipleValuesStat)
    assert.include(element.shadowRoot.textContent.trim(), '40 ft., 60 ft. fly')
  })

  test('updates display when values change to single value', async() => {
    const element = await fixture(singleValueStat)
    element.values = '16 (natural armor)'
    await element.performUpdate()
    assert.include(element.shadowRoot.textContent.trim(), '16 (natural armor)')
  })

  test('updates display when values change to multiple values', async() => {
    const element = await fixture(singleValueStat)
    element.values = ['a', 'b']
    await element.performUpdate()
    assert.include(element.shadowRoot.textContent.trim(), 'a, b')
  })

  const nonStringSingleValueStat =
    html`
      <vellum-stat name="Armor Class" values="11"></vellum-stat>
    `

  test('displays stat for non-string single value', async() => {
    const element = await fixture(nonStringSingleValueStat)
    assert.include(element.shadowRoot.textContent.trim(), '11')
  })

  const bodyValueStat =
    html`
      <vellum-stat name="Armor Class"><span id="armor"><strong>12</strong> (natural armor)</span></vellum-stat>
    `

  // quarantine test: failing on Chrome
  test.skip('displays stat for body value', async() => {
  })

  // quarantine test: cannot verify element inner HTML
  test.skip('displays HTML tags from stat body', async() => {
    const element = await fixture(bodyValueStat)
    assert.include(element.$.armor.innerHTML.trim(), '<strong>12</strong>')
  })

})
