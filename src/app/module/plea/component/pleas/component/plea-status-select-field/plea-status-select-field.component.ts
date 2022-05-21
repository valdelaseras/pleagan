import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PLEA_STATUS } from '@shared/model';

@Component({
  selector: 'app-plea-status-select-field',
  templateUrl: './plea-status-select-field.component.html',
  styleUrls: ['./plea-status-select-field.component.scss']
})
export class PleaStatusSelectFieldComponent {
  @Input() control: FormControl;
  statuses = Object.values(PLEA_STATUS);
}
