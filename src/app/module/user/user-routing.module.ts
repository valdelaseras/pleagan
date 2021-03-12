import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsComponent } from './component';

const routes: Routes = [
  { path: 'settings', component: SettingsComponent, data: { animation: 'settings' } },

  // @TODO: build a UserProfile component
  // { path: ':userId', component: UserProfileComponent }
  // { path: '', component: UserProfileComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
