import { Pipe, PipeTransform } from '@angular/core';
import { compareTwoStrings } from 'string-similarity';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  transform(list: string[], input: string): string[] {
    if (input) {
      const results = [];
      results.push( ...this.filterBySubstring( input, list ) );
      return this.sortByLikelihood( input, results );
    } else {
      return [];
    }
  }

  filterBySubstring( substring: string, list: string[] ): string[] {
    return list.filter( ( entry: string ) => entry.indexOf( substring ) >= 0 );
  }

  sortByLikelihood( input: string, list: string[] ): string[] {
    return list
      .map( ( entry: string ) => ({ name: input, likelihood: compareTwoStrings( input, entry ) }) )
      .sort( ( firstEntry: {name: string, likelihood: number}, secondEntry: {name: string, likelihood: number}) => {
        if ( firstEntry.likelihood < secondEntry.likelihood ) {
          return -1
        }
        if ( firstEntry.likelihood > secondEntry.likelihood ) {
          return -1
        }

        return 0

      } )
      .map( (entry: {name: string, likelihood: number}) => entry.name );
  }
}
