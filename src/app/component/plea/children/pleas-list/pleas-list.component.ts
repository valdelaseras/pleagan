import { Component, Input } from '@angular/core';
import { Plea } from '../../../../model/plea';
import { FADE_IN_LIST } from '../../../../animations';
import { PLEA_STATUS } from 'pleagan-model';

@Component({
  selector: 'app-pleas-list',
  templateUrl: './pleas-list.component.html',
  styleUrls: ['./pleas-list.component.scss'],
  animations: [FADE_IN_LIST],
})
export class PleasListComponent {
  @Input() pleas: Plea[];
  PLEA_STATUS = PLEA_STATUS;
  constructor() { }
}
