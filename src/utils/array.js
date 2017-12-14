export const orderByKey = (array = [], key = 'id', direction = 1) => {
  if (!array[0] || !array.length > 1 || !array[0].hasOwnProperty(key))
    return array

  return [...array].sort((current, next) => {
    if (current[key] < next[key])
     return -1 * direction

    if (current[key] > next[key])
     return 1 * direction

    return 0
  })
}
