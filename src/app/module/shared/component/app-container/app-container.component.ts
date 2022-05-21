import { Component, OnInit } from '@angular/core';
import { RouterOutlet} from '@angular/router';
import { FADE_IN_OUT_SINGLE, ROUTING_ANIMATIONS } from '../../animations';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { AuthService, NotificationService } from '@core/service';
import firebase from 'firebase/app';
import User = firebase.User;
import { Observable } from 'rxjs';
import { filterNullOrUndefined } from '@shared/operator';
import { Notification as _Notification } from '@shared/model';

@Component({
  selector: 'app-container',
  templateUrl: './app-container.component.html',
  styleUrls: ['./app-container.component.scss'],
  animations: [
    ROUTING_ANIMATIONS,
    FADE_IN_OUT_SINGLE
  ]
})
export class AppContainerComponent implements OnInit {
  user$: Observable<User>;

  constructor(
    private authService: AuthService,
    private fireMessaging: AngularFireMessaging,
    private displayMessageService: NotificationService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.user$ = this.authService.currentUser.pipe(
      filterNullOrUndefined()
    );

    this.initialiseNotifications();
  }

  prepareRoute( outlet: RouterOutlet ): boolean {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }

  private initialiseNotifications() {
    if ( Notification.permission == "granted" ) {
      this.fireMessaging.messages.subscribe(
        ( message) => {
          // display a toast or something
          const payload = message as { notification: { title: string, body: string } };
          const msg = `${ payload.notification.title }: ${ payload.notification.body }`;
          console.log( JSON.stringify(message) );
          this.displayMessageService.addNotification( new _Notification( msg, 'info' ) );
        });
    } else if ( Notification.permission !== "denied" ) {
      // setTimeout( () => {
      //   this.notificationService.requestPushNotificationPermission().subscribe(() => {
      //     this.initialiseNotifications();
      //   });
      // }, 3000 );
    }
  }
}
