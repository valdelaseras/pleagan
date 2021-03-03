import { Component } from '@angular/core';
import { PleaService } from '../../../../service/plea/plea.service';
import { Observable } from 'rxjs';
import { Plea } from '../../../../model/plea';

@Component({
  selector: 'app-my-support',
  templateUrl: './my-support.component.html',
  styleUrls: ['./my-support.component.scss'],
})
export class MySupportComponent {
  pleas$: Observable<Plea[]>;
  constructor(private pleaService: PleaService) {
    this.pleas$ = this.pleaService.getPleasISupport();
  }
}
