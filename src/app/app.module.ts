import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { HomeComponent } from './components/home/home.component';
import { PleaComponent } from './components/plea/plea.component';
import { AboutComponent } from './components/about/about.component';
import { NewPleaComponent } from './components/plea/children/new-plea/new-plea.component';
import { PleasListComponent } from './components/plea/children/pleas-list/pleas-list.component';
import { PleaDetailsComponent } from './components/plea/children/plea-details/plea-details.component';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavComponent } from './components/nav/nav.component';
import { ModalSuccessComponent } from './components/modals/modal-success/modal-success.component';
import { PleaCardComponent } from './components/plea/plea-card/plea-card.component';
import { PleaService } from './services/plea.service';
import { ModalComponent } from './components/modals/modal/modal.component';
import { FaqComponent } from './components/faq/faq.component';
import { NewsComponent } from './components/news/news.component';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';
import { HallOfFameComponent } from './components/hall-of-fame/hall-of-fame.component';
import { ContactComponent } from './components/contact/contact.component';
import { SupportPleaComponent } from './components/plea/children/support-plea/support-plea.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { HafCardComponent } from './components/hall-of-fame/haf-card/haf-card.component';
import { NewsCardComponent } from './components/news/news-card/news-card.component';
import { HttpClientModule } from '@angular/common/http';
import { SpecialThanksComponent } from './components/special-thanks/special-thanks.component';
import { CardListComponent } from './components/hall-of-fame/children/card-list/card-list.component';
import { DetailsComponent } from './components/hall-of-fame/children/details/details.component';
import { NewsListComponent } from './components/news/children/news-list/news-list.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PleaComponent,
    AboutComponent,
    NewPleaComponent,
    PleasListComponent,
    PleaDetailsComponent,
    NavComponent,
    ModalSuccessComponent,
    PleaCardComponent,
    ModalComponent,
    FaqComponent,
    NewsComponent,
    LeaderboardComponent,
    HallOfFameComponent,
    ContactComponent,
    SupportPleaComponent,
    SearchBoxComponent,
    HafCardComponent,
    NewsCardComponent,
    SpecialThanksComponent,
    CardListComponent,
    DetailsComponent,
    NewsListComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClarityModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [PleaService],
  bootstrap: [AppComponent],
})
export class AppModule {}
