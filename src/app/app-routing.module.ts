import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import( './module/about/about.module' ).then( m => m.AboutModule )
  },
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
  { path: '**', redirectTo: '/' },
  // { path: 'my-news', component: MyNewsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
