import { Component, Input } from '@angular/core';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';

@Component({
  selector: 'app-loading-indicator',
  templateUrl: './loading-indicator.component.html',
  styleUrls: ['./loading-indicator.component.scss'],
  animations: [
    fadeInOnEnterAnimation({anchor: 'enter'}),
    fadeOutOnLeaveAnimation({anchor: 'leave'}),
  ]
})
export class LoadingIndicatorComponent {
  @Input() label?: string;
}
