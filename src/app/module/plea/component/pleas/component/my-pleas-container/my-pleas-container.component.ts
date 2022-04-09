import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { PleaService } from '@core/service';
import { HTTP_LOADING_STATUS } from '@shared/model/http-loading-wrapper/http-loading-wrapper.model';
import { tap } from 'rxjs/operators';
import { GetPleaDto } from '@shared/model';

@Component({
  selector: 'app-my-pleas-container',
  templateUrl: './my-pleas-container.component.html',
  styleUrls: ['./my-pleas-container.component.scss'],
})
export class MyPleasContainerComponent {
  pleas$: Observable<GetPleaDto[]>;
  pleaStatus: HTTP_LOADING_STATUS = HTTP_LOADING_STATUS.LOADING;
  constructor( private pleaService: PleaService ) {
    this.pleas$ = this.pleaService.getMine().pipe(
      tap( _ => this.pleaStatus = HTTP_LOADING_STATUS.FINISHED )
    );
  }
}
