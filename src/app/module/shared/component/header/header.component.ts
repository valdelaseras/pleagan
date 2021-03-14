import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor() {}
  resolveCurrentPage(): string {
    const currentPage = window.location.pathname;
    switch (currentPage) {
      case '/': {
        return '';
      }
      case '/user/profile': {
        // displayName instead would be cooler
        return 'profile';
      }
      case '/user/settings': {
        return 'settings';
      }
      case '/plea/initiated': {
        return 'my pleas';
      }
      case '/plea/supported': {
        return 'my supported pleas';
      }
      case '/user/my-news': {
        return 'my news';
      }
      case '/plea/all': {
        return 'all pleas';
      }
      case '/hall-of-fame/all': {
        return 'hall of fame';
      }
      case '/statistics': {
        return 'statistics';
      }
      case '/news/all': {
        return 'news';
      }
      case '/faq': {
        return 'faq';
      }
      case '/contact': {
        return 'contact';
      }
      case '/plea/initiate': {
        return 'initiate plea';
      }
      case '/about': {
        return 'about';
      }
      default: {
        return '';
      }
    }
  }
}
