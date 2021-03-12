import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent, SettingsComponent } from './component';

const routes: Routes = [
  { path: 'settings', component: SettingsComponent, data: { animation: 'settings' } },
  { path: 'profile', component: ProfileComponent, data: { animation: 'profile' } },
  { path: ':pleaganDisplayName', component: ProfileComponent, data: { animation: 'profile' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
