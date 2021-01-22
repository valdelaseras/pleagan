import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Plea } from '../../../../models/plea/plea.model';
import { PleaService } from '../../../../services/plea.service';
import { map } from 'rxjs/operators';
import { PLEA_STATUS } from 'pleagan-model';

@Component({
  selector: 'app-submissions',
  templateUrl: './pleas-list.component.html',
  styleUrls: ['./pleas-list.component.scss'],
})
export class PleasListComponent implements OnInit {
  query: string;
  pleas$: Observable<Plea[]>;
  constructor(private pleaService: PleaService) {
    this.pleas$ = this.pleaService
      .getPleas()
      .pipe(map((pleas: Plea[]) => pleas.filter((plea: Plea) => plea.status !== PLEA_STATUS.COMPLIED)));
  }

  ngOnInit(): void {}
  updateQuery(query: string): void {
    this.query = query;
  }
}
