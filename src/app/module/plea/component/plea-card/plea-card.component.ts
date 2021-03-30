import { Component, Input } from '@angular/core';
import { Plea, PLEA_TARGET } from '@shared/model';

@Component({
  selector: 'app-plea-card',
  templateUrl: './plea-card.component.html',
  styleUrls: ['./plea-card.component.scss'],
})
export class PleaCardComponent {
  @Input() plea!: Plea;
  // TODO: check if plea is supported by user, then display some indicator on card. A bg color perhaps

  constructor() {}

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
