import { Component, Input } from '@angular/core';
import { Plea } from '../../../model/plea';

// TODO:
// cards broken, fix and then fix styles as well
// add image to card
// add company tag like plea card
// or actually just use the same card maybe ;)
// add some lovable fun stuff like a ribbon or crown or hearts over company name tag

@Component({
  selector: 'app-haf-card',
  templateUrl: './haf-card.component.html',
  styleUrls: ['./haf-card.component.scss'],
})
export class HafCardComponent {
  @Input() plea!: Plea;
}
