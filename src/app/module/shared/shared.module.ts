import * as fromComponents from './component';
import * as fromPipes from './pipe';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
// import { NgxEchartsModule } from 'ngx-echarts';
import { RouterModule } from '@angular/router';


// Import the echarts core module, which provides the necessary interfaces for using echarts.
// import * as echarts from 'echarts/core';
// // Import bar charts, all with Chart suffix
// import {
//   BarChart
// } from 'echarts/charts';
// import {
//   TitleComponent,
//   TooltipComponent,
//   GridComponent
// } from 'echarts/components';
// // Import the Canvas renderer, note that introducing the CanvasRenderer or SVGRenderer is a required step
// import {
//   CanvasRenderer
// } from 'echarts/renderers';
import * as fromDirectives from '@shared/directive';
import { ShowOnAuthDirective } from '@shared/directive';

// echarts.use(
//   [TitleComponent, TooltipComponent, GridComponent, BarChart, CanvasRenderer]
// );


@NgModule({
  declarations: [
    ...fromComponents.components,
    ...fromPipes.pipes,
    ...fromDirectives.directives
  ],
  imports: [
    CommonModule,
    FormsModule,
    // NgxEchartsModule.forRoot({ echarts }),
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    ...fromComponents.components,
    ...fromPipes.pipes,
    FormsModule,
    // NgxEchartsModule,
    ReactiveFormsModule,
    RouterModule,
    ShowOnAuthDirective
  ]
})
export class SharedModule { }
