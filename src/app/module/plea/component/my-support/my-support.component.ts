import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Plea } from '@shared/model';
import { PleaService } from '@core/service';

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
