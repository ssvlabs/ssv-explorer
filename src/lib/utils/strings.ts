/**
 * Shorten the string that way so start and end of the string would be visible
 * @param key
 * @param len
 */
export const longStringShorten = (key: string, len: number = 6) => {
  if (key.length <= len + 3) {
    return key;
  }
  return `${key.substr(0, len)}...${key.substr(key.length - len, len)}`;
};

/**
 * Capitalize string
 * @param s
 */
export const capitalize = (s: string): string => {
  return s.charAt(0).toUpperCase() + s.slice(1);
};
