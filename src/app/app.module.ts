// TODO: order and group all this nicely
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './component/app/app.component';
import { SearchPipe } from './module/shared/pipe/search/search.pipe';
import { SortByLikelihoodPipe } from './module/shared/pipe/sort-by-likelihood/sort-by-likelihood.pipe';
import { CoreModule } from './module/core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './module/shared/shared.module';

const imports = [
  AppRoutingModule,
  BrowserModule,
  BrowserAnimationsModule,
  CoreModule,
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    imports,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
