import { SearchPipe } from './search/search.pipe';
import { SortByLikelihoodPipe } from './sort-by-likelihood/sort-by-likelihood.pipe';

export const pipes = [
  SearchPipe,
  SortByLikelihoodPipe,
];

export * from './search/search.pipe';
export * from './sort-by-likelihood/sort-by-likelihood.pipe';
