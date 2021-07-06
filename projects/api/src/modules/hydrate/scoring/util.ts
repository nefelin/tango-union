export const signifiesBlankValue = (val?: string) => val && (val === 'Instrumental' || val === 'Unknown');

export const ensureStrings = (val: string | number | Array<string>): string | Array<string> => {
  if (Array.isArray(val)) {
    return val.map(ensureSingleString);
  }
  return ensureSingleString(val);
};

export const ensureSingleString = (val: string | number) => (typeof val === 'number' ? val.toString() : val);
