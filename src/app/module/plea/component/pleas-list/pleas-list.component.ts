import { Component, HostListener, Input } from '@angular/core';
import { FADE_IN_LIST } from '@shared/animations';
import { GetPleaDto, PLEA_STATUS } from '@shared/model';

@Component({
  selector: 'app-pleas-list',
  templateUrl: './pleas-list.component.html',
  styleUrls: ['./pleas-list.component.scss'],
  animations: [FADE_IN_LIST],
})
export class PleasListComponent {
  screenSize: 'small' | 'large' | 'xl' = this.getScreenSize();
  @Input() pleas: GetPleaDto[];
  PLEA_STATUS = PLEA_STATUS;
  constructor() {}

  @HostListener('window:resize', ['$event'])
  handleResize(event: UIEvent): void {
    this.screenSize = this.getScreenSize();
  }

  private getScreenSize(): 'small' | 'large' | 'xl' {
    if ( window.innerWidth <= 768 ) {
      return 'small';
    } else if ( window.innerWidth > 768 && window.innerWidth < 1440 ) {
      return 'large';
    } else {
      return 'xl';
    }
  }
}
