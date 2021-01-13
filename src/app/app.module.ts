import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { HomeComponent } from './components/home/home.component';
import { PleaComponent } from './components/plea/plea.component';
import { AboutComponent } from './components/about/about.component';
import { NewPleaComponent } from './components/plea/children/new-plea/new-plea.component';
import { PleasComponent } from './components/plea/children/pleas/pleas.component';
import { PleaDetailsComponent } from './components/plea/children/plea-details/plea-details.component';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { NavComponent } from './components/nav/nav.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PleaComponent,
    AboutComponent,
    NewPleaComponent,
    PleasComponent,
    PleaDetailsComponent,
    NavComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, ClarityModule, BrowserAnimationsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
