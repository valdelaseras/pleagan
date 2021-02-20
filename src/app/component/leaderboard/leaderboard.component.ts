import { Component } from '@angular/core';
import {Observable} from 'rxjs';
import {Plea} from '../../model/plea';
import {PleaService} from '../../service/plea/plea.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss'],
})
export class LeaderboardComponent {
  pleas$: Observable<Plea[]>;
  constructor( private pleaService: PleaService ) {
    this.pleas$ = pleaService.getPleas();
  }
}
