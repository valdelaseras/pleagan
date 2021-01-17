import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Plea } from '../../models/plea/plea.model';
import { PleaService } from '../../services/plea.service';

@Component({
  selector: 'app-hall-of-fame',
  templateUrl: './hall-of-fame.component.html',
  styleUrls: ['./hall-of-fame.component.scss'],
})
export class HallOfFameComponent implements OnInit {
  pleas$: Observable<Plea[]>;

  constructor(private pleaService: PleaService) {
    this.pleas$ = this.pleaService.getPleas();
  }

  ngOnInit(): void {}
}
