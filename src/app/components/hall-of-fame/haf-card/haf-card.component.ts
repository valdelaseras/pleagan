import { Component, Input, OnInit } from '@angular/core';
import { Plea } from '../../../models/plea/plea.model';

@Component({
  selector: 'app-haf-card',
  templateUrl: './haf-card.component.html',
  styleUrls: ['./haf-card.component.scss'],
})
export class HafCardComponent implements OnInit {
  @Input() plea!: Plea;
  constructor() {}

  ngOnInit(): void {}
}
