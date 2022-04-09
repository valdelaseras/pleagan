import { AbstractDataSource } from '@shared/component/abstract-container/abstract-data-source';
import { GetPleaDto } from '@shared/model';
import { PleaFilterOptions } from '../../../../service/plea-filter.service';
import { PleaService } from '@core/service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface PleaListItem {
  productName: string;
  companyName: string;
  numberOfSupports: number;
  createdAt: Date;
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
    protected filterOptions: Observable<PleaFilterOptions>
  ) {
    super( pleaService, filterOptions );
  }

  // Override existing connect method to disable front-end filtering
  connect(): Observable<PleaListItem[]> {
    return this.itemsSubject.asObservable().pipe(
      map( ( items ): PleaListItem[] => {
        this.count.next( items.length );
        return items;
      })
    );
  }

  // Required implementation of method used by abstract data source
  protected mapObjectToListItem( plea: GetPleaDto ): PleaListItem {
    return mapPleaToListItem( plea );
  }
}
