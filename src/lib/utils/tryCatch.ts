export const tryCatch = <T, F>(fn: () => T, fallback: F): T | F => {
  try {
    return fn()
  } catch {
    return fallback
  }
}
