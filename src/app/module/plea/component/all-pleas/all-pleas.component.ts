import { Component } from '@angular/core';
import { BehaviorSubject, interval, Observable } from 'rxjs';
import { debounce, map, switchMap, tap } from 'rxjs/operators';
import { GetPleaDto, PLEA_STATUS } from '@shared/model';
import { PleaService } from '@core/service';
import { HTTP_LOADING_STATUS } from '@shared/model/http-loading-wrapper/http-loading-wrapper.model';

@Component({
  selector: 'app-submissions',
  templateUrl: './all-pleas.component.html',
  styleUrls: ['./all-pleas.component.scss'],
})
export class AllPleasComponent {
  updateQuery$: BehaviorSubject<string> = new BehaviorSubject<string>( '' );
  pleas$: Observable<GetPleaDto[]>;
  pleaStatus: HTTP_LOADING_STATUS
  constructor( private pleaService: PleaService ) {
    this.pleas$ = this.updateQuery$.pipe(
      debounce(() => interval( 500 )),
      tap( _ => this.pleaStatus = HTTP_LOADING_STATUS.LOADING ),
      switchMap(( query: string ) => ( query.length ? this.pleaService.searchPleas( query ) : this.pleaService.getPleas() )),
      map(( pleas: GetPleaDto[] ) => pleas.filter(( plea: GetPleaDto ) => plea.status !== PLEA_STATUS.COMPLIED )),
      tap( _ => this.pleaStatus = HTTP_LOADING_STATUS.FINISHED ),
    );
  }

  updateQuery(query: string): void {
    this.updateQuery$.next(query);
  }
}
