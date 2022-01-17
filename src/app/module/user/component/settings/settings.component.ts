import { Component } from '@angular/core';
import { AuthService, CountryService, DeviceService, PleaganService } from '../../../core/service';
import { GetCurrentPleaganDto, GetDeviceDto, THEME } from '@shared/model';
import { concat, forkJoin, Observable, of } from 'rxjs';
import firebase from 'firebase/app';
import { filterNullOrUndefined } from '@shared/operator';
import { map, shareReplay, tap } from 'rxjs/operators';
import { HTTP_LOADING_STATUS, HttpLoadingWrapper } from '@shared/model/http-loading-wrapper/http-loading-wrapper.model';
import { AngularFireMessaging } from '@angular/fire/messaging';
import User = firebase.User;
import { NotificationService } from '@core/service/notification/notification.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  themes = THEME;
  userRequest$: Observable<HttpLoadingWrapper<{auth: User, pleagan: GetCurrentPleaganDto}>>;
  updateStatus: HTTP_LOADING_STATUS;
  countries = CountryService.countries;
  token$: Observable<string>;
  notificationPermission = Notification.permission;
  device$: Observable<GetDeviceDto | undefined>;
  isKnownDevice = false;

  constructor(
    private authService: AuthService,
    private fireMessaging: AngularFireMessaging,
    private pleaganService: PleaganService,
    private notificationService: NotificationService
  ) {
    this.token$ = this.fireMessaging.getToken.pipe(
      filterNullOrUndefined()
    );

    this.userRequest$ = this.getUser();
    this.device$ = this.getDevice();
  }

  private getUser(): Observable<HttpLoadingWrapper<{auth: User, pleagan: GetCurrentPleaganDto}>> {
    return concat(
      of( new HttpLoadingWrapper<{auth: User, pleagan: GetCurrentPleaganDto}>() ),
      forkJoin( {
        auth: this.authService.getUser(),
        pleagan: this.pleaganService.getCurrentPleagan()
      }).pipe(
        map( ( user: { auth: User, pleagan: GetCurrentPleaganDto }) => (new HttpLoadingWrapper<{auth: User, pleagan: GetCurrentPleaganDto}>( user )) )
      )
    );
  }

  private getDevice(): Observable<GetDeviceDto | undefined> {
    return this.userRequest$.pipe(
      map( ( { value }: HttpLoadingWrapper<{auth: User, pleagan: GetCurrentPleaganDto}> ) => {
        return value?.pleagan?.devices.find( ( device: GetDeviceDto ) => device.uuid === DeviceService.UUID )
      }),
      tap( ( result: GetDeviceDto | undefined ) => this.isKnownDevice = !!result ),
      shareReplay()
    );
  }

  saveUserSettings( user: { auth: User, pleagan: GetCurrentPleaganDto } ): void {
    this.updateStatus = HTTP_LOADING_STATUS.LOADING;
    // @TODO
    // this.pleaganService.updatePleagan( user.pleagan ).subscribe(() => this.updateStatus = HTTP_LOADING_STATUS.FINISHED );
  }

  onAllowNotifications( value: boolean ): void{
    if ( value ) {
      // @FIXME
      // this.notificationService.requestPushNotificationPermission().subscribe(( device: GetDeviceDto ) => {
      //   this.userRequest$ = this.getUser();
      //   this.device$ = this.getDevice();
      // });
    } else {
      this.removePushNotificationPermission();
    }
  }

  requestPushNotificationPermission(): void {
    // @FIXME
    // this.notificationService.requestPushNotificationPermission().subscribe();
  }

  removePushNotificationPermission(): void {
    // this.notificationService.removePushNotificationPermission();
  }

  confirmDeletion(): void {
    alert('Are you sure you want to delete your account?');
  }
}
