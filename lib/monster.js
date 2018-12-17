const xpByCrTable = {
  '0': 0,
  '⅛': 25,
  '¼': 50,
  '½': 100,
  '1': 200,
  '2': 450,
  '3': 700,
  '4': 1100,
  '5': 1800,
  '6': 2300,
  '7': 2900,
  '8': 3900,
  '9': 5000,
  '10': 5900,
  '11': 7200,
  '12': 8400,
  '13': 10000,
  '14': 11500,
  '15': 13000,
  '16': 15000,
  '17': 18000,
  '18': 20000,
  '19': 22000,
  '20': 25000,
  '21': 33000,
  '22': 41000,
  '23': 50000,
  '24': 62000,
  '25': 75000,
  '26': 90000,
  '27': 105000,
  '28': 120000,
  '29': 135000,
  '30': 155000
}

export const calculateXpFromCr = (cr) => {
  return xpByCrTable[cr]
}

const emptyStringToUndefined = (str) => str === '' ? undefined : str

const parseDie = (dieString) => {
  const diceNotation = /^(\d*)d(\d+)(\s*(\+|-)\s*(\d+))?$/g
  const matches = diceNotation.exec(dieString.trim())

  if (!matches) {
    throw new Error(`invalid die string="${dieString}"`)
  }

  const [, number = '1', dice,, plusMinus = '+', modifier = '0'] = matches.map(emptyStringToUndefined)

  return {
    number: parseInt(number),
    dice: parseInt(dice),
    modifier: parseInt(plusMinus + modifier)
  }
}

export const averageDie = (dieString) => {
  const die = parseDie(dieString)
  return Math.floor(((die.dice / 2) + 0.5) * die.number) + die.modifier
}
