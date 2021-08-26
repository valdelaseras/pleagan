import { Component, HostListener } from '@angular/core';
import { AuthService } from '../../../core/service/auth/auth.service';
import { PleaganService } from '@core/service';
import { Observable } from 'rxjs';
import { GetCurrentPleaganDto } from '@shared/model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  largeScreen = this.isLargeScreen();
  collapsed = !this.isLargeScreen();
  numberOfUnopenedMessages$: Observable<number>;
  private pleagan$: Observable<GetCurrentPleaganDto>;


  constructor( public authService: AuthService,
               private pleaganService: PleaganService ) {
    this.pleagan$ = pleaganService.getCurrentPleagan();
    // @TODO: get number of unopened messages by implementing inbox/message services
    // this.numberOfUnopenedMessages$ = this.pleagan$.pipe(
    //   map( ( pleagan: GetCurrentPleaganDto ) => pleagan.inbox.messages.filter( ( message: Message ) => !message.opened ).length )
    // )
  }

  @HostListener( 'window:resize', ['$event'] )
  handleResize( event: UIEvent ): void {
    this.largeScreen = this.isLargeScreen();
  }

  private isLargeScreen(): boolean {
    return window.innerWidth > 768;
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
