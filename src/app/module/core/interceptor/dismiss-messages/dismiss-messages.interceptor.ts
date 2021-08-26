import { Injectable } from '@angular/core';
import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { NotificationService } from '@core/service';

@Injectable({
  providedIn: 'root'
})
export class DismissMessagesInterceptor implements HttpInterceptor {
  constructor( private displayMessageService: NotificationService ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.displayMessageService.dismissAllNotifications();
    return next.handle(request);
  }
}

export const DismissMessagesInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: DismissMessagesInterceptor,
  multi: true,
};
