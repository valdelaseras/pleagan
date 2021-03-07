import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  AboutComponent,
  ContactComponent,
  FaqComponent,
  HomeComponent,
  NewsListComponent
} from './component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'news', component: NewsListComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'statistics', component: FaqComponent },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutRoutingModule { }
