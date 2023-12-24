export const getRandomNumber = (min: number, max: number) => {
  // Menghasilkan angka acak antara min (inklusif) dan max (eksklusif)
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
