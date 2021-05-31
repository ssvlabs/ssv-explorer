export const numberWithCommas = (x: number) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const normalizeNumber = (number: number, friction = 2) => {
  return number.toFixed(friction);
};
