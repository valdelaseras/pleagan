import { Component, Input, OnInit } from '@angular/core';
import { LoadingIndicatorService } from '../../service/loading-indicator/loading-indicator.service';
import { Observable } from 'rxjs';
import { FADE_IN_SINGLE } from '../../animations';

@Component({
  selector: 'app-loading-indicator',
  templateUrl: './loading-indicator.component.html',
  styleUrls: ['./loading-indicator.component.scss'],
  animations: [
    FADE_IN_SINGLE
  ]
})
export class LoadingIndicatorComponent implements OnInit {
  @Input() height?: number;

  show$: Observable<boolean>;

  constructor( private loadingIndicatorService: LoadingIndicatorService ) {}

  ngOnInit(): void {
    this.show$ = this.loadingIndicatorService.showLoadingIndicator$;
  }
}
