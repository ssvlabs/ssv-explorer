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

export const truncateText = (text: string, maxCharacters: number): string => {
  if (text.length <= maxCharacters) {
    return text;
  } 
    return `${text.slice(0, maxCharacters - 3)}...`;
};