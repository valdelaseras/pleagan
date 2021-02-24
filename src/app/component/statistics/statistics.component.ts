import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Plea } from '../../model/plea';
import { PleaService } from '../../service/plea/plea.service';
import { CompanyService } from '../../service/company/company.service';
import { Company } from '../../model/company';
import { PleaganService } from '../../service/pleagan/pleagan.service';
import { Pleagan } from '../../model/pleagan';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent {
  // temporary
  datasetOptions: string = 'pleagans';
  pleas$: Observable<Plea[]>;
  companies$: Observable<Company[]>;
  user$: Observable<Pleagan>;

  constructor(
    private pleaService: PleaService,
    private companyService: CompanyService,
    private pleaganService: PleaganService,
  ) {
    this.pleas$ = pleaService.getPleas();
    this.companies$ = companyService.getCompanies();
    this.user$ = pleaganService.getCurrentPleagan();
  }
}
