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
      case '/profile/settings': {
        return 'settings';
        break;
      }
      case '/profile/my-pleas': {
        return 'my pleas';
        break;
      }
      case '/profile/my-support': {
        return 'my supported pleas';
        break;
      }
      case '/profile/my-news': {
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
