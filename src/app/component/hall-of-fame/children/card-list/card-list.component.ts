import { Component, OnInit } from '@angular/core';
import { PleaService } from '../../../../service/plea/plea.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Plea } from '../../../../model/plea';
import { map, switchMap } from 'rxjs/operators';
import { PLEA_STATUS } from 'pleagan-model';
import { FADE_IN_LIST } from '../../../../animations';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
  animations: [FADE_IN_LIST],
})
export class CardListComponent {
  updateQuery$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  pleas$: Observable<Plea[]>;
  constructor(private pleaService: PleaService) {
    this.pleas$ = this.updateQuery$.pipe(
      switchMap((query: string) => (query.length ? this.pleaService.searchPleas(query) : this.pleaService.getPleas())),
      map((pleas: Plea[]) => pleas.filter((plea: Plea) => plea.status === PLEA_STATUS.COMPLIED)),
    );
  }

  updateQuery(query: string): void {
    this.updateQuery$.next(query);
  }
}
