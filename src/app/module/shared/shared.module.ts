import * as fromComponents from './component';
import * as fromPipes from './pipe';
import { ClarityModule } from '@clr/angular';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    ...fromComponents.components,
    ...fromPipes.pipes,
  ],
  imports: [
    ClarityModule,
    CommonModule,
    FormsModule,
    NgxEchartsModule.forRoot({ echarts: () => import('echarts') }),
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    ...fromComponents.components,
    ...fromPipes.pipes,
    ClarityModule,
    FormsModule,
    NgxEchartsModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class SharedModule { }
