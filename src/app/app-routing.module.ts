import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PleaComponent } from './components/plea/plea.component';
import { NewPleaComponent } from './components/plea/children/new-plea/new-plea.component';
import { PleasListComponent } from './components/plea/children/pleas-list/pleas-list.component';
import { PleaDetailsComponent } from './components/plea/children/plea-details/plea-details.component';
import { AboutComponent } from './components/about/about.component';
import { FaqComponent } from './components/faq/faq.component';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';
import { NewsComponent } from './components/news/news.component';
import { HallOfFameComponent } from './components/hall-of-fame/hall-of-fame.component';
import { ContactComponent } from './components/contact/contact.component';
import { SupportPleaComponent } from './components/plea/children/support-plea/support-plea.component';
import { SpecialThanksComponent } from './components/special-thanks/special-thanks.component';
import { CardListComponent } from './components/hall-of-fame/children/card-list/card-list.component';
import { DetailsComponent } from './components/hall-of-fame/children/details/details.component';
import { NewsListComponent } from './components/news/children/news-list/news-list.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  {
    path: 'plea',
    component: PleaComponent,
    children: [
      { path: 'new', component: NewPleaComponent },
      { path: 'all', component: PleasListComponent },
      { path: 'details/:id', component: PleaDetailsComponent },
      { path: 'support/:id', component: SupportPleaComponent },
    ],
  },
  { path: 'leaderboard', component: LeaderboardComponent },
  { path: 'special-thanks', component: SpecialThanksComponent },
  { path: 'news', component: NewsComponent, children: [{ path: 'all', component: NewsListComponent }] },
  {
    path: 'hall-of-fame',
    component: HallOfFameComponent,
    children: [
      { path: 'all', component: CardListComponent },
      { path: 'details/:id', component: DetailsComponent },
    ],
  },
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
