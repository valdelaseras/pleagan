import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { mockPleagans } from './mockdata/data';
import { mockCompanies } from './mockdata/data';
import firebase from 'firebase/app';
import User = firebase.User;
import { AuthService, CompanyService, PleaService } from '@core/service';
import { GetCompanyDto, GetPleaDto } from '@shared/model';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent {
  // temporary
  datasetOptions: string = 'pleas';
  pleas$: Observable<GetPleaDto[]>;
  companies$: Observable<GetCompanyDto[]>;
  user$: Observable<User | null>;

  // Some random options for graph and chart demos
  // optionsPleas = {
  //   legend: {
  //     data: ['Initiated pleas', 'Complied pleas'],
  //     align: 'left',
  //   },
  //   xAxis: {
  //     data: [
  //       'January 21',
  //       'February 21',
  //       'March 21',
  //       'April 21',
  //       'May 21',
  //       'June 21',
  //       'July 21',
  //       'August 21',
  //       'September 21',
  //       'October 21',
  //       'November 21',
  //       'December 21',
  //       'January 22',
  //       'February 22',
  //       'March 22',
  //       'April 22',
  //       'May 22',
  //       'June 22',
  //       'July 22',
  //       'August 22',
  //       'September 22',
  //       'October 22',
  //       'November 22',
  //       'December 22',
  //     ],
  //     silent: false,
  //     splitLine: {
  //       show: false,
  //     },
  //   },
  //   yAxis: {},
  //   series: [
  //     {
  //       name: 'Initiated pleas',
  //       type: 'bar',
  //       data: [
  //         5,
  //         10,
  //         15,
  //         30,
  //         55,
  //         60,
  //         62,
  //         53,
  //         78,
  //         89,
  //         111,
  //         243,
  //         225,
  //         210,
  //         215,
  //         330,
  //         355,
  //         360,
  //         262,
  //         253,
  //         278,
  //         389,
  //         111,
  //         243,
  //       ],
  //     },
  //     {
  //       name: 'Complied pleas',
  //       type: 'bar',
  //       data: [0, 0, 3, 6, 4, 2, 7, 15, 5, 3, 9, 12, 22, 40, 35, 59, 21, 5, 17, 4, 7, 17, 37, 13],
  //     },
  //   ],
  //   animationEasing: 'elasticOut',
  // };
  //
  // optionsCompanies = {
  //   tooltip: {
  //     trigger: 'item',
  //     formatter: '{a} <br/>{b} : {c} ({d}%)',
  //   },
  //   visualMap: {
  //     show: false,
  //     min: 0,
  //     max: 50,
  //     inRange: {
  //       colorLightness: [0, 1],
  //     },
  //   },
  //   series: [
  //     {
  //       name: 'Initiated pleas per company',
  //       type: 'pie',
  //       radius: '80%',
  //       center: ['50%', '50%'],
  //       data: mockCompanies.sort((a, b) => a.value - b.value),
  //       roseType: 'radius',
  //       label: {
  //         normal: {
  //           textStyle: {
  //             color: 'rgba(0, 0, 0, 0.6)',
  //           },
  //         },
  //       },
  //       labelLine: {
  //         normal: {
  //           lineStyle: {
  //             color: 'rgba(0, 0, 0, 0.3)',
  //           },
  //           smooth: 0.2,
  //           length: 10,
  //           length2: 20,
  //         },
  //       },
  //       itemStyle: {
  //         normal: {
  //           color: '#c23f7b',
  //           shadowBlur: 20,
  //           shadowColor: 'rgba(0, 0, 0, 0.2)',
  //         },
  //       },
  //
  //       animationType: 'scale',
  //       animationEasing: 'elasticOut',
  //     },
  //   ],
  // };
  //
  // optionsPleagans = {
  //   tooltip: {
  //     trigger: 'item',
  //     formatter: '{a} <br/>{b} : {c} ({d}%)',
  //   },
  //   visualMap: {
  //     show: false,
  //     min: 0,
  //     max: 1000,
  //     inRange: {
  //       colorLightness: [0, 1],
  //     },
  //   },
  //   series: [
  //     {
  //       name: 'Registered pleagans',
  //       type: 'pie',
  //       radius: '80%',
  //       center: ['50%', '50%'],
  //       data: mockPleagans.sort((a, b) => a.value - b.value),
  //       roseType: 'radius',
  //       label: {
  //         normal: {
  //           textStyle: {
  //             color: 'rgba(0, 0, 0, 0.6)',
  //           },
  //         },
  //       },
  //       labelLine: {
  //         normal: {
  //           lineStyle: {
  //             color: 'rgba(0, 0, 0, 0.3)',
  //           },
  //           smooth: 0.2,
  //           length: 10,
  //           length2: 20,
  //         },
  //       },
  //       itemStyle: {
  //         normal: {
  //           color: '#c23531',
  //           shadowBlur: 20,
  //           shadowColor: 'rgba(0, 0, 0, 0.2)',
  //         },
  //       },
  //
  //       animationType: 'scale',
  //       animationEasing: 'elasticOut',
  //     },
  //   ],
  // };
  //
  // constructor(
  //   private pleaService: PleaService,
  //   private companyService: CompanyService,
  //   private authService: AuthService,
  // ) {
  //   this.pleas$ = pleaService.getPleas();
  //   this.companies$ = companyService.getCompanies();
  //   this.user$ = authService.user$;
  // }
}
