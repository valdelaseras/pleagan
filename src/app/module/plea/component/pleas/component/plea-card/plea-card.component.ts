import {Component, Input} from '@angular/core';
import {PLEA_TARGET} from '@shared/model';
import { PleaListItem } from '../all-pleas-container/all-pleas.data-source';

@Component({
  selector: 'app-plea-card',
  templateUrl: './plea-card.component.html',
  styleUrls: ['./plea-card.component.scss'],
})
export class PleaCardComponent {
  @Input() plea!: PleaListItem;
  getTarget(): number {
    if (this.plea.numberOfSupports < PLEA_TARGET.FIRST) {
      return PLEA_TARGET.FIRST;
    } else if (this.plea.numberOfSupports >= PLEA_TARGET.FIRST && this.plea.numberOfSupports < PLEA_TARGET.SECOND) {
      return PLEA_TARGET.SECOND;
    } else {
      return PLEA_TARGET.THIRD;
    }
  }
}
