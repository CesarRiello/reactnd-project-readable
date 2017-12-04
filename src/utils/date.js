
export const timestampToDate = (timestamp = 0) => (
  new Date(timestamp)
  .toISOString()
  .replace(/^(\d{4})-(\d{2})-(\d{2})[^Z]+Z/, '$3/$2/$1')
)
