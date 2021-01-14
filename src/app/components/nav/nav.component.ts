import { Component } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  constructor() {}
  resolveCurrentPage(): string {
    const currentPage = window.location.pathname;
    switch ( currentPage ){
      case '/': {
        return 'home';
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
        return 'about us';
        break;
      }
      default: {
        return '';
        break;
      }
    }
  }
}
