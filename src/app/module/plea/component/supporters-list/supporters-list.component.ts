import { Component, Input, OnInit } from '@angular/core';
import { Support } from '@shared/model';

@Component({
  selector: 'app-supporters-list',
  templateUrl: './supporters-list.component.html',
  styleUrls: ['./supporters-list.component.scss'],
})
export class SupportersListComponent implements OnInit {
  @Input() supports: Support[];
  @Input() currentUserUid: string;

  constructor() {}

  ngOnInit(): void {}
}
