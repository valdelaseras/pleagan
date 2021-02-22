import { Component } from '@angular/core';
import {Observable} from 'rxjs';
import {Plea} from '../../../../model/plea';
import {PleaService} from '../../../../service/plea/plea.service';

@Component({
  selector: 'app-my-pleas',
  templateUrl: './my-pleas.component.html',
  styleUrls: ['./my-pleas.component.scss'],
})
export class MyPleasComponent {
  pleas$: Observable<Plea[]>;
  constructor( private pleaService: PleaService ) {
    this.pleas$ = this.pleaService.getMyPleas();
  }
}
