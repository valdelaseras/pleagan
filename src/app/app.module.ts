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
import { ModalSuccessComponent } from './components/modals/modal-success/modal-success.component';
import { ModalFailComponent } from './components/modals/modal-fail/modal-fail.component';
import { ModalWarningComponent } from './components/modals/modal-warning/modal-warning.component';
import { PleaCardComponent } from './components/plea/plea-card/plea-card.component';
import { PleaService } from './services/plea.service';

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
    ModalSuccessComponent,
    ModalFailComponent,
    ModalWarningComponent,
    PleaCardComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, ClarityModule, BrowserAnimationsModule, ReactiveFormsModule],
  providers: [PleaService],
  bootstrap: [AppComponent],
})
export class AppModule {}
