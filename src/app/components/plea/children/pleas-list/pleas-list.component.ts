import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Plea } from '../../../../model/plea';
import { PleaService } from '../../../../services/plea.service';
import { map } from 'rxjs/operators';
import { PLEA_STATUS } from 'pleagan-model';
import {animate, stagger, style, transition, trigger, query } from '@angular/animations';

@Component({
  selector: 'app-submissions',
  templateUrl: './pleas-list.component.html',
  styleUrls: ['./pleas-list.component.scss'],
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0 }),
          stagger(150, [
            animate('0.8s', style({ opacity: 1 }))
          ])
        ], { optional: true })
      ])
    ])
  ],
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
