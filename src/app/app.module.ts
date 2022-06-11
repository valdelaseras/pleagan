import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './component/app/app.component';
import { CoreModule } from '@core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '@shared/shared.module';
// pages
import { HomePageComponent } from './page/home-page/home-page.component';
import { ProfilePageComponent } from './page/profile-page/profile-page.component';
import { ContactPageComponent } from './page/contact-page/contact-page.component';
import { FaqPageComponent } from './page/faq-page/faq-page.component';
import { NewsPageComponent } from './page/news-page/news-page.component';
// sections
import { LandingSectionComponent } from './section/landing-section/landing-section.component';
import { AboutSectionComponent } from './section/about-section/about-section.component';
import { NewsSectionComponent } from './section/news-section/news-section.component';
import { FaqSectionComponent } from './section/faq-section/faq-section.component';
import { ProfileSectionComponent } from './section/profile-section/profile-section.component';
import { ContactSectionComponent } from './section/contact-section/contact-section.component';

const imports = [
  AppRoutingModule,
  SharedModule,
  BrowserModule,
  BrowserAnimationsModule,
  CoreModule,
];

@NgModule({
  declarations: [
    AppComponent,
    // pages
    HomePageComponent,
    ProfilePageComponent,
    ContactPageComponent,
    FaqPageComponent,
    NewsPageComponent,
    // sections
    AboutSectionComponent,
    LandingSectionComponent,
    NewsSectionComponent,
    FaqSectionComponent,
    ProfileSectionComponent,
    ContactSectionComponent,
  ],
  imports: [
    imports,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
