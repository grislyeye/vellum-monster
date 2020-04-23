import { xpByCrTable, monsterStatisticsByCrTable } from './tables.js'
import { Maybe } from './maybe.js'

export const calculateXpFromCr = cr => xpByCrTable[cr]

const emptyStringToUndefined = str => str === '' ? undefined : str

const parseDie = (dieString) => {
  const diceNotation = /^(\d*)d(\d+)(\s*(\+|-)\s*(\d+))?$/g

  return Maybe(dieString)
    .map(die => die.trim())
    .map(die => diceNotation.exec(die))
    .map(matches => {
      const [
        ,
        number = '1',
        dice,
        ,
        plusMinus = '+',
        modifier = '0'
      ] = matches.map(emptyStringToUndefined)

      return {
        number: parseInt(number),
        dice: parseInt(dice),
        modifier: parseInt(plusMinus + modifier)
      }
    })
    .orUndefined()
}

export const averageDie = dieString => {
  return Maybe(dieString)
    .map(parseDie)
    .map(die => Math.floor(((die.dice / 2) + 0.5) * die.number) + die.modifier)
    .orUndefined()
}

const withIndex = (element, index) => Object.assign({ index: index }, element)

const monsterStats = monsterStatisticsByCrTable.map(withIndex)

const armourClassAdjustmentCr = (maybeHpCr, ac) => maybeHpCr.map(hpCr => {
  const expectedAc = hpCr.ac.slice(-1)[0]
  return Math.floor((Math.max(ac, 13) - expectedAc) / 2)
})

const attackBonusAdjustmentCr = (maybeDamageCr, attackBonus) => maybeDamageCr.map(damageCr => {
  const expectedAb = damageCr.attackBonus.slice(-1)[0]
  return Math.floor((Math.max(attackBonus, 3) - expectedAb) / 2)
})

const avg = (...args) => args.reduce((acc, value) => acc + value) / args.length

const averageStats = (maybeLeft, maybeRight) =>
  maybeLeft.flatMap(left =>
    maybeRight.map(right => {
      const index = Math.round(avg(left.index, right.index))
      return monsterStats[index]
    })
  )

const adjustCr = (maybeCr, maybeAdjustment) =>
  maybeCr.flatMap(cr =>
    maybeAdjustment.map(adjustment => monsterStats[Math.max(0, cr.index + adjustment)])
  )

const toCr = maybeStats => maybeStats.map(stats => stats.cr).orUndefined()

export const calculateCr = monster => {
  const findHpRow = row => row.hpRange.includes(monster.hp)
  const hpCr = Maybe(monsterStats.find(findHpRow))

  const acCrAdjustment = armourClassAdjustmentCr(hpCr, monster.ac)

  const defensiveCr = adjustCr(hpCr, acCrAdjustment)

  const findDamageRow = row => row.damageRange.includes(monster.damagePerRound)
  const damageCr = Maybe(monsterStats.find(findDamageRow))

  const abCrAdjustment = attackBonusAdjustmentCr(damageCr, monster.attackBonus)

  const offensiveCr = adjustCr(damageCr, abCrAdjustment)

  const effectiveCr = averageStats(defensiveCr, offensiveCr)

  return {
    hpCr: toCr(hpCr),
    acAdjustment: acCrAdjustment.orUndefined(),
    defensiveCr: toCr(defensiveCr),
    damageCr: toCr(damageCr),
    attackBonusAdjustment: abCrAdjustment.orUndefined(),
    offensiveCr: toCr(offensiveCr),
    effectiveCr: toCr(effectiveCr)
  }
}
