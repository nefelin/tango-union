// tells mongo these terms should be AND'ed
export const andifyMongoTextSearch = (text?: string) => {
  if (!text) {
    return text;
  }

  return text
    .split(' ')
    .map((word) => `"${word}"`) // tells mongo these terms should be AND'ed
    .join(' ');
};
