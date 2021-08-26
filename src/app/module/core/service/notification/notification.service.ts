import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, shareReplay, switchMap } from 'rxjs/operators';
// import { Event, NavigationEnd, Router } from '@angular/router';
import { Notification } from '@shared/model/notification/notification.model';
import { filterNullOrUndefined } from '@shared/operator';
import { PleaganService } from '../pleagan/pleagan.service';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { GetDeviceDto } from '@shared/model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notifications: Notification[] = [];
  private _notifications$: BehaviorSubject<Notification[]> = new BehaviorSubject<Notification[]>( this.notifications );

  get notifications$(): Observable<Notification[]> {
    return this._notifications$.asObservable().pipe(
      map( ( notifications: Notification[] ) => notifications.filter( ( notification: Notification ) => !notification.dismissed ) ),
      shareReplay()
    );
  }

  constructor(
    // private router: Router,
    private pleaganService: PleaganService,
    private fireMessaging: AngularFireMessaging
  ) {
    // @todo maybe we don't want that
    // router.events.subscribe( ( event: Event ) => {
    //   if ( event instanceof NavigationEnd ) {
    //     this.dismissAllNotifications();
    //   }
    // })
  }

  // @TODO: use device service
  // requestPushNotificationPermission(): Observable<GetDeviceDto> {
  //   return this.fireMessaging.requestToken.pipe(
  //     filterNullOrUndefined(),
  //     catchError( ( error: any ) => {
  //       console.log( error );
  //       return throwError( error );
  //     } ),
  //     switchMap( ( token ) => this.pleaganService.addDevice( token ) )
  //   )
  // }

  dismissNotification( notification: Notification ): void {
    const dismissedNotification = this.notifications[ this.notifications.findIndex( ( _notification: Notification ) => _notification.message === notification.message ) ];

    if ( dismissedNotification ) {
      dismissedNotification.dismissed = true;
    }

    this._notifications$.next( this.notifications );
  }

  dismissAllNotifications(): void {
    for ( const notification of this.notifications ) {
      notification.dismissed = true;
    }

    this._notifications$.next( this.notifications );
  }

  addNotification( notification: Notification ): void {
    this.notifications.push( notification );
    this._notifications$.next( this.notifications );
  }
}
