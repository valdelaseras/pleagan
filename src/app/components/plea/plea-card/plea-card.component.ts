import { Component, Input } from '@angular/core';
import { Plea } from '../../../model/plea';
import { PLEA_TARGET } from 'pleagan-model';

@Component({
  selector: 'app-plea-card',
  templateUrl: './plea-card.component.html',
  styleUrls: ['./plea-card.component.scss'],
})
export class PleaCardComponent {
  @Input() plea!: Plea;
  constructor() {}

  getTarget(): number {
    if (this.plea.supporters.length < PLEA_TARGET.FIRST) {
      return PLEA_TARGET.FIRST;
    } else if (this.plea.supporters.length >= PLEA_TARGET.FIRST && this.plea.supporters.length < PLEA_TARGET.SECOND) {
      return PLEA_TARGET.SECOND;
    } else {
      return PLEA_TARGET.THIRD;
    }
  }
}
