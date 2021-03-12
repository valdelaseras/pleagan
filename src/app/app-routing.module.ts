import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { NewsListComponent } from './component/news-list/news-list.component';
import { AboutComponent } from './component/about/about.component';
import { ContactComponent } from './component/contact/contact.component';
import { FaqComponent } from './component/faq/faq.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import( './module/auth/auth.module' ).then( m => m.AuthModule ),
  },
  {
    path: 'plea',
    loadChildren: () => import( './module/plea/plea.module' ).then( m => m.PleaModule ),
  },
  {
    path: 'user',
    loadChildren: () => import( './module/user/user.module' ).then( m => m.UserModule ),
  },
  { path: '', component: HomeComponent, data: { animation: 'home' } },
  { path: 'news', component: NewsListComponent, data: { animation: 'news' } },
  { path: 'about', component: AboutComponent, data: { animation: 'about' } },
  { path: 'contact', component: ContactComponent, data: { animation: 'contact' } },
  { path: 'faq', component: FaqComponent, data: { animation: 'faq' }  },
  { path: '**', redirectTo: '/' },
  // { path: 'my-news', component: MyNewsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
