import { Maybe } from '../types/utility/maybe';

export function capitalizeFirstLetter(word: Maybe<string>): Maybe<string> {
  return word ? word.charAt(0).toUpperCase() + word.slice(1) : null;
}
