import { Pipe, PipeTransform } from '@angular/core';
import { Plea } from '../models/plea/plea.model';
import { Product } from '../models/product/product.model';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(pleas: Plea[], input: string): Plea[] {
    if (input) {
      return [...new Set([...this.filterByProductName(pleas, input), ...this.filterByCompanyName(pleas, input)])];
    } else {
      return pleas;
    }
  }

  filterByCompanyName(pleas: Plea[], input: string): Plea[] {
    return pleas.filter((plea: Plea) => plea.company.name.toLowerCase().indexOf(input.toLowerCase()) >= 0);
  }

  filterByProductName(pleas: Plea[], input: string): Plea[] {
    return pleas.filter((plea: Plea) => {
      return (
        plea.company.products
          .map((product: Product) => {
            return product.name.toLowerCase().indexOf(input.toLowerCase()) >= 0;
          })
          .filter((result: boolean) => result).length > 0
      );
    });
  }
}
