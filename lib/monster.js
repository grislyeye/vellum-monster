import { xpByCrTable, monsterStatisticsByCrTable } from './tables.js'
import { findLastIndex, closest } from './arrays.js'
import { Maybe } from './maybe.js'

export const calculateXpFromCr = cr => xpByCrTable[cr]

const emptyStringToUndefined = str => str === '' ? undefined : str

const parseDie = dieString => {
  const diceNotation = /^(\d*)d(\d+)(\s*(\+|-)\s*(\d+))?$/g
  const matches = diceNotation.exec(dieString.trim())

  if (!matches) {
    throw new Error(`invalid die string="${dieString}"`)
  }

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
}

export const averageDie = dieString => {
  const die = parseDie(dieString)
  return Math.floor(((die.dice / 2) + 0.5) * die.number) + die.modifier
}

const withIndex = (element, index) => Object.assign({ index: index }, element)

const monsterStats = monsterStatisticsByCrTable.map(withIndex)

const nearest = (array, index, predicate) => {
  const lowestIndex = array.findIndex(predicate)
  const highestIndex = findLastIndex(array, predicate)
  const closestIndex = closest(index, [lowestIndex, highestIndex])

  return array[closestIndex]
}

const armourClassCr = (maybeHpCr, ac) => {
  const equalAc = (row) => row.ac.includes(ac)
  return maybeHpCr.map(hpCr => {
    const nearestAcCr = nearest(monsterStats, hpCr.index, equalAc)
    return ac === hpCr.ac ? hpCr : nearestAcCr
  })
}

const attackBonusCr = (maybeDamageCr, attackBonus) => {
  const equalAttackBonus = (row) => row.attackBonus.includes(attackBonus)
  return maybeDamageCr.map(damageCr => {
    const nearestAttackBonusCr = nearest(monsterStats, damageCr.index, equalAttackBonus)
    return attackBonus === damageCr.attackBonus ? damageCr : nearestAttackBonusCr
  })
}

const avg = (...args) => args.reduce((acc, value) => acc + value) / args.length

const averageStats = (maybeLeft, maybeRight) =>
  maybeLeft.flatMap(left =>
    maybeRight.map(right => {
      const index = Math.round(avg(left.index, right.index))
      return monsterStats[index]
    })
  )

const composeStats = (maybeLeft, maybeRight) =>
  maybeLeft.flatMap(left =>
    maybeRight.map(right => {
      const index = left.index - Math.trunc((left.index - right.index) / 2)
      return monsterStats[index]
    })
  )

const toCr = maybeStats => maybeStats.map(stats => stats.cr).orUndefined()

export const calculateCr = monster => {
  const findHpRow = row => row.hpRange.includes(monster.hp)
  const hpCr = Maybe(monsterStats.find(findHpRow))

  const acCr = armourClassCr(hpCr, monster.ac)

  const defensiveCr = composeStats(hpCr, acCr)

  const findDamageRow = row => row.damageRange.includes(monster.damagePerRound)
  const damageCr = Maybe(monsterStats.find(findDamageRow))

  const abCr = attackBonusCr(damageCr, monster.attackBonus)

  const offensiveCr = composeStats(damageCr, abCr)

  const effectiveCr = averageStats(defensiveCr, offensiveCr)

  effectiveCr.forEach((cr) =>
    console.table({
      hitPoints: { value: monster.hp, cr: toCr(hpCr) },
      armourClass: { value: monster.ac, cr: toCr(acCr) },
      defensive: { cr: toCr(defensiveCr) },
      damage: { value: monster.damagePerRound, cr: toCr(damageCr) },
      attackBonus: { value: monster.attackBonus, cr: toCr(abCr) },
      offensive: { cr: toCr(offensiveCr) },
      effective: { cr: toCr(effectiveCr) }
    })
  )

  return toCr(effectiveCr)
}
