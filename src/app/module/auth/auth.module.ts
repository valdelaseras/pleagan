import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as fromComponents from './component';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    ...fromComponents.components
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule
  ],
  exports: [
    ...fromComponents.components
  ]
})
export class AuthModule { }
