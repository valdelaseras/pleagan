import { AbstractDataSource } from '@shared/component/abstract-container/abstract-data-source';
import { GetPleaDto, PLEA_STATUS } from '@shared/model';
import { PleaFilterOptions } from '../../../../service/plea-filter.service';
import { PleaService } from '@core/service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface PleaListItem {
  productName: string;
  companyName: string;
  numberOfSupports: number;
  createdAt: Date;
  userHasSupported: boolean;
  status: PLEA_STATUS;
  pleaganName?: string;
  pleaganUid?: string;
  id?: number;
  productImage?: string; // url or base64 encoded productImage
}

/**
 * Maps GetPleaDto class instances to PleaListItem objects.
 * This method is assigned to the protected member mapObjectToListItem in the class below as well as exported for reuse
 * by components that don't need the entire data source.
 * @param plea
 */
export const mapPleaToListItem = ( plea: GetPleaDto ): PleaListItem => {
  const { nonVeganProduct, company, numberOfSupports, createdAt, id } = plea;
  return {
    productName: nonVeganProduct.name,
    productImage: nonVeganProduct.imageUrl,
    companyName: company.name,
    status: plea.status,
    pleaganUid: plea.pleagan.uid,
    pleaganName: plea.pleagan.displayName,
    userHasSupported: plea.userHasSupported,
    numberOfSupports,
    createdAt,
    id
  }
};

export class AllPleasDataSource
  extends AbstractDataSource<
    GetPleaDto,
    PleaListItem,
    PleaFilterOptions,
    PleaService> {

  constructor(
    protected pleaService: PleaService,
    protected filterOptions: Observable<PleaFilterOptions>,
  ) {
    super( pleaService, filterOptions );

    filterOptions.pipe(
      tap(() => this.itemsSubject.next([])),
      tap(() => this.load())
    ).subscribe()
  }

  protected getFilteredData( pleas: PleaListItem[], filters: PleaFilterOptions ): PleaListItem[] {
    let filteredPleas = [ ...pleas ];

    if ( filters.search ) {
      const search = filters.search.toLowerCase();
      filteredPleas = filteredPleas.filter( ( plea: PleaListItem ) => (
        plea.companyName.toLowerCase().indexOf( search ) >= 0 || plea.productName.toLowerCase().indexOf( search ) >= 0
      ));
    }

    if ( filters.pleagan ) {
      filteredPleas = filteredPleas.filter( ( plea: PleaListItem ) => plea.pleaganName === filters.pleagan );
    }

    if ( filters.supported ) {
      filteredPleas = filteredPleas.filter( ( plea: PleaListItem ) => plea.userHasSupported );
    }

    if ( filters.status ) {
      filteredPleas = filteredPleas.filter( ( plea: PleaListItem ) => plea.status === filters.status );
    }

    return filteredPleas;
  }

  // Required implementation of method used by abstract data source
  protected mapObjectToListItem( plea: GetPleaDto ): PleaListItem {
    return mapPleaToListItem( plea );
  }
}
