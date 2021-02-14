import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-indicator',
  templateUrl: './loading-indicator.component.html',
  styleUrls: ['./loading-indicator.component.scss'],
})
export class LoadingIndicatorComponent implements OnInit {
  @Input() size: 'sm' | 'md' | 'lg' = 'lg';

  constructor() {}

  ngOnInit(): void {}
}
