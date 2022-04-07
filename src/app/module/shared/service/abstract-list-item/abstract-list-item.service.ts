import { Observable } from 'rxjs';
import { ApiService, GenericParams } from '@core/service/abstract-api/api.service';

export interface AbstractListItemService<
  O,
  LI,
  DS extends ApiService<O>> {

  get( params?: GenericParams ): Observable<LI[]>;
  mapToListItem( item: O ): LI;
}
