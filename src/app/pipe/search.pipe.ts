import { Pipe, PipeTransform } from '@angular/core';
import { Plea } from '../model/plea';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(pleas: Plea[], input: string): Plea[] {
    if (input) {
      const results = [];
      for ( const fragment of input.split(' ') ) {
        results.push(...this.filterByProductName(pleas, fragment), ...this.filterByCompanyName(pleas, fragment));
      }
      return [...new Set(results)];
    } else {
      return pleas;
    }
  }

  filterByCompanyName(pleas: Plea[], input: string): Plea[] {
    return pleas.filter((plea: Plea) => plea.company.name.toLowerCase().indexOf(input.toLowerCase()) >= 0);
  }

  filterByProductName(pleas: Plea[], input: string): Plea[] {
    return pleas.filter((plea: Plea) => plea.nonVeganProduct.name.toLowerCase().indexOf( input.toLowerCase() ) >= 0)
  }
}
