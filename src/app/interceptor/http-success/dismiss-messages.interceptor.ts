import { Injectable } from '@angular/core';
import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { DisplayMessageService } from '../../service/display-message/display-message.service';

@Injectable()
export class DismissMessagesInterceptor implements HttpInterceptor {
  constructor( private displayMessageService: DisplayMessageService ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.displayMessageService.dismissAllDisplayMessages();
    return next.handle(request);
  }
}

export const DismissMessagesInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: DismissMessagesInterceptor,
  multi: true,
};
