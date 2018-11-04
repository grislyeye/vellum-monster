export const findLastIndex = (array, predicate) => {
  const index = array.slice().reverse().findIndex(predicate)

  if (index < 0) return index
  else return array.length - 1 - index
}

// algorithm copied from https://stackoverflow.com/a/19277804/48611
export const closest = (a, array) => array.reduce((prev, curr) => {
  return (Math.abs(curr - a) < Math.abs(prev - a) ? curr : prev)
})
