import { Component, Input } from '@angular/core';
import { Plea } from '../../../model/plea';

@Component({
  selector: 'app-haf-card',
  templateUrl: './haf-card.component.html',
  styleUrls: ['./haf-card.component.scss'],
})
export class HafCardComponent {
  @Input() plea!: Plea;
}
