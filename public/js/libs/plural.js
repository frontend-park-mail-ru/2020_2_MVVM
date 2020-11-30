export const plural = (count, variants) => {
  const lastTwo = count % 100;
  if (lastTwo > 10 && lastTwo < 20) {
    return variants[0];
  }

  const last = count % 10;
  if (last === 1) {
    return variants[1];
  }

  if (last > 1 && last < 5) {
    return variants[2];
  }

  return variants[0];
};