import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { environment } from '@env/*';
import { AngularFireAuthModule } from '@angular/fire/auth';

@NgModule({
  declarations: [],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    CommonModule,
    HttpClientModule,
    AngularFireAuthModule
  ],
  exports: []
})
export class CoreModule { }
