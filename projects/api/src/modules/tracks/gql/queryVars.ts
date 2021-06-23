import { CompoundQueryInput } from '../dto/compoundQuery.input';

export const criteria: CompoundQueryInput = {
  text: '1945',
  orchestras: ["Juan D'Arienzo"],
  pagination: { limit: 5, offset: 0 },
  sort: { title: 1 },
};

export const ids: Array<number> = [1, 2, 3, 4, 5];
