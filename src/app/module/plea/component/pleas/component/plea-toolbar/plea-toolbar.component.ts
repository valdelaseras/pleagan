import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-plea-toolbar',
  templateUrl: './plea-toolbar.component.html',
  styleUrls: ['./plea-toolbar.component.scss']
})
export class PleaToolbarComponent {
  @Input() searchControl: FormControl;
  @Input() statusControl: FormControl;
  @Input() myPleasControl: FormControl;
  @Input() supportedPleasControl: FormControl;
}
