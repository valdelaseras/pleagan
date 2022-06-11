import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from '@core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '@shared/shared.module';
// pages
import { HomePageComponent } from './component/page/home-page/home-page.component';
import { ProfilePageComponent } from './component/page/profile-page/profile-page.component';
import { ContactPageComponent } from './component/page/contact-page/contact-page.component';
import { FaqPageComponent } from './component/page/faq-page/faq-page.component';
import { NewsPageComponent } from './component/page/news-page/news-page.component';
// sections
import { LandingSectionComponent } from './component/section/landing-section/landing-section.component';
import { AboutSectionComponent } from './component/section/about-section/about-section.component';
import { NewsSectionComponent } from './component/section/news-section/news-section.component';
import { FaqSectionComponent } from './component/section/faq-section/faq-section.component';
import { ProfileSectionComponent } from './component/section/profile-section/profile-section.component';
import { ContactSectionComponent } from './component/section/contact-section/contact-section.component';
import { AboutPageComponent } from './component/page/about-page/about-page.component';
import { SimpleExplainerSectionComponent } from './component/section/simple-explainer-section/simple-explainer-section.component';

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
    AboutPageComponent,
    SimpleExplainerSectionComponent,
  ],
  imports: [
    imports,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
