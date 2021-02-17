import { Component, HostListener } from '@angular/core';
import { AuthService } from '../../service/auth/auth.service';
import {onLoggedInDirective} from '../../directives/on-logged-in.directive';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  largeScreen = this.isLargeScreen();
  collapsed = true;

  constructor( public authService: AuthService ) {}

  @HostListener('window:resize', ['$event'])
  handleResize(event: UIEvent): void {
    this.largeScreen = this.isLargeScreen();
  }

  private isLargeScreen(): boolean {
    return window.innerWidth > 768;
  }

  // TODO: onLoggedInDirective needs to be triggered again right after logout
  logout(): void {
    this.authService.logout();
  }
}
