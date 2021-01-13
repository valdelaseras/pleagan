import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PleaComponent } from './components/plea/plea.component';
import { NewPleaComponent } from './components/plea/children/new-plea/new-plea.component';
import { PleasComponent } from './components/plea/children/pleas/pleas.component';
import { PleaDetailsComponent } from './components/plea/children/plea-details/plea-details.component';
import { AboutComponent } from './components/about/about.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  {
    path: 'plea',
    component: PleaComponent,
    children: [
      { path: 'new', component: NewPleaComponent },
      { path: 'all', component: PleasComponent },
      { path: 'details/:id', component: PleaDetailsComponent },
    ],
  },
  { path: 'about', component: AboutComponent },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
