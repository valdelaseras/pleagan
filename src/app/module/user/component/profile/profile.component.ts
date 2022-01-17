import { Component } from '@angular/core';
import { AuthService } from '../../../core/service/auth/auth.service';
import { PleaService } from '@core/service';
import { PleaganService } from '@core/service';
import { Observable } from 'rxjs';
import {Plea, Pleagan} from '@shared/model';
import { HTTP_LOADING_STATUS } from '@shared/model/http-loading-wrapper/http-loading-wrapper.model';
import {map, shareReplay, tap} from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  profilePictureImgSrc = '/assets/images/dolphin.jpg';
  pleas$: Observable<Plea[]>;
  supportedPleas$: Observable<Plea[]>;
  numberOfInitiatedPleas$: Observable<number>;
  numberOfSupportedPleas$: Observable<number>;

  pleaStatus: HTTP_LOADING_STATUS = HTTP_LOADING_STATUS.LOADING;

  constructor( public authService: AuthService, public pleaService: PleaService, public pleaganService: PleaganService ) {
    this.authService.getUser();
    this.pleas$ = this.pleaService.getMyPleas().pipe(
      tap( _ => this.pleaStatus = HTTP_LOADING_STATUS.FINISHED )
    );
    this.supportedPleas$ = this.pleaService.getPleasISupport().pipe(
      tap( _ => this.pleaStatus = HTTP_LOADING_STATUS.FINISHED )
    );
    this.numberOfInitiatedPleas$ = this.pleas$.pipe(
      map( pleas => pleas.length ),
    );
    this.numberOfSupportedPleas$ = this.supportedPleas$.pipe(
      map( pleas => pleas.length ),
    );
  }
}
