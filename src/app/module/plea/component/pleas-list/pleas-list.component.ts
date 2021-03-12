import { Component, HostListener, Input } from '@angular/core';
import { PLEA_STATUS } from 'pleagan-model';
import { FADE_IN_LIST } from '@shared/animations';
import { Plea } from '@shared/model';

@Component({
  selector: 'app-pleas-list',
  templateUrl: './pleas-list.component.html',
  styleUrls: ['./pleas-list.component.scss'],
  animations: [FADE_IN_LIST],
})
export class PleasListComponent {
  mobileScreen = this.isMobileScreen();
  @Input() pleas: Plea[];
  PLEA_STATUS = PLEA_STATUS;
  constructor() {}

  @HostListener('window:resize', ['$event'])
  handleResize(event: UIEvent): void {
    this.mobileScreen = this.isMobileScreen();
  }

  private isMobileScreen(): boolean {
    return window.innerWidth <= 768;
  }
}
