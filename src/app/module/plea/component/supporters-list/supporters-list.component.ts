import { Component, Input, OnInit } from '@angular/core';
import { GetSupportDto } from '@shared/model';

@Component({
  selector: 'app-supporters-list',
  templateUrl: './supporters-list.component.html',
  styleUrls: ['./supporters-list.component.scss'],
})
export class SupportersListComponent implements OnInit {
  @Input() supports: GetSupportDto[];
  @Input() currentUserUid: string;

  constructor() {}

  ngOnInit(): void {}
}
