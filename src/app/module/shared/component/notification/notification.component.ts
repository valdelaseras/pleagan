import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { NotificationLevel, Notification } from '../../model/notification/notification.model';
import { map } from 'rxjs/operators';
import { FADE_IN_OUT_SHRINK_SINGLE, FADE_IN_OUT_SINGLE } from '../../animations';
import { NotificationService } from '@core/service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  animations: [
    FADE_IN_OUT_SINGLE,
    FADE_IN_OUT_SHRINK_SINGLE
  ]
})
export class NotificationComponent {
  @Input() notificationLevels: NotificationLevel[] = [
    'info',
    'success',
    'warning',
    'danger',
  ];
  notifications$: Observable<Notification[]>;

  constructor( private notificationService: NotificationService ) {
    this.notifications$ = notificationService.notifications$.pipe(
      map( this.filterNotifications )
    );
  }

  numberOfVisibleNotifications( messages: Notification[] ): number {
    return messages.map( ( notification: Notification ) => !notification.dismissed ).length
  }

  filterNotifications = ( notifications: Notification[] ): Notification[] => {
    return notifications.filter( ( notification: Notification ) => this.notificationLevels.includes( notification.level ) )
  };

  dismiss( notification: Notification ): void {
    notification.dismissed = true;
    setTimeout(() => {
      this.notificationService.dismissNotification( notification );
    }, 1000);
  }
}
