import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { PleaService } from '@core/service';
import { HTTP_LOADING_STATUS } from '@shared/model/http-loading-wrapper/http-loading-wrapper.model';
import { tap } from 'rxjs/operators';
import { GetPleaDto } from '@shared/model';

@Component({
  selector: 'app-my-pleas',
  templateUrl: './my-pleas.component.html',
  styleUrls: ['./my-pleas.component.scss'],
})
export class MyPleasComponent {
  pleas$: Observable<GetPleaDto[]>;
  pleaStatus: HTTP_LOADING_STATUS = HTTP_LOADING_STATUS.LOADING;
  constructor( private pleaService: PleaService ) {
    this.pleas$ = this.pleaService.getMyPleas().pipe(
      tap( _ => this.pleaStatus = HTTP_LOADING_STATUS.FINISHED )
    );
  }
}
