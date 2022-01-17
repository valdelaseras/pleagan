import { Component, HostListener } from '@angular/core';
import { AuthService } from '../../../core/service/auth/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  largeScreen = this.isLargeScreen();

  constructor(public authService: AuthService) {}

  @HostListener('window:resize', ['$event'])
  handleResize(event: UIEvent): void {
    this.largeScreen = this.isLargeScreen();
  }

  private isLargeScreen(): boolean {
    return window.innerWidth > 1024;
  }

  // TODO: onLoggedInDirective needs to be triggered again right after logout
  logout(): void {
    this.authService.logout().subscribe();
  }

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
