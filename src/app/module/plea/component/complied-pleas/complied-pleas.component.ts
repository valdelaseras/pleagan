import { Component } from '@angular/core';
import { PleaService } from '../../../core/service/plea/plea.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Plea } from '../../../shared/model/plea';
import { map, switchMap } from 'rxjs/operators';
import { PLEA_STATUS } from 'pleagan-model';

@Component({
  selector: 'app-card-list',
  templateUrl: './complied-pleas.component.html',
  styleUrls: ['./complied-pleas.component.scss'],
})
export class CompliedPleasComponent {
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
