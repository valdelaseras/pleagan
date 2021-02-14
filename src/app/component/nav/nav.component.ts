import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  largeScreen = this.isLargeScreen();
  collapsed = true;
  constructor() {}
  @HostListener('window:resize', ['$event'])
  handleResize(event: UIEvent): void {
    this.largeScreen = this.isLargeScreen();
  }
  private isLargeScreen(): boolean {
    return window.innerWidth > 768;
  }
}
