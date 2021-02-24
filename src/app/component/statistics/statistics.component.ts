import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Plea } from '../../model/plea';
import { PleaService } from '../../service/plea/plea.service';
import { CompanyService } from '../../service/company/company.service';
import { Company } from '../../model/company';
import { PleaganService } from '../../service/pleagan/pleagan.service';
import { Pleagan } from '../../model/pleagan';
import { mockData } from './mockdata/data';

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

  options = {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)',
    },
    visualMap: {
      show: false,
      min: 0,
      max: 10000,
      inRange: {
        colorLightness: [0, 1],
      },
    },
    series: [
      {
        name: 'Registered pleagans',
        type: 'pie',
        radius: '80%',
        center: ['50%', '50%'],
        data: mockData.sort((a, b) => a.value - b.value),
        roseType: 'radius',
        label: {
          normal: {
            textStyle: {
              color: 'rgba(0, 0, 0, 0.6)',
            },
          },
        },
        labelLine: {
          normal: {
            lineStyle: {
              color: 'rgba(0, 0, 0, 0.3)',
            },
            smooth: 0.2,
            length: 10,
            length2: 20,
          },
        },
        itemStyle: {
          normal: {
            color: '#c23531',
            shadowBlur: 20,
            shadowColor: 'rgba(0, 0, 0, 0.2)',
          },
        },

        animationType: 'scale',
        animationEasing: 'elasticOut',
      },
    ],
  };

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
