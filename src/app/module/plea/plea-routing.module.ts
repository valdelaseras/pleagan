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
  { path: 'new', component: NewPleaComponent, canActivate: [IsLoggedIn] },
  { path: 'initiated', component: MyPleasComponent, canActivate: [IsLoggedIn] },
  { path: 'supported', component: MySupportComponent, canActivate: [IsLoggedIn] },
  { path: 'all', component: AllPleasComponent },
  { path: 'statistics', component: StatisticsComponent },
  { path: 'complied', component: CompliedPleasComponent },
  { path: 'complied/:pleaId/details', component: HafDetailsComponent },
  { path: ':pleaId/details', component: PleaDetailsComponent },
  { path: '**', redirectTo: 'all' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PleaRoutingModule { }
