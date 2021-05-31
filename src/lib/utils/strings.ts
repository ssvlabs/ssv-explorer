export const longStringShorten = (key: string, len: number = 6) => {
  return `${key.substr(0, len)}...${key.substr(key.length - len, len)}`;
};
