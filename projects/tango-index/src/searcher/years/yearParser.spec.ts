import { YearParser } from './yearParser';
import { NULL_LABELS } from '../types';

it('should test', () => {
  const parser = new YearParser(NULL_LABELS.YEAR)
  const term ='20s, 47-49, banans 34bfgfg ?'
  const years = parser.yearsFromSearch(term);
  const cleaned = parser.stripYearTerms(term)
  console.log({years, cleaned});
});