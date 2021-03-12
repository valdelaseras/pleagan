import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { environment } from '@env/*';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AuthorizationInterceptorProvider } from '@core/interceptor/authorization/authorization.interceptor';
import { HttpErrorInterceptorProvider } from '@core/interceptor/http-error/http-error.interceptor';
import { DismissMessagesInterceptorProvider } from '@core/interceptor/http-success/dismiss-messages.interceptor';

@NgModule({
  declarations: [],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    CommonModule,
    HttpClientModule,
    AngularFireAuthModule
  ],
  providers: [
    AuthorizationInterceptorProvider,
    HttpErrorInterceptorProvider,
    DismissMessagesInterceptorProvider
  ],
  exports: []
})
export class CoreModule { }
