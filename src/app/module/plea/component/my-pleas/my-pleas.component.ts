import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { PleaService } from '@core/service';
import { Plea } from '@shared/model';

@Component({
  selector: 'app-my-pleas',
  templateUrl: './my-pleas.component.html',
  styleUrls: ['./my-pleas.component.scss'],
})
export class MyPleasComponent {
  pleas$: Observable<Plea[]>;
  constructor(private pleaService: PleaService) {
    this.pleas$ = this.pleaService.getMyPleas();
  }
}
