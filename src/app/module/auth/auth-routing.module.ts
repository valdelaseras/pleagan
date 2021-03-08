import { RouterModule, Routes } from '@angular/router';
import { LoginComponent, SignUpComponent } from './component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: 'login', component: LoginComponent, data: { animation: 'login' } },
  { path: 'sign-up', component: SignUpComponent, data: { animation: 'signUp' } },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
