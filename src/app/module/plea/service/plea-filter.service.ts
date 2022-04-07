import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GenericParams } from '@core/service/abstract-api/api.service';
import { SortDirection } from '@shared/component/abstract-container/abstract-data-source';

export interface PleaFilterOptions extends GenericParams {
  search?: string;
  companyName?: string;
  productName?: string;
  orderBy?: 'companyName' | 'productName' | 'createdAt' | 'numberOfSupports';
  direction?: SortDirection;
}

@Injectable({
  providedIn: 'root'
})
export class PleaFilterService {
  private blankFilterOptions: PleaFilterOptions = {
    search: '',
    companyName: '',
    productName: '',
    orderBy: 'createdAt',
    direction: 'ASC'
  }

  filterOptions: BehaviorSubject<PleaFilterOptions> = new BehaviorSubject<PleaFilterOptions>( this.blankFilterOptions );

  reset(): void {
    this.filterOptions.next( this.blankFilterOptions );
  }
}
