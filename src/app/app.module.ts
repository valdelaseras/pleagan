// TODO: order and group all this nicely
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './component/app/app.component';
import { CoreModule } from '@core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '@shared/shared.module';
import { AboutComponent } from './component/about/about.component';
import { ContactComponent } from './component/contact/contact.component';
import { FaqComponent } from './component/faq/faq.component';
import { HomeComponent } from './component/home/home.component';
import { NewsCardComponent } from './component/news-card/news-card.component';
import { NewsListComponent } from './component/news-list/news-list.component';

const imports = [
  AppRoutingModule,
  BrowserModule,
  BrowserAnimationsModule,
  CoreModule,
];

@NgModule({
  declarations: [
    AboutComponent,
    AppComponent,
    ContactComponent,
    FaqComponent,
    HomeComponent,
    NewsCardComponent,
    NewsListComponent,
  ],
  imports: [
    imports,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
