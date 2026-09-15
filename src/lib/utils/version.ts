/**
 * Semver-ish comparison for versions reported by SSV nodes, which may be
 * prefixed ("v3.1.1") and/or carry a pre-release or build suffix
 * ("3.1.1-rc.1", "3.1.1+build.4"). Ported from ssv-web's `lib/utils/version`.
 */
export const parseVersion = (
  v: string | undefined
): [number, number, number] => {
  if (!v) return [0, 0, 0]
  const cleaned = v.replace(/^v/i, "").split(/[-+]/)[0] ?? ""
  const parts = cleaned.split(".").map((n) => parseInt(n, 10))
  return [parts[0] || 0, parts[1] || 0, parts[2] || 0]
}

export const isVersionGTE = (
  v: string | undefined,
  target: string
): boolean => {
  if (!v) return false
  const [a, b, c] = parseVersion(v)
  const [x, y, z] = parseVersion(target)
  if (a !== x) return a > x
  if (b !== y) return b > y
  return c >= z
}
