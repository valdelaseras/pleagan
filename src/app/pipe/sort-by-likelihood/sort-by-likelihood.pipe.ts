import { Pipe, PipeTransform } from '@angular/core';
import { compareTwoStrings } from 'string-similarity';

@Pipe({
  name: 'sortByLikelihood',
})
export class SortByLikelihoodPipe implements PipeTransform {
  transform(list: string[], input: string): string[] {
    if (input) {
      return this.sortByLikelihood(input.toLowerCase(), list);
    } else {
      return list;
    }
  }

  sortByLikelihood(input: string, list: string[]): string[] {
    return list
      .map((entry: string) => ({ name: entry, likelihood: compareTwoStrings(input, entry) }))
      .sort((firstEntry: { name: string; likelihood: number }, secondEntry: { name: string; likelihood: number }) => {
        if (firstEntry.likelihood < secondEntry.likelihood) {
          return -1;
        } else if (firstEntry.likelihood > secondEntry.likelihood) {
          return 1;
        } else {
          return 0;
        }
      })
      .map((entry: { name: string; likelihood: number }) => entry.name);
  }
}
