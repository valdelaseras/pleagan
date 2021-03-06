import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-fab-button',
  templateUrl: './fab-button.component.html',
  styleUrls: ['./fab-button.component.scss'],
})
export class FabButtonComponent {
  @Input() mobileOnly: boolean = false;
  @Input() desktopOnly: boolean = false;
  @Input() fillBackground: boolean = false;
  @Input() ariaLabel: string = '';
  @Input() routerLink: string[] = [''];
}
