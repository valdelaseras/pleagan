import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PleaComponent } from './components/plea/plea.component';
import { NewPleaComponent } from './components/plea/children/new-plea/new-plea.component';
import { PleasComponent } from './components/plea/children/pleas/pleas.component';
import { PleaDetailsComponent } from './components/plea/children/plea-details/plea-details.component';
import { AboutComponent } from './components/about/about.component';
import { FaqComponent } from './components/faq/faq.component';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';
import { NewsComponent } from './components/news/news.component';
import { HallOfFameComponent } from './components/hall-of-fame/hall-of-fame.component';
import { ContactComponent } from './components/contact/contact.component';
import { SupportPleaComponent } from './components/plea/children/support-plea/support-plea.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  {
    path: 'plea',
    component: PleaComponent,
    children: [
      { path: 'new', component: NewPleaComponent },
      { path: 'all', component: PleasComponent },
      { path: 'details/:id', component: PleaDetailsComponent },
      { path: 'support/:id', component: SupportPleaComponent },
    ],
  },
  { path: 'leaderboard', component: LeaderboardComponent },
  { path: 'news', component: NewsComponent },
  { path: 'haf', component: HallOfFameComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'faq', component: FaqComponent },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
