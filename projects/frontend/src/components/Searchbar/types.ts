import { CompoundQueryInput } from '../../../generated/graphql';

export type SearchbarState = Partial<Omit<CompoundQueryInput, 'pagination' | 'sort'>>;
