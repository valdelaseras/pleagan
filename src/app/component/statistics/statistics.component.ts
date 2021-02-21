import { Component } from '@angular/core';
import {Observable} from 'rxjs';
import {Plea} from '../../model/plea';
import {PleaService} from '../../service/plea/plea.service';
import {CompanyService} from '../../service/company/company.service';
import {Company} from '../../model/company';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent {
  pleas$: Observable<Plea[]>;
  companies$: Observable<Company[]>;
  constructor( private pleaService: PleaService, private companyService: CompanyService ) {
    this.pleas$ = pleaService.getPleas();
    this.companies$ = companyService.getCompanies();
  }
}
