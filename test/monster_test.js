import { assert } from '@open-wc/testing'
import { calculateXpFromCr, averageDie, calculateCr } from '../lib/monster.js'

suite('monster.js', () => {

  test('calculateXpFromCr() should calculate monster experience points from CR', () => {
    assert.equal(calculateXpFromCr('1'), 200)
  })

  suite('averageDie() should', () => {

    test('find average for d4', () => {
      assert.equal(averageDie('1d4'), '2')
    })

    test('find average for d6', () => {
      assert.equal(averageDie('1d6'), '3')
    })

    test('find average for d8', () => {
      assert.equal(averageDie('1d8'), '4')
    })

    test('find average for d10', () => {
      assert.equal(averageDie('1d10'), '5')
    })

    test('find average for d20', () => {
      assert.equal(averageDie('1d20'), '10')
    })

    test('ignore whitespace', () => {
      assert.equal(averageDie(' 1d6 '), '3')
    })

    test('find average for multiple dice', () => {
      assert.equal(averageDie('2d6'), '7')
    })

    test('find average without number of die', () => {
      assert.equal(averageDie('d6'), '3')
    })

    test('find average with positive modifier', () => {
      assert.equal(averageDie('1d6 + 1'), '4')
    })

    test('find average with negative modifier', () => {
      assert.equal(averageDie('1d6 - 1'), '2')
    })

    test('find average with modifier and no spaces', () => {
      assert.equal(averageDie('1d6+1'), '4')
    })

    test('return undefined on invalid die notation', () => {
      assert.isUndefined(averageDie('invalid die'))
    })

  })

  suite('calculateCr() should', () => {

    test('calculate correct CR for CR 0 monster', () => {
      const monster = {
        ac: 13,
        hp: 5,
        attackBonus: 3,
        damagePerRound: 1
      }

      const calculation = calculateCr(monster)

      assert.equal(calculation.effectiveCr, '0')
    })

    test('calculate correct CR for CR 0 monster with AC < 13', () => {
      const monster = {
        ac: 11,
        hp: 5,
        attackBonus: 3,
        damagePerRound: 1
      }

      const calculation = calculateCr(monster)

      assert.equal(calculation.effectiveCr, '0')
    })

    test('calculate correct CR for CR 0 monster with attack bonus < 3', () => {
      const monster = {
        ac: 11,
        hp: 5,
        attackBonus: 1,
        damagePerRound: 1
      }

      const calculation = calculateCr(monster)

      assert.equal(calculation.effectiveCr, '0')
    })

    test('calculate CR for monster with unusually high hit points', () => {
      const monster = {
        ac: 13,
        hp: 36,
        attackBonus: 3,
        damagePerRound: 1
      }

      const calculation = calculateCr(monster)

      assert.equal(calculation.effectiveCr, '⅛')
    })

    test('calculate CR for monster with unusually high armour class', () => {
      const monster = {
        ac: 15,
        hp: 90,
        attackBonus: 3,
        damagePerRound: 17
      }

      const calculation = calculateCr(monster)

      assert.equal(calculation.effectiveCr, '3')
    })

    test('calculate CR for monster with unusually high damage per round', () => {
      const monster = {
        ac: 14,
        hp: 120,
        attackBonus: 5,
        damagePerRound: 52
      }

      const calculation = calculateCr(monster)

      assert.equal(calculation.effectiveCr, '6')
    })

    test('calculate CR for monster with unusually high attack bonus', () => {
      const monster = {
        ac: 15,
        hp: 140,
        attackBonus: 8,
        damagePerRound: 35
      }

      const calculation = calculateCr(monster)

      assert.equal(calculation.effectiveCr, '6')
    })

    test('calculate CR for monster with unusually low hit points', () => {
      const monster = {
        ac: 17,
        hp: 135,
        attackBonus: 7,
        damagePerRound: 65
      }

      const calculation = calculateCr(monster)

      assert.equal(calculation.effectiveCr, '8')
    })

    test('calculate CR for monster with unusually low armour class', () => {
      const monster = {
        ac: 13,
        hp: 245,
        attackBonus: 8,
        damagePerRound: 80
      }

      const calculation = calculateCr(monster)

      assert.equal(calculation.effectiveCr, '11')
    })

    test('calculate CR for monster with unusually low damage per round', () => {
      const monster = {
        ac: 19,
        hp: 320,
        attackBonus: 10,
        damagePerRound: 90
      }

      const calculation = calculateCr(monster)

      assert.equal(calculation.effectiveCr, '16')
    })

    test('calculate CR for monster with unusually low attack bonus', () => {
      const monster = {
        ac: 19,
        hp: 320,
        attackBonus: 6,
        damagePerRound: 109
      }

      const calculation = calculateCr(monster)

      assert.equal(calculation.effectiveCr, '16')
    })

    test('calculate CR for monster with slightly high hit points', () => {
      const monster = {
        ac: 14,
        hp: 140,
        attackBonus: 5,
        damagePerRound: 30
      }

      const calculation = calculateCr(monster)

      assert.equal(calculation.effectiveCr, '5')
    })

    test('calculate CR for monster with slightly high armour class', () => {
      const monster = {
        ac: 15,
        hp: 125,
        attackBonus: 5,
        damagePerRound: 30
      }

      const calculation = calculateCr(monster)

      assert.equal(calculation.effectiveCr, '4')
    })

    test('calculate CR for monster with slightly high damage per round', () => {
      const monster = {
        ac: 14,
        hp: 125,
        attackBonus: 5,
        damagePerRound: 35
      }

      const calculation = calculateCr(monster)

      assert.equal(calculation.effectiveCr, '5')
    })

    test('calculate CR for monster with slightly high attack bonus', () => {
      const monster = {
        ac: 14,
        hp: 125,
        attackBonus: 6,
        damagePerRound: 30
      }

      const calculation = calculateCr(monster)

      assert.equal(calculation.effectiveCr, '4')
    })

    test('calculate CR for monster with slightly low hit points', () => {
      const monster = {
        ac: 16,
        hp: 165,
        attackBonus: 7,
        damagePerRound: 55
      }

      const calculation = calculateCr(monster)

      assert.equal(calculation.effectiveCr, '8')
    })

    test('calculate CR for monster with slightly low armour class', () => {
      const monster = {
        ac: 18,
        hp: 320,
        attackBonus: 10,
        damagePerRound: 107
      }

      const calculation = calculateCr(monster)

      assert.equal(calculation.effectiveCr, '17')
    })

    test('calculate CR for monster with slightly low damage per round', () => {
      const monster = {
        ac: 19,
        hp: 320,
        attackBonus: 10,
        damagePerRound: 100
      }

      const calculation = calculateCr(monster)

      assert.equal(calculation.effectiveCr, '17')
    })

    test('calculate CR for monster with slightly low attack bonus', () => {
      const monster = {
        ac: 19,
        hp: 320,
        attackBonus: 9,
        damagePerRound: 109
      }

      const calculation = calculateCr(monster)

      assert.equal(calculation.effectiveCr, '17')
    })

    test('calculate CR for monster with AC lower than 13', () => {
      const monster = {
        ac: 6,
        hp: 90,
        attackBonus: 2,
        damagePerRound: 28
      }

      const calculation = calculateCr(monster)

      assert.equal(calculation.effectiveCr, '1')
    })

    test('calculate CR for monster with attack bonus lower than +3', () => {
      const monster = {
        ac: 15,
        hp: 140,
        attackBonus: 1,
        damagePerRound: 34
      }

      const calculation = calculateCr(monster)

      assert.equal(calculation.effectiveCr, '4')
    })

    test('return undefined for out-of-range hit points', () => {
      const monster = {
        ac: 14,
        hp: -1,
        attackBonus: 3,
        damagePerRound: 30
      }

      assert.isNotOk(calculateCr(monster).effectiveCr)
    })

    test('return undefined for out-of-range damage-per-round', () => {
      const monster = {
        ac: 14,
        hp: 125,
        attackBonus: 3,
        damagePerRound: -30
      }

      assert.isNotOk(calculateCr(monster).effectiveCr)
    })

    test('return undefined when armour class not provided', () => {
      const monster = {
        hp: 100,
        attackBonus: 3,
        damagePerRound: 30
      }

      assert.isNotOk(calculateCr(monster).effectiveCr)
    })

    test('return undefined when hit points not provided', () => {
      const monster = {
        ac: 14,
        attackBonus: 3,
        damagePerRound: 30
      }

      assert.isNotOk(calculateCr(monster).effectiveCr)
    })

    test('return undefined when attack bonus not provided', () => {
      const monster = {
        ac: 14,
        hp: 125,
        damagePerRound: 30
      }

      assert.isNotOk(calculateCr(monster).effectiveCr)
    })

    test('return undefined when damage-per-round not provided', () => {
      const monster = {
        ac: 14,
        hp: 125,
        attackBonus: 3
      }

      assert.isNotOk(calculateCr(monster).effectiveCr)
    })
  })

})
