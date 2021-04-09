import { Component, Input } from '@angular/core';
import { FADE_IN_SINGLE } from '../../animations';
import { HTTP_LOADING_STATUS } from '@shared/model/http-loading-wrapper/http-loading-wrapper.model';

@Component({
  selector: 'app-loading-indicator',
  templateUrl: './loading-indicator.component.html',
  styleUrls: ['./loading-indicator.component.scss'],
  animations: [
    FADE_IN_SINGLE
  ]
})
export class LoadingIndicatorComponent {
  @Input() height?: string;
  @Input() httpStatus: HTTP_LOADING_STATUS;

  HTTP_LOADING_STATUS = HTTP_LOADING_STATUS;
}
