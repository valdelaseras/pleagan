import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PleaRoutingModule } from './plea-routing.module';
import { SharedModule } from '../shared/shared.module';
import * as fromComponents from './component';

@NgModule({
  declarations: [
    ...fromComponents.components,
  ],
  imports: [
    CommonModule,
    SharedModule,
    PleaRoutingModule
  ],
  exports: [
    ...fromComponents.components
  ]
})
export class PleaModule { }
