import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './page/home-page/home-page.component';
import { NewsPageComponent } from './page/news-page/news-page.component';
import { AboutSectionComponent } from './section/about-section/about-section.component';
import { ContactPageComponent } from './page/contact-page/contact-page.component';
import { FaqPageComponent } from './page/faq-page/faq-page.component';
import { PleasResolver } from './module/plea/resolver/pleas.resolver';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import( './module/auth/auth.module' ).then( m => m.AuthModule ),
  },
  {
    path: 'plea',
    loadChildren: () => import( './module/plea/plea.module' ).then( m => m.PleaModule ),
    resolve: {
      pleas: PleasResolver, // value is not used, but this will pre-load and cache the data
    }
  },
  {
    path: 'user',
    loadChildren: () => import( './module/user/user.module' ).then( m => m.UserModule ),
  },
  { path: '', component: HomePageComponent, data: { animation: 'home' } },
  { path: 'news', component: NewsPageComponent, data: { animation: 'news' } },
  { path: 'about', component: AboutSectionComponent, data: { animation: 'about' } },
  { path: 'contact', component: ContactPageComponent, data: { animation: 'contact' } },
  { path: 'faq', component: FaqPageComponent, data: { animation: 'faq' }  },
  { path: '**', redirectTo: '/' },
  // { path: 'my-news', component: MyNewsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
