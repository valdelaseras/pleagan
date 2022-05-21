import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LazyLoadImagesModule } from 'ngx-lazy-load-images';

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
    PleaRoutingModule,
    LazyLoadImagesModule,
  ],
  exports: [
    ...fromComponents.components
  ]
})
export class PleaModule { }
