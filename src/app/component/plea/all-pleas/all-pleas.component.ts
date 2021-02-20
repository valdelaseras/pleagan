import { Component } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Plea } from '../../../model/plea';
import { PleaService } from '../../../service/plea/plea.service';
import { map, switchMap } from 'rxjs/operators';
import { PLEA_STATUS } from 'pleagan-model';

@Component({
  selector: 'app-submissions',
  templateUrl: './all-pleas.component.html',
  styleUrls: ['./all-pleas.component.scss'],
})
export class AllPleasComponent {
  updateQuery$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  pleas$: Observable<Plea[]>;
  constructor(private pleaService: PleaService) {
    this.pleas$ = this.updateQuery$.pipe(
      switchMap((query: string) => (query.length ? this.pleaService.searchPleas(query) : this.pleaService.getPleas())),
      map((pleas: Plea[]) => pleas.filter((plea: Plea) => plea.status !== PLEA_STATUS.COMPLIED)),
    );
  }

  updateQuery(query: string): void {
    this.updateQuery$.next(query);
  }
}
