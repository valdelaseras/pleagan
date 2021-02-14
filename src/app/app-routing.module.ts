import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { PleaComponent } from './component/plea/plea.component';
import { NewPleaComponent } from './component/plea/children/new-plea/new-plea.component';
import { PleasListComponent } from './component/plea/children/pleas-list/pleas-list.component';
import { PleaDetailsComponent } from './component/plea/children/plea-details/plea-details.component';
import { AboutComponent } from './component/about/about.component';
import { FaqComponent } from './component/faq/faq.component';
import { LeaderboardComponent } from './component/leaderboard/leaderboard.component';
import { NewsComponent } from './component/news/news.component';
import { HallOfFameComponent } from './component/hall-of-fame/hall-of-fame.component';
import { ContactComponent } from './component/contact/contact.component';
import { SupportPleaComponent } from './component/plea/children/support-plea/support-plea.component';
import { SpecialThanksComponent } from './component/special-thanks/special-thanks.component';
import { CardListComponent } from './component/hall-of-fame/children/card-list/card-list.component';
import { DetailsComponent } from './component/hall-of-fame/children/details/details.component';
import { NewsListComponent } from './component/news/children/news-list/news-list.component';
import {LoginComponent} from './component/login/login.component';
import {RegisterComponent} from './component/register/register.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
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
