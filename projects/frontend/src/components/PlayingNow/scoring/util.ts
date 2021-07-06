export const signifiesBlankValue = (val?: string) =>
  val && (val === 'Instrumental' || val === 'Unknown');

export const ensureString = (val: string | number | Array<string>) => {
  if (Array.isArray(val)) {
    return val.join(' ');
  }
  if (typeof val === 'number') {
    return val.toString();
  }
  return val;
};