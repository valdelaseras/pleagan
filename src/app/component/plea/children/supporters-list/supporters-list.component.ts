import { Component, Input, OnInit } from '@angular/core';
import { Pleagan } from '../../../../model/pleagan';

@Component({
  selector: 'app-supporters-list',
  templateUrl: './supporters-list.component.html',
  styleUrls: ['./supporters-list.component.scss']
})
export class SupportersListComponent implements OnInit {
  @Input() supporters: Pleagan[];

  constructor() { }

  ngOnInit(): void {
  }

}
