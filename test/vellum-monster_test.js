import { fixture, assert, expect } from '@open-wc/testing'
import '../dist/vellum-monster.js'
import { trimAll } from './test-util.js'
import './custom-assertions.js'
import * as fixtures from './monster-fixtures.js'

suite('<vellum-monster>', () => {

  test('displays name', async() => {
    const element = await fixture(fixtures.detailedStatblock)
    expect(trimAll(element.shadowRoot.textContent)).to.includeOnce('Gynosphinx')
  })

  test('displays type', async() => {
    const element = await fixture(fixtures.detailedStatblock)
    expect(trimAll(element.shadowRoot.textContent)).to.includeOnce('monstrosity')
  })

  test('displays size', async() => {
    const element = await fixture(fixtures.detailedStatblock)
    expect(trimAll(element.shadowRoot.textContent)).to.includeOnce('large')
  })

  test('displays alignment', async() => {
    const element = await fixture(fixtures.detailedStatblock)
    expect(trimAll(element.shadowRoot.textContent)).to.includeOnce('lawful neutral')
  })

  test('does not display trailing comma after type if alignment not provided', async() => {
    const element = await fixture(fixtures.objectStatblock)
    assert.notInclude(trimAll(element.shadowRoot.textContent), 'object,')
  })

  test('displays stat name', async() => {
    const element = await fixture(fixtures.detailedStatblock)
    const ac = element.shadowRoot.getElementById('ac')

    expect(trimAll(ac.shadowRoot.textContent)).to.includeOnce('Armor Class')
  })

  test('displays armour class', async() => {
    const element = await fixture(fixtures.detailedStatblock)
    const ac = element.shadowRoot.getElementById('ac')

    expect(trimAll(ac.shadowRoot.textContent)).to.includeOnce('17 (natural armor)')
  })

  test('displays simple armour class', async() => {
    const element = await fixture(fixtures.simpleStatblock)
    const ac = element.shadowRoot.getElementById('ac')

    expect(trimAll(ac.shadowRoot.textContent)).to.includeOnce('11')
  })

  test('do not display parenthesis for simple armour class', async() => {
    const element = await fixture(fixtures.simpleStatblock)
    const ac = element.shadowRoot.getElementById('ac')

    expect(trimAll(ac.shadowRoot.textContent)).to.not.include('11 ()')

  })

  test('displays average hit points', async() => {
    const element = await fixture(fixtures.detailedStatblock)
    const hitPoints = element.shadowRoot.getElementById('hp')

    expect(trimAll(hitPoints.shadowRoot.textContent)).to.includeOnce(136)
  })

  test('displays hit points for objects', async() => {
    const element = await fixture(fixtures.objectStatblock)
    const hitPoints = element.shadowRoot.getElementById('hp')

    expect(trimAll(hitPoints.shadowRoot.textContent)).to.includeOnce('40')
  })

  test('displays override hit points when hit die defined', async() => {
    const element = await fixture(fixtures.simpleStatblock)
    const hitPoints = element.shadowRoot.getElementById('hp')

    expect(trimAll(hitPoints.shadowRoot.textContent)).to.includeOnce('11')
  })

  test('displays hit die', async() => {
    const element = await fixture(fixtures.detailedStatblock)
    const hitPoints = element.shadowRoot.getElementById('hp')

    expect(trimAll(hitPoints.shadowRoot.textContent)).to.includeOnce('16d10 + 48')
  })

  test('does not display hit die brackets if hie die not provided', async() => {
    const element = await fixture(fixtures.objectStatblock)
    const hitPoints = element.shadowRoot.getElementById('hp')

    assert.notInclude(trimAll(hitPoints.shadowRoot.textContent), '()')
  })

  test('does not display hit die for empty stat blocks', async() => {
    const element = await fixture(fixtures.emptyStatblock)
    expect(element.shadowRoot.getElementById('hp')).to.equal(null)
  })

  test('displays speeds', async() => {
    const element = await fixture(fixtures.detailedStatblock)
    const speed = element.shadowRoot.getElementById('speed')

    expect(trimAll(speed.shadowRoot.textContent)).to.includeOnce('40 ft., fly 60 ft.')
  })

  test('displays single speed', async() => {
    const element = await fixture(fixtures.simpleStatblock)
    const speed = element.shadowRoot.getElementById('speed')

    expect(trimAll(speed.shadowRoot.textContent)).to.includeOnce('60 ft.')
  })

  test('displays strength with bonus', async() => {
    const element = await fixture(fixtures.detailedStatblock)
    const abilityScores = element.shadowRoot.querySelector('#ability-scores')

    expect(trimAll(abilityScores.shadowRoot.textContent)).to.includeOnce('18 (+4)')
  })

  test('displays dexterity with bonus', async() => {
    const element = await fixture(fixtures.detailedStatblock)
    const abilityScores = element.shadowRoot.querySelector('#ability-scores')

    expect(trimAll(abilityScores.shadowRoot.textContent)).to.includeOnce('17 (+3)')
  })

  test('displays constitution with bonus', async() => {
    const element = await fixture(fixtures.detailedStatblock)
    const abilityScores = element.shadowRoot.querySelector('#ability-scores')

    expect(trimAll(abilityScores.shadowRoot.textContent)).to.includeOnce('16 (+3)')
  })

  test('displays intelligence with bonus', async() => {
    const element = await fixture(fixtures.detailedStatblock)
    const abilityScores = element.shadowRoot.querySelector('#ability-scores')

    expect(trimAll(abilityScores.shadowRoot.textContent)).to.includeOnce('14 (+2)')
  })

  test('displays wisdom with bonus', async() => {
    const element = await fixture(fixtures.detailedStatblock)
    const abilityScores = element.shadowRoot.querySelector('#ability-scores')

    expect(trimAll(abilityScores.shadowRoot.textContent)).to.includeOnce('11 (+0)')
  })

  test('displays charisma with bonus', async() => {
    const element = await fixture(fixtures.detailedStatblock)

    const abilityScores = element.shadowRoot.querySelector('#ability-scores')
    expect(trimAll(abilityScores.shadowRoot.textContent)).to.includeOnce('8 (-1)')
  })

  test('does not display abilities table for statblock without abilities', async() => {
    const element = await fixture(fixtures.objectStatblock)
    assert.isNotOk(element.shadowRoot.querySelector('#ability-scores'))
  })

  test('displays skills', async() => {
    const element = await fixture(fixtures.detailedStatblock)
    const skills = element.shadowRoot.getElementById('skills')
    expect(trimAll(skills.shadowRoot.textContent)).to.includeOnce('Arcana +14, History +14, Perception +9, Religion +9')
  })

  test('do not display skills if monster has no skills', async() => {
    const element = await fixture(fixtures.simpleStatblock)
    expect(element.shadowRoot.getElementById('skills')).to.equal(null)
  })

  test('displays damage vulnerabilities', async() => {
    const element = await fixture(fixtures.detailedStatblock)
    const vulnerabilities = element.shadowRoot.getElementById('damage-vulnerabilities')
    expect(trimAll(vulnerabilities.shadowRoot.textContent)).to.includeOnce('fire')
  })

  test('displays damage resistances', async() => {
    const element = await fixture(fixtures.detailedStatblock)
    const resistances = element.shadowRoot.getElementById('damage-resistances')
    expect(trimAll(resistances.shadowRoot.textContent)).to.includeOnce('bludgeoning, piercing, and slashing from nonmagical items')
  })

  test('do not display damage resistances if monster has no damage resistances', async() => {
    const element = await fixture(fixtures.simpleStatblock)
    expect(element.shadowRoot.getElementById('damage-resistances')).to.equal(null)
  })

  test('displays damage immunities', async() => {
    const element = await fixture(fixtures.detailedStatblock)
    const immunities = element.shadowRoot.getElementById('damage-immunities')
    expect(trimAll(immunities.shadowRoot.textContent)).to.includeOnce('psychic')
  })

  test('do not display damage immunities if monster has no damage immunities', async() => {
    const element = await fixture(fixtures.simpleStatblock)
    expect(element.shadowRoot.getElementById('damage-immunities')).to.equal(null)
  })

  test('displays condition immunities', async() => {
    const element = await fixture(fixtures.detailedStatblock)
    const immunities = element.shadowRoot.getElementById('condition-immunities')
    expect(trimAll(immunities.shadowRoot.textContent)).to.includeOnce('charmed, frightened')
  })

  test('do not display condition immunities if monster has no condition immunities', async() => {
    const element = await fixture(fixtures.simpleStatblock)
    expect(element.shadowRoot.getElementById('condition-immunities')).to.equal(null)
  })

  test('displays senses', async() => {
    const element = await fixture(fixtures.detailedStatblock)
    const senses = element.shadowRoot.getElementById('senses')
    expect(trimAll(senses.shadowRoot.textContent)).to.includeOnce('truesight 120 ft., passive Perception 18')
  })

  test('displays languages', async() => {
    const element = await fixture(fixtures.detailedStatblock)
    const languages = element.shadowRoot.getElementById('languages')
    expect(trimAll(languages.shadowRoot.textContent)).to.includeOnce('Common, Sphinx')
  })

  test('do not display languages if monster has no languages', async() => {
    const element = await fixture(fixtures.simpleStatblock)
    expect(element.shadowRoot.getElementById('languages')).to.equal(null)
  })

  test('displays calculated challenge rating', async() => {
    const element = await fixture(fixtures.detailedStatblock)
    const challenge = element.shadowRoot.querySelector('#cr')
    expect(trimAll(challenge.shadowRoot.textContent)).to.includeOnce('11 (')
  })

  test('displays calculated experience points', async() => {
    const element = await fixture(fixtures.detailedStatblock)
    const challenge = element.shadowRoot.querySelector('#cr')
    expect(trimAll(challenge.shadowRoot.textContent)).to.includeOnce('(7200 XP)')
  })

  test('displays default challenge rating', async() => {
    const element = await fixture(fixtures.simpleStatblock)
    const challenge = element.shadowRoot.querySelector('#cr')
    expect(trimAll(challenge.shadowRoot.textContent)).to.includeOnce('½ (')
  })

  test('displays default experience points', async() => {
    const element = await fixture(fixtures.simpleStatblock)
    const challenge = element.shadowRoot.querySelector('#cr')
    expect(trimAll(challenge.shadowRoot.textContent)).to.includeOnce('(100 XP)')
  })

  test('does not display challenge rating with XP for objects', async() => {
    const element = await fixture(fixtures.objectStatblock)
    const challenge = element.shadowRoot.querySelector('#cr')
    assert.isNotOk(challenge)
  })

  test('can calculate CR without an attack', async() => {
    const element = await fixture(fixtures.innateSpellcasterStatblock)

    const challenge = element.shadowRoot.querySelector('#cr')
    assert.isOk(challenge)
  })

  test('displays special traits', async() => {
    const element = await fixture(fixtures.detailedStatblock)
    const trait = element.shadowRoot.querySelector('#special-trait-1')
    expect(trimAll(trait.shadowRoot.textContent)).to.includeOnce('Magic Weapons. The sphinx\'s weapon attacks are magical.')
  })

  test('displays single special trait', async() => {
    const element = await fixture(fixtures.simpleStatblock)
    const action = element.shadowRoot.querySelector('#special-trait-0')
    expect(trimAll(action.shadowRoot.textContent)).to.includeOnce('Trampling Charge.')
  })

  test('displays actions', async() => {
    const element = await fixture(fixtures.detailedStatblock)
    const action = element.shadowRoot.querySelector('#multiattack-0')
    expect(trimAll(action.shadowRoot.textContent)).to.includeOnce('Multiattack. The sphinx makes two claw attacks.')
  })

  test('does not display actions if there are none', async() => {
    const element = await fixture(fixtures.objectStatblock)
    assert.isNotOk(element.shadowRoot.querySelector('#actions'))
  })

  test('displays attacks', async() => {
    const element = await fixture(fixtures.detailedStatblock)
    const attack = element.shadowRoot.querySelector('#attack-1')
    expect(trimAll(attack.shadowRoot.textContent)).to.includeOnce('Claw (3/Day). Melee or Ranged Weapon Attack: +9 to hit, reach 5 ft. or range 10ft./20ft., one target. Hit: 13 (2d8 + 4) slashing damage')
  })

  test('displays attack notes', async() => {
    const element = await fixture(fixtures.detailedStatblock)
    const attack = element.shadowRoot.querySelector('#attack-1')
    expect(trimAll(attack.shadowRoot.textContent)).to.includeOnce('. This is a magic weapon attack.')
  })

  test('displays random attack effects', async() => {
    const element = await fixture(fixtures.detailedStatblock)
    const attack = element.shadowRoot.querySelector('#attack-1')
    expect(trimAll(attack.shadowRoot.textContent)).to.includeOnce('2. Paralysed. The target becomes paralysed.')
  })

  test('displays limited usage for simple action', async() => {
    const element = await fixture(fixtures.detailedStatblock)
    const attack = element.shadowRoot.querySelector('#action-2')
    expect(trimAll(attack.shadowRoot.textContent)).to.includeOnce('Limited Simple Action (1/Day).')
  })

  test('displays single attack', async() => {
    const element = await fixture(fixtures.simpleStatblock)
    const attack = element.shadowRoot.querySelector('#attack-0')
    expect(trimAll(attack.shadowRoot.textContent)).to.includeOnce('Hooves.')
  })

  test('attack without notes does not display "undefined"', async() => {
    const element = await fixture(fixtures.simpleStatblock)
    const attack = element.shadowRoot.querySelector('#attack-0')
    assert.notInclude(trimAll(attack.shadowRoot.textContent), 'undefined.')
  })

  test('displays legendary actions for creature with legendary actions', async() => {
    const element = await fixture(fixtures.detailedStatblock)
    const lengendaryActions = element.shadowRoot.querySelector('#legendary-actions')
    expect(trimAll(lengendaryActions.shadowRoot.textContent)).to.includeOnce('Legendary Actions')
  })

  test('does not display legendary actions for creature without legendary actions', async() => {
    const element = await fixture(fixtures.simpleStatblock)
    assert.isNotOk(element.shadowRoot.querySelector('#legendary-actions'))
  })

  test('displays number of legendary actions', async() => {
    const element = await fixture(fixtures.detailedStatblock)
    const lengendaryActions = element.shadowRoot.querySelector('#legendary-actions')
    expect(trimAll(lengendaryActions.textContent)).to.includeOnce('The gynosphinx can take 3 legendary actions')
  })

  test('displays legendary action with only 1 action cost', async() => {
    const element = await fixture(fixtures.detailedStatblock)
    const action = element.shadowRoot.querySelector('#legendary-action-0')
    expect(trimAll(action.shadowRoot.textContent)).to.includeOnce('Claw Attack. The sphinx makes one claw attack.')
  })

  test('displays legendary action with more than 1 action cost', async() => {
    const element = await fixture(fixtures.detailedStatblock)
    const action = element.shadowRoot.querySelector('#legendary-action-2')
    expect(trimAll(action.shadowRoot.textContent)).to.includeOnce('Cast a Spell (Costs 3 Actions). The sphinx casts a spell from its list of prepared Spells, using a spell slot as normal.')
  })

  test('does not displays "the" in legendary actions for named monster', async() => {
    const element = await fixture(fixtures.namedStatblock)
    const lengendaryActions = element.shadowRoot.querySelector('#legendary-actions')
    assert.notInclude(trimAll(lengendaryActions.textContent), 'The')
  })

  test('does not lower-case name in legendary actions for named monster', async() => {
    const element = await fixture(fixtures.namedStatblock)
    const lengendaryActions = element.shadowRoot.querySelector('#legendary-actions')
    expect(trimAll(lengendaryActions.textContent)).to.include('Florence the Pixie')
  })

  test('displays spellcasting for creature with spellcasting', async() => {
    const element = await fixture(fixtures.detailedStatblock)
    const spellcasting = element.shadowRoot.querySelector('#spellcasting')
    expect(trimAll(spellcasting.shadowRoot.textContent)).to.includeOnce('Spellcasting')
  })

  test('does not display spellcasting for creature without spellcasting', async() => {
    const element = await fixture(fixtures.simpleStatblock)
    assert.isNotOk(element.shadowRoot.querySelector('#spellcasting'))
  })

  test('displays spellcasting level for creature with spellcasting', async() => {
    const element = await fixture(fixtures.detailedStatblock)
    const spellcasting = element.shadowRoot.querySelector('#spellcasting')
    expect(trimAll(spellcasting.shadowRoot.textContent)).to.includeOnce('The gynosphinx is a 9th-level spellcaster.')
  })

  test('displays spellcasting ability for creature with spellcasting', async() => {
    const element = await fixture(fixtures.detailedStatblock)
    const spellcasting = element.shadowRoot.querySelector('#spellcasting')
    expect(trimAll(spellcasting.shadowRoot.textContent)).to.includeOnce('Its spellcasting ability is Intelligence')
  })

  test('displays spell save for creature with spellcasting', async() => {
    const element = await fixture(fixtures.detailedStatblock)
    const spellcasting = element.shadowRoot.querySelector('#spellcasting')
    expect(trimAll(spellcasting.shadowRoot.textContent)).to.includeOnce('spell save DC 17')
  })

  test('displays spell attack bonus for creature with spellcasting', async() => {
    const element = await fixture(fixtures.detailedStatblock)
    const spellcasting = element.shadowRoot.querySelector('#spellcasting')
    expect(trimAll(spellcasting.shadowRoot.textContent)).to.includeOnce('+9 to hit with spell attacks')
  })

  test('displays spell list class for creature with spellcasting', async() => {
    const element = await fixture(fixtures.detailedStatblock)
    const spellcasting = element.shadowRoot.querySelector('#spellcasting')
    expect(trimAll(spellcasting.shadowRoot.textContent)).to.includeOnce('The gynosphinx has the following wizard spells prepared:')
  })

  test('displays spell casting notes for creature with spellcasting', async() => {
    const element = await fixture(fixtures.detailedStatblock)
    const spellcasting = element.shadowRoot.querySelector('#spellcasting')
    expect(trimAll(spellcasting.shadowRoot.textContent)).to.includeOnce('and it requires no material components to cast its spells.')
  })

  test('displays cantrip spells for creature with spellcasting', async() => {
    const element = await fixture(fixtures.detailedStatblock)
    const level = element.shadowRoot.querySelector('#spell-level-0')
    expect(trimAll(level.shadowRoot.textContent)).to.includeOnce('Cantrips (at will): mage hand, minor illusion, prestidigitation')
  })

  test('displays spell and slots for creature with spellcasting', async() => {
    const element = await fixture(fixtures.detailedStatblock)
    const level = element.shadowRoot.querySelector('#spell-level-5')
    expect(trimAll(level.shadowRoot.textContent)).to.includeOnce('5th level (1 slot): legend lore')
  })

  test('does display spellcasting for creature with innate spellcasting', async() => {
    const element = await fixture(fixtures.innateSpellcasterStatblock)
    const spellcasting = element.shadowRoot.querySelector('#spellcasting')
    expect(trimAll(spellcasting.shadowRoot.textContent)).to.includeOnce('The pixie\'s innate spellcasting ability is Charisma (spell save DC 12). It can innately cast the following spells, requiring only its pixie dust as a component:')
  })

  test('does not display spellcasting level for creature with innate spellcasting', async() => {
    const element = await fixture(fixtures.innateSpellcasterStatblock)
    const spellcasting = element.shadowRoot.querySelector('#spellcasting')
    assert.notInclude(trimAll(spellcasting.shadowRoot.textContent), '-level spellcaster.')
  })

  test('does not display spellcasting attack bonus for creature without spellcasting attack bonus', async() => {
    const element = await fixture(fixtures.innateSpellcasterStatblock)
    const spellcasting = element.shadowRoot.querySelector('#spellcasting')
    assert.notInclude(spellcasting.shadowRoot.textContent, 'to hit with spell attacks')
  })

  test('does not display spellcasting spells prepared note for innate spellcasters', async() => {
    const element = await fixture(fixtures.innateSpellcasterStatblock)
    const spellcasting = element.shadowRoot.querySelector('#spellcasting')
    assert.notInclude(spellcasting.shadowRoot.textContent, 'spells prepared:')
  })

  test('displays at-will spellcasting level', async() => {
    const element = await fixture(fixtures.innateSpellcasterStatblock)
    const level = element.shadowRoot.querySelector('#spell-level-0')
    expect(level.shadowRoot.textContent).to.includeOnce('At will:')
  })

  test('displays once-per-day each spellcasting level', async() => {
    const element = await fixture(fixtures.innateSpellcasterStatblock)
    const level = element.shadowRoot.querySelector('#spell-level-1')
    expect(level.shadowRoot.textContent).to.includeOnce('1/day each:')
  })

  test('does not display "the" in spellcasting for named monsters', async() => {
    const element = await fixture(fixtures.namedStatblock)
    const spellcasting = element.shadowRoot.querySelector('#spellcasting')
    assert.notInclude(trimAll(spellcasting.shadowRoot.textContent), 'The')
  })

  test('does not lower-case name in spellcasting for named monsters', async() => {
    const element = await fixture(fixtures.namedStatblock)
    const spellcasting = element.shadowRoot.querySelector('#spellcasting')
    expect(trimAll(spellcasting.shadowRoot.textContent)).to.include('Florence the Pixie')
  })

  test('displays reactions', async() => {
    const element = await fixture(fixtures.detailedStatblock)
    const reactions = element.shadowRoot.querySelector('#reactions')
    expect(trimAll(reactions.shadowRoot.textContent)).to.includeOnce('Reactions')
  })

  test('displays reaction name', async() => {
    const element = await fixture(fixtures.detailedStatblock)
    const reaction = element.shadowRoot.querySelector('#reaction-0')
    expect(trimAll(reaction.shadowRoot.textContent)).to.includeOnce('Parry.')
  })

  test('displays reaction description', async() => {
    const element = await fixture(fixtures.detailedStatblock)
    const reaction = element.shadowRoot.querySelector('#reaction-0')
    expect(trimAll(reaction.shadowRoot.textContent)).to.includeOnce('The gynosphinx adds 3 to its AC against one melee attack that would hit it.')
  })

  test('displays saving throws', async() => {
    const element = await fixture(fixtures.detailedStatblock)
    const savingThrows = element.shadowRoot.getElementById('saving-throws')
    expect(trimAll(savingThrows.shadowRoot.textContent)).to.includeOnce('Strength +14')
  })

  test('does not display saving throws for creature without saving throws', async() => {
    const element = await fixture(fixtures.simpleStatblock)
    expect(element.shadowRoot.getElementById('saving-throws')).to.equal(null)
  })

  test('displays damage threshold for objects', async() => {
    const element = await fixture(fixtures.objectStatblock)
    const threshold = element.shadowRoot.getElementById('damage-threshold')
    expect(trimAll(threshold.shadowRoot.textContent)).to.includeOnce('10')
  })

  test('calculates effective hit points taking into account hit point adjustments', async() => {
    const element = await fixture(fixtures.detailedStatblock)
    expect(element.effectiveHp).to.equal(204)
  })

  test('calculates effective AC taking into account AC adjustments', async() => {
    const element = await fixture(fixtures.detailedStatblock)
    expect(element.effectiveAc).to.equal(18)
  })

  test('calculates max attack bonus', async() => {
    const element = await fixture(fixtures.detailedStatblock)
    expect(element.maxAttackBonus).to.equal(9)
  })

  test('calculates effective attack bonus taking into account attack bonus adjustments', async() => {
    const element = await fixture(fixtures.detailedStatblock)
    expect(element.effectiveAttackBonus).to.equal(10)
  })

  test('calculates max damage taking into account multiattacks', async() => {
    const element = await fixture(fixtures.detailedStatblock)
    expect(element.maxDamagePerRound).to.equal(26)
  })

  test('calculates effective damage taking into account multiattacks and damage adjustments', async() => {
    const element = await fixture(fixtures.detailedStatblock)
    expect(element.effectiveDamage).to.equal(65)
  })
})
