import { Component, Input } from '@angular/core';
import { Plea } from '../../../models/plea/plea.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plea-card',
  templateUrl: './plea-card.component.html',
  styleUrls: ['./plea-card.component.scss'],
})
export class PleaCardComponent {
  @Input() plea!: Plea;
  constructor(private router: Router) {}

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

// TEMPORARY PLEA TARGETS ENUM @TODO: REFACTOR
export enum PLEA_TARGET {
  FIRST = 1000,
  SECOND = 2000,
  THIRD = 3000,
}
