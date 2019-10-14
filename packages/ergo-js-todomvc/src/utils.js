

export const uuid = () => {
  return Math.random().toString(36).substr(2, 9)
}

export const pluralize = (count, word) => {
  return count === 1 ? word : word + 's'
}
