import { Injectable } from '@angular/core';
import {
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DisplayMessageService } from '../../service/display-message/display-message.service';
import { DisplayMessageLevel, DisplayMessage } from '../../model/display-message/display-message.model';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor( private displayMessageService: DisplayMessageService ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError(( error: HttpErrorResponse ) => {
          this.displayMessageService.addDisplayMessage( new DisplayMessage( error.error.message || error.statusText, this.resolveDisplayMessageLevel( error.status ) ) );
          return EMPTY;
        })
      )
  }

  resolveDisplayMessageLevel( statusCode: number ): DisplayMessageLevel {
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
