import { ApiService } from '@core/service/abstract-api/api.service';
import { BehaviorSubject, combineLatest, Observable, of, ReplaySubject, Subject } from 'rxjs';
import { catchError, map, takeUntil, tap } from 'rxjs/operators';

export type SortDirection = 'ASC' | 'DESC' | '';

const naturalSortCollator = new Intl.Collator( undefined, { numeric: true, sensitivity: 'base' });

const stringifyProperty = ( value: any ): string => {
  if ( typeof value === 'string' ) {
    return value;
  } else if ( typeof value === 'number' ) {
    return value.toString( 10 );
  } else {
    return '';
  }
};

export abstract class AbstractDataSource<O, LI, FO, DS extends ApiService<O>> {

  // Columns to sort list items by when using frontend-side sorting
  protected defaultSortColumns: (keyof LI)[] = [];

  // Emits when the data set changes
  itemsChange: Subject<void> = new Subject<void>();

  // Contains the raw data returned by the data service
  protected itemsSubject: ReplaySubject<LI[]> =  new ReplaySubject<LI[]>( 1 );

  // Emits true when no items are available and false otherwise
  noItems: BehaviorSubject<boolean> = new BehaviorSubject<boolean>( true );

  // Default page and sorting values
  // These are only required for frontend-side pagination, filtering and sorting
  protected defaultPageIndex = 0;
  protected defaultPageSize = 50;
  protected defaultSortActive: keyof LI | null = null;
  protected defaultSortDirection: SortDirection = 'ASC';

  protected pageIndex: BehaviorSubject<number> = new BehaviorSubject<number>( this.defaultPageIndex );
  protected pageSize: BehaviorSubject<number> = new BehaviorSubject<number>( this.defaultPageSize );
  protected sortActive: BehaviorSubject<keyof LI | null> = new BehaviorSubject<keyof LI | null>( this.defaultSortActive );
  protected sortDirection: BehaviorSubject<SortDirection> = new BehaviorSubject<SortDirection>( this.defaultSortDirection );

  count: BehaviorSubject<number> = new BehaviorSubject<number>( 0 );
  unsubscribe: Subject<void> = new Subject();
  loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  protected constructor (
    protected dataService: DS,
    protected filters: Observable<FO>
  ) {
    this.mapObjectToListItem = this.mapObjectToListItem.bind( this );
    let first = true;
    this.itemsChange.asObservable().pipe(
      takeUntil( this.unsubscribe ),
      tap(() => {
        if ( !first ) {
          // show toast notifying user that data was updated
        }
        first = false;
      })
    ).subscribe();

    this.itemsSubject.next([]);
  }

  /**
   * Returns an observable with sorted/filtered/paginated list items whenever the filter, data, page index, page size,
   * sorting value or direction changes.
   *
   * Note: only to be used for frontend-side sorting/filtering/paginating. Override in custom data source to use
   * backend-side sorting/filtering/paginating.
   */
  connect(): Observable<LI[]> {
    return combineLatest([
      this.itemsSubject.asObservable(),
      this.filters,
      this.pageIndex,
      this.pageSize,
      this.sortActive,
      this.sortDirection
    ]).pipe(
      map( ( [ items, filters, pageIndex, pageSize, sortActive, sortDirection ] ): LI[] => {
        // Apply filtering
        items = this.getFilteredData( items, filters );

        // Update pagination size
        this.count.next( items.length );

        // Update noItems subject
        this.noItems.next( items.length === 0 );

        // Apply sorting
        items = this.getSortedData( items, sortActive, sortDirection );

        // Apply pagination
        return [ ...items ].splice( pageIndex * pageSize, pageSize );
      })
    );
  }

  /**
   * Disconnect the observable streams
   */
  disconnect(): void {
    this.unsubscribe.next();
    this.itemsSubject.complete();
    this.pageIndex.complete();
    this.pageSize.complete();
    this.sortActive.complete();
    this.sortDirection.complete();
    this.count.complete();
  }

  /**
   * Set the page size and index for frontend-side pagination
   * @param pageIndex
   * @param pageSize
   */
  setPage( pageIndex: number, pageSize: number ): void {
    this.pageIndex.next( pageIndex );
    this.pageSize.next( pageSize );
  }

  /**
   * Set the property to sort by and the direction for frontend-side sorting
   * @param active
   * @param direction
   */
  setSort( active: keyof LI, direction: SortDirection ): void {
    this.sortActive.next( active );
    this.sortDirection.next( direction );
  }

  /**
   * (Re)-load the list of items by performing a new API call.
   * Calling this method manually should not be necessary since it is automatically called upon filter update, but is
   * possible.
   */
  load(): void {
    this.unsubscribe.next()
    this.loading.next( true );
    this.dataService.get().pipe(
      takeUntil( this.unsubscribe ),
      catchError( () => {
        return of([]);
      }),
      map( ( data: O[] ) => {
        return data.map( this.mapObjectToListItem );
      }),
      tap( ( listItems: LI[] ) => {
        this.itemsSubject.next(
          this.getDefaultSortedData( listItems )
        );
        this.loading.next( false );
        this.itemsChange.next();
      })
    ).subscribe();
  }

  protected getFilteredData( data: LI[], filters: FO ): LI[] {
    let filteredData = [ ...data ];
    for ( const filter in filters ) {
      if ( !filters[ filter ] ) {
        continue;
      }

      // Filter by property
      filteredData = filteredData.filter( ( item: LI ) => {
        return (( item as any )[ filter ] === filters[ filter ]);
      });
    }

    return filteredData;
  }

  protected getSortedData( data: LI[], active: keyof LI | null, direction: SortDirection ): LI[] {
    // Don't sort if no sorting or direction have been supplied
    if ( !active || direction === '' ) {
      return data;
    }

    // Default to 'asc' if nothing supplied
    const isAsc = direction !== 'DESC';

    // Copy using [...data] sp that we're not mutating the reference passed in
    return [ ...data ].sort(( a: LI, b: LI ) => {
      // Sort null values at the end
      if ( !a[ active ] && !!b[ active ] ) {
        return ( isAsc ? 1 : -1 );
      }
      if ( !b[ active ] && !!a[ active ] ) {
        return ( isAsc ? -1 : 1 );
      }

      // Sort by date
      if ( a[ active ] instanceof Date || b[ active ] instanceof Date ) {
        // @ts-ignore
        return ( ( a[ active ] as Date).getTime() < ( b[ active ] as Date ).getTime() ? -1 : 1 ) * ( isAsc ? 1 : -1 );
      }

      return naturalSortCollator.compare( stringifyProperty( a[ active ] ), stringifyProperty( b[ active ] ) ) * ( isAsc ? 1 : -1 );
    });
  }

  protected getDefaultSortedData( data: LI[] ): LI[] {
    // Copy using [...data] sp that we're not mutating the reference passed in
    return [ ...data ].sort(( a: LI, b: LI ) => {
      let sort;

      for ( const column of this.defaultSortColumns ) {
        // Sort null values at the end
        if ( !a[ column ] && !!b[ column ] ) {
          return 1;
        }
        if ( !b[ column ] && !!a[ column ] ) {
          return -1;
        }

        // Sort by date
        if ( a[ column ] instanceof Date || b[ column ] instanceof Date ) {
          // @ts-ignore
          return ( ( a[ active ] as Date).getTime() < ( b[ active ] as Date ).getTime() ? -1 : 1 ) * ( isAsc ? 1 : -1 );
        }

        sort = naturalSortCollator.compare( stringifyProperty( a[ column ] ), stringifyProperty( b[ column ] ) );
        if ( sort !== 0 ) {
          return sort;
        }
      }

      return 0;
    });
  }

  protected abstract mapObjectToListItem( item: O ): LI;
}
