import { Component } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Plea } from '../../../../model/plea';
import { PleaService } from '../../../../service/plea/plea.service';
import { map, switchMap } from 'rxjs/operators';
import { PLEA_STATUS } from 'pleagan-model';
import { FADE_IN_LIST } from '../../../../animations';

@Component({
  selector: 'app-submissions',
  templateUrl: './pleas-list.component.html',
  styleUrls: ['./pleas-list.component.scss'],
  animations: [
    FADE_IN_LIST
  ],
})
export class PleasListComponent {
  updateQuery$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  pleas$: Observable<Plea[]>;
  constructor(private pleaService: PleaService) {
    this.pleas$ = this.updateQuery$.pipe(
      switchMap( ( query: string ) => query.length ? this.pleaService.searchPleas( query ) : this.pleaService.getPleas() ),
      map((pleas: Plea[]) => pleas.filter((plea: Plea) => plea.status !== PLEA_STATUS.COMPLIED))
    );
  }

  updateQuery( query: string ): void {
    this.updateQuery$.next( query );
  }
}
