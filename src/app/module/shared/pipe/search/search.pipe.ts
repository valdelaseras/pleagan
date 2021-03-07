import { Pipe, PipeTransform } from '@angular/core';
import { compareTwoStrings } from 'string-similarity';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(list: string[], input: string): string[] {
    if (input) {
      return this.filterBySubstring(input.toLowerCase(), list);
    } else {
      return [];
    }
  }

  filterBySubstring(substring: string, list: string[]): string[] {
    return list.filter((entry: string) => entry.toLowerCase().indexOf(substring) >= 0);
  }
}
