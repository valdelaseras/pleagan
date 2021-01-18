import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Plea } from '../../../../models/plea/plea.model';
import { PleaService } from '../../../../services/plea.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-submissions',
  templateUrl: './pleas.component.html',
  styleUrls: ['./pleas.component.scss'],
})
export class PleasComponent implements OnInit {
  pleas$: Observable<Plea[]>;
  constructor(private pleaService: PleaService) {
    this.pleas$ = this.pleaService.getPleas().pipe(tap(console.log));
  }

  ngOnInit(): void {}
}
