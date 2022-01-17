import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import * as fromComponents from './component';
import { SharedModule } from '../shared/shared.module';
import {PleaModule} from '../plea/plea.module';


@NgModule({
  declarations: [
    ...fromComponents.components
  ],
    imports: [
        CommonModule,
        SharedModule,
        UserRoutingModule,
        PleaModule
    ],
  exports: [
    ...fromComponents.components
  ]
})
export class UserModule { }
