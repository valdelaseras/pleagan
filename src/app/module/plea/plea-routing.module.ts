import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IsLoggedIn } from '../core/guard';
import {
  AllPleasComponent,
  CompliedPleasComponent,
  HafDetailsComponent,
  MyPleasComponent,
  MySupportComponent,
  NewPleaComponent,
  PleaDetailsComponent,
  StatisticsComponent
} from './component';

const routes: Routes = [
  { path: 'initiate', component: NewPleaComponent, canActivate: [IsLoggedIn], data: { animation: 'newPlea'} },
  { path: 'initiated', component: MyPleasComponent, canActivate: [IsLoggedIn], data: { animation: 'initiatedPleas'} },
  { path: 'supported', component: MySupportComponent, canActivate: [IsLoggedIn], data: { animation: 'supportedPleas'} },
  { path: 'all', component: AllPleasComponent, data: { animation: 'allPleas'} },
  { path: 'statistics', component: StatisticsComponent, data: { animation: 'statistics'} },
  { path: 'complied', component: CompliedPleasComponent, data: { animation: 'compliedPleas'} },
  { path: 'complied/:pleaId/details', component: HafDetailsComponent, data: { animation: 'compliedPleaDetails'} },
  { path: ':pleaId/details', component: PleaDetailsComponent, data: { animation: 'pleaDetails'} },
  { path: '**', redirectTo: 'all' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PleaRoutingModule { }
