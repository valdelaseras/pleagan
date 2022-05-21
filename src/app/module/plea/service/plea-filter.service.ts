import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PLEA_STATUS } from '@shared/model';

export interface PleaFilterOptions {
  search?: string;
  pleagan?: string;
  status?: PLEA_STATUS;
  supported?: boolean;
  companyName?: string;
  productName?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PleaFilterService {
  private blankFilterOptions: PleaFilterOptions = {
    search: '',
    pleagan: '',
    status: undefined,
    supported: false,
    companyName: '',
    productName: '',
  }

  filterOptions: BehaviorSubject<PleaFilterOptions> = new BehaviorSubject<PleaFilterOptions>( this.blankFilterOptions );

  reset(): void {
    this.filterOptions.next( this.blankFilterOptions );
  }
}
