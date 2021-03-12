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
        break;
      }
      case '/user/profile': {
        // displayName instead would be cooler
        return 'profile';
        break;
      }
      case '/user/settings': {
        return 'settings';
        break;
      }
      case '/plea/initiated': {
        return 'my pleas';
        break;
      }
      case '/plea/supported': {
        return 'my supported pleas';
        break;
      }
      case '/user/my-news': {
        return 'my news';
        break;
      }
      case '/plea/all': {
        return 'all pleas';
        break;
      }
      case '/hall-of-fame/all': {
        return 'hall of fame';
        break;
      }
      case '/statistics': {
        return 'statistics';
        break;
      }
      case '/news/all': {
        return 'news';
        break;
      }
      case '/faq': {
        return 'faq';
        break;
      }
      case '/contact': {
        return 'contact';
        break;
      }
      case '/plea/new': {
        return 'initiate plea';
        break;
      }
      case '/about': {
        return 'about';
        break;
      }
      default: {
        return '';
        break;
      }
    }
  }
}
