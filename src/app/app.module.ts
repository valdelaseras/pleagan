// TODO: order and group all this nicely
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './component/app/app.component';
import { HomeComponent } from './component/home/home.component';
import { PleaComponent } from './component/plea/plea.component';
import { AboutComponent } from './component/about/about.component';
import { NewPleaComponent } from './component/plea/new-plea/new-plea.component';
import { AllPleasComponent } from './component/plea/all-pleas/all-pleas.component';
import { PleaDetailsComponent } from './component/plea/plea-details/plea-details.component';
import { ClarityModule } from '@clr/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavComponent } from './component/nav/nav.component';
import { PleaCardComponent } from './component/plea/children/plea-card/plea-card.component';
import { PleaService } from './service/plea/plea.service';
import { FaqComponent } from './component/faq/faq.component';
import { NewsComponent } from './component/news/news.component';
import { StatisticsComponent } from './component/statistics/statistics.component';
import { HallOfFameComponent } from './component/hall-of-fame/hall-of-fame.component';
import { ContactComponent } from './component/contact/contact.component';
import { SearchBoxComponent } from './component/search-box/search-box.component';
import { HafCardComponent } from './component/plea/children/haf-card/haf-card.component';
import { NewsCardComponent } from './component/news/news-card/news-card.component';
import { HttpClientModule } from '@angular/common/http';
import { CompliedPleasComponent } from './component/hall-of-fame/children/complied-pleas/complied-pleas.component';
import { DetailsComponent } from './component/hall-of-fame/children/details/details.component';
import { NewsListComponent } from './component/news/children/news-list/news-list.component';
import { HeaderComponent } from './component/header/header.component';
import { SearchPipe } from './pipe/search/search.pipe';
import { SortByLikelihoodPipe } from './pipe/sort-by-likelihood/sort-by-likelihood.pipe';
import { SuggestionListComponent } from './component/suggestion-list/suggestion-list.component';
import { LoadingIndicatorComponent } from './component/loading-indicator/loading-indicator.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { MyProfileComponent } from './component/profile/my-profile.component';
import { MyPleasComponent } from './component/profile/children/my-pleas/my-pleas.component';
import { MySupportComponent } from './component/profile/children/my-support/my-support.component';
import { MyNewsComponent } from './component/profile/children/my-news/my-news.component';
import { MySettingsComponent } from './component/profile/children/my-settings/my-settings.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AuthService } from './service/auth/auth.service';
import { IsLoggedIn } from './guard/is-logged-in';
import { IsNotLoggedIn } from './guard/is-not-logged-in';
import { SupportersListComponent } from './component/plea/children/supporters-list/supporters-list.component';
import { CommentCardComponent } from './component/comment-card/comment-card.component';
import { AuthorizationInterceptorProvider } from './interceptor/authorization/authorization.interceptor';
import { FabButtonComponent } from './component/fab-button/fab-button.component';
import { PleasListComponent } from './component/plea/children/pleas-list/pleas-list.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { PleaSupportButtonComponent } from './component/plea/children/plea-support-button/plea-support-button.component';
import { HttpErrorInterceptorProvider } from './interceptor/http-error/http-error.interceptor';
import { CompanyService } from './service/company/company.service';
import { DisplayMessageService } from './service/display-message/display-message.service';
import { FirebaseStorageService } from './service/firebase-storage/firebase-storage.service';
import { PleaganService } from './service/pleagan/pleagan.service';
import { ProductService } from './service/product/product.service';
import { MessageDisplayComponent } from './component/message-display/message-display.component';
import { DismissMessagesInterceptorProvider } from './interceptor/http-success/dismiss-messages.interceptor';

const declarations = [
  AppComponent,
  HomeComponent,
  PleaComponent,
  AboutComponent,
  NewPleaComponent,
  AllPleasComponent,
  PleaDetailsComponent,
  NavComponent,
  PleaCardComponent,
  FaqComponent,
  NewsComponent,
  StatisticsComponent,
  HallOfFameComponent,
  ContactComponent,
  SearchBoxComponent,
  HafCardComponent,
  NewsCardComponent,
  CompliedPleasComponent,
  DetailsComponent,
  NewsListComponent,
  HeaderComponent,
  SuggestionListComponent,
  SearchPipe,
  SortByLikelihoodPipe,
  LoadingIndicatorComponent,
  LoginComponent,
  RegisterComponent,
  MyProfileComponent,
  MyPleasComponent,
  MySupportComponent,
  MyNewsComponent,
  MySettingsComponent,
  SupportersListComponent,
  CommentCardComponent,
  FabButtonComponent,
  PleasListComponent,
  MessageDisplayComponent,
  PleaSupportButtonComponent,
];

const imports = [
  BrowserModule,
  AngularFireModule.initializeApp(environment.firebase),
  AngularFireAuthModule,
  AppRoutingModule,
  ClarityModule,
  BrowserAnimationsModule,
  ReactiveFormsModule,
  HttpClientModule,
  FormsModule,
  NgxEchartsModule.forRoot({ echarts: () => import('echarts') }),
];

const services = [
  AuthService,
  CompanyService,
  DisplayMessageService,
  FirebaseStorageService,
  PleaService,
  PleaganService,
  ProductService,
];

const routeGuards = [
  IsLoggedIn,
  IsNotLoggedIn
];

const interceptorsProviders = [
  AuthorizationInterceptorProvider,
  HttpErrorInterceptorProvider,
  DismissMessagesInterceptorProvider,
];

const providers = [
  ...services,
  ...routeGuards,
  ...interceptorsProviders
];

@NgModule({
  declarations,
  imports,
  providers,
  bootstrap: [AppComponent],
})
export class AppModule {}
