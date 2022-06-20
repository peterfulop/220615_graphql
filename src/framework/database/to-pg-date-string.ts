export const toPgDateString = (d: Date): string =>
  d.toISOString().replace(/\.?0{0,3}Z/, '+00:00');
