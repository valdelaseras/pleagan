import {Component, OnInit} from '@angular/core';
import {PleaService} from '../../../../services/plea.service';
import {Observable} from 'rxjs';
import {Plea} from '../../../../models/plea/plea.model';
import {map} from 'rxjs/operators';
import {PLEA_STATUS} from 'pleagan-model';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit {
  pleas$: Observable<Plea[]>
  constructor( private pleaService: PleaService ) {
    this.pleas$ = this.pleaService.getPleas().pipe(
      map(( pleas: Plea[] ) => ( pleas.filter( ( plea: Plea ) => plea.status === PLEA_STATUS.COMPLIED )) )
    );
  }

  ngOnInit(): void {
  }

}
