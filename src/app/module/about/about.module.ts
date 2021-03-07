import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutRoutingModule } from './about-routing.module';
import * as fromComponents from './component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ...fromComponents.components
  ],
  imports: [
    AboutRoutingModule,
    CommonModule,
    SharedModule,
  ],
  exports: [
    ...fromComponents.components
  ]
})
export class AboutModule { }
