export const boolify = (...values: unknown[]): boolean => {
  return values.every(Boolean)
}
