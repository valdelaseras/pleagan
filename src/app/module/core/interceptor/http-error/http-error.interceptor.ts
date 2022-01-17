import { Injectable } from '@angular/core';
import {
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotificationService } from '../../service';
import { NotificationLevel, Notification } from '@shared/model';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor( private notificationService: NotificationService ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError(( error: HttpErrorResponse ) => {
          this.notificationService.addNotification( new Notification( error.error.message || error.statusText, this.resolveDisplayMessageLevel( error.status ) ) );
          return throwError( error );
        })
      )
  }

  resolveDisplayMessageLevel( statusCode: number ): NotificationLevel {
    if ( statusCode >= 400 && statusCode < 500 ) {
      return 'warning';
    } else {
      return  'danger';
    }
  }
}

export const HttpErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: HttpErrorInterceptor,
  multi: true,
};
