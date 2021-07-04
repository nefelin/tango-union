import { FacetedResults } from './types';
import { CompoundResults } from './dto/compoundResult.entity';
export declare const andifyMongoTextSearch: (text?: string) => string;
export declare const compoundResultsFromFacetedResults: (res: FacetedResults) => CompoundResults;
