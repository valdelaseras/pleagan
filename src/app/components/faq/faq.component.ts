import { Component, OnInit } from '@angular/core';
import { PLEA_TARGET } from 'pleagan-model';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
})
export class FaqComponent implements OnInit {
  PLEA_TARGET = PLEA_TARGET;
  constructor() {}

  ngOnInit(): void {}
}
