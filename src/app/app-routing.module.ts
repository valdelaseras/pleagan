import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './component/page/home-page/home-page.component';
import { NewsPageComponent } from './component/page/news-page/news-page.component';
import { AboutPageComponent } from './component/page/about-page/about-page.component';
import { ContactPageComponent } from './component/page/contact-page/contact-page.component';
import { FaqPageComponent } from './component/page/faq-page/faq-page.component';
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
  { path: 'contact', component: ContactPageComponent, data: { animation: 'contact' } },
  { path: 'faq', component: FaqPageComponent, data: { animation: 'faq' }  },
  { path: 'about', component: AboutPageComponent, data: { animation: 'faq' }  },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
