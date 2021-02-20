import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { PleaComponent } from './component/plea/plea.component';
import { NewPleaComponent } from './component/plea/children/new-plea/new-plea.component';
import { AllPleasComponent } from './component/plea/all-pleas/all-pleas.component';
import { PleaDetailsComponent } from './component/plea/children/plea-details/plea-details.component';
import { AboutComponent } from './component/about/about.component';
import { FaqComponent } from './component/faq/faq.component';
import { LeaderboardComponent } from './component/leaderboard/leaderboard.component';
import { NewsComponent } from './component/news/news.component';
import { HallOfFameComponent } from './component/hall-of-fame/hall-of-fame.component';
import { ContactComponent } from './component/contact/contact.component';
import { SupportPleaComponent } from './component/plea/children/support-plea/support-plea.component';
import { CompliedPleasComponent } from './component/hall-of-fame/children/complied-pleas/complied-pleas.component';
import { DetailsComponent } from './component/hall-of-fame/children/details/details.component';
import { NewsListComponent } from './component/news/children/news-list/news-list.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { MyProfileComponent } from './component/profile/my-profile.component';
import { MyPleasComponent } from './component/profile/children/my-pleas/my-pleas.component';
import { MySupportComponent } from './component/profile/children/my-support/my-support.component';
import { MyNewsComponent } from './component/profile/children/my-news/my-news.component';
import { MySettingsComponent } from './component/profile/children/my-settings/my-settings.component';
import { IsLoggedIn } from './guard/is-logged-in';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', component: HomeComponent, pathMatch: 'full' },
  {
    path: 'profile',
    component: MyProfileComponent,
    canActivate: [ IsLoggedIn ],
    children: [
      { path: 'settings', component: MySettingsComponent },
      { path: 'my-pleas', component: MyPleasComponent },
      { path: 'my-support', component: MySupportComponent },
      { path: 'my-news', component: MyNewsComponent },
    ],
  },
  {
    path: 'plea',
    component: PleaComponent,
    children: [
      { path: 'new', component: NewPleaComponent, canActivate: [ IsLoggedIn ] },
      { path: 'all', component: AllPleasComponent },
      { path: 'details/:id', component: PleaDetailsComponent },
      { path: 'support/:id', component: SupportPleaComponent, canActivate: [ IsLoggedIn ] },
    ],
  },
  { path: 'leaderboard', component: LeaderboardComponent },
  { path: 'news', component: NewsComponent, children: [{ path: 'all', component: NewsListComponent }] },
  {
    path: 'hall-of-fame',
    component: HallOfFameComponent,
    children: [
      { path: 'all', component: CompliedPleasComponent },
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
