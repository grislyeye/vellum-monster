import { fixture, assert } from '@open-wc/testing'
import { html } from 'lit/static-html.js'
import '../vellum-npc.js'
import { trimAll } from './test-util.js'

suite('<vellum-npc>', () => {

  const npc =
    html`
      <vellum-npc
        class="official"
        name="Lyrum"
        gender="male"
        race="elf"
        statblock="archmage"
        alignment="lawful neutral"
        attitude="indifferent"
        description="Lyrum is a thin and pasty elf with a painful-looking humped back. His black hair hangs down in long, greasy rat tails. Black marks under his rheumy eyes indicate a severe lack of sleep. His clothes, once fine, appear to have never been cleaned and are covered in dubious stains.">
      </vellum-npc>
     `

  test('displays NPC name', async() => {
    const element = await fixture(npc)
    assert.include(trimAll(element.shadowRoot.textContent), 'Lyrum')
  })

  test('displays NPC gender', async() => {
    const element = await fixture(npc)
    assert.include(trimAll(element.shadowRoot.textContent), 'male')
  })

  test('displays NPC race', async() => {
    const element = await fixture(npc)
    assert.include(trimAll(element.shadowRoot.textContent), 'elf')
  })

  test('displays NPC stat-block', async() => {
    const element = await fixture(npc)
    assert.include(trimAll(element.shadowRoot.textContent), 'archmage')
  })

  test('displays NPC alignment', async() => {
    const element = await fixture(npc)
    assert.include(trimAll(element.shadowRoot.textContent), 'lawful neutral')
  })

  test('displays NPC attitude', async() => {
    const element = await fixture(npc)
    assert.include(trimAll(element.shadowRoot.textContent), 'indifferent')
  })

  test('displays NPC description', async() => {
    const element = await fixture(npc)
    assert.include(trimAll(element.shadowRoot.textContent), 'Lyrum is a thin and pasty elf')
  })

  const npcWithoutDescription =
    html`
      <vellum-npc
        class="official"
        name="Lyrum"
        gender="male"
        race="elf"
        statblock="archmage"
        alignment="lawful neutral"
        attitude="indifferent"
      >
      </vellum-npc>
    `

  test('does not display description divider for NPC without description', async() => {
    const element = await fixture(npcWithoutDescription)
    assert.isNull(element.shadowRoot.querySelector('#description-divider'))
  })

  const npcWithoutAttitude =
    html`
    <vellum-npc
        class="official"
        name="Lyrum"
        race="elf"
        statblock="archmage"
        alignment="lawful neutral"
        description="Lyrum is a thin and pasty elf with a painful-looking humped back. His black hair hangs down in long, greasy rat tails. Black marks under his rheumy eyes indicate a severe lack of sleep. His clothes, once fine, appear to have never been cleaned and are covered in dubious stains.">
      </vellum-npc>
    `

  test('does not display separating comma for NPC without attitude', async() => {
    const element = await fixture(npcWithoutAttitude)
    assert.include(trimAll(element.shadowRoot.textContent), '(lawful neutral)')
  })

})