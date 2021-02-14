import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './component/app/app.component';
import { HomeComponent } from './component/home/home.component';
import { PleaComponent } from './component/plea/plea.component';
import { AboutComponent } from './component/about/about.component';
import { NewPleaComponent } from './component/plea/children/new-plea/new-plea.component';
import { PleasListComponent } from './component/plea/children/pleas-list/pleas-list.component';
import { PleaDetailsComponent } from './component/plea/children/plea-details/plea-details.component';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavComponent } from './component/nav/nav.component';
import { ModalSuccessComponent } from './component/modals/modal-success/modal-success.component';
import { PleaCardComponent } from './component/plea/plea-card/plea-card.component';
import { PleaService } from './service/plea/plea.service';
import { ModalComponent } from './component/modals/modal/modal.component';
import { FaqComponent } from './component/faq/faq.component';
import { NewsComponent } from './component/news/news.component';
import { LeaderboardComponent } from './component/leaderboard/leaderboard.component';
import { HallOfFameComponent } from './component/hall-of-fame/hall-of-fame.component';
import { ContactComponent } from './component/contact/contact.component';
import { SupportPleaComponent } from './component/plea/children/support-plea/support-plea.component';
import { SearchBoxComponent } from './component/search-box/search-box.component';
import { HafCardComponent } from './component/hall-of-fame/haf-card/haf-card.component';
import { NewsCardComponent } from './component/news/news-card/news-card.component';
import { HttpClientModule } from '@angular/common/http';
import { SpecialThanksComponent } from './component/special-thanks/special-thanks.component';
import { CardListComponent } from './component/hall-of-fame/children/card-list/card-list.component';
import { DetailsComponent } from './component/hall-of-fame/children/details/details.component';
import { NewsListComponent } from './component/news/children/news-list/news-list.component';
import { HeaderComponent } from './component/header/header.component';
import { SearchPipe } from './pipe/search/search.pipe';
import { SortByLikelihoodPipe } from './pipe/sort-by-likelihood/sort-by-likelihood.pipe';
import { SuggestionListComponent } from './component/suggestion-list/suggestion-list.component';
import { LoadingIndicatorComponent } from './component/loading-indicator/loading-indicator.component';
import { LoginComponent } from './component/login/login.component';

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
    SuggestionListComponent,
    SearchPipe,
    SortByLikelihoodPipe,
    LoadingIndicatorComponent,
    LoginComponent,
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
