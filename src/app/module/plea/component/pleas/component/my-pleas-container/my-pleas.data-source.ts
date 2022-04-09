import { AbstractDataSource } from '@shared/component/abstract-container/abstract-data-source';
import { GetPleaDto } from '@shared/model';
import { PleaFilterOptions } from '../../../../service/plea-filter.service';
import { PleaService } from '@core/service';
import {Observable, of} from 'rxjs';
import {catchError, map, takeUntil, tap} from 'rxjs/operators';
import {mapPleaToListItem, PleaListItem} from '../all-pleas-container/all-pleas.data-source';
import {GenericParams} from '@core/service/abstract-api/api.service';

export class MyPleasDataSource
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

  /**
   * (Re)-load the list of items by performing a new API call.
   * Calling this method manually should not be necessary since it is automatically called upon initialisation and
   * filter update, but is possible.
   * @param params
   */
  load( params?: GenericParams ): void {
    this.dataService.getMine( params ).pipe(
      takeUntil( this.unsubscribe ),
      catchError( () => {
        return of([]);
      }),
      map( ( data: GetPleaDto[] ) => {
        return data.map( this.mapObjectToListItem );
      }),
      tap( ( listItems: PleaListItem[] ) => {
        this.itemsSubject.next(
          this.getDefaultSortedData( listItems )
        );
        this.itemsChange.next();
      })
    ).subscribe();
  }

  // Required implementation of method used by abstract data source
  protected mapObjectToListItem( plea: GetPleaDto ): PleaListItem {
    return mapPleaToListItem( plea );
  }
}
