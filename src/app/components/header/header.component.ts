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
      case '/plea/all': {
        return 'all pleas';
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
