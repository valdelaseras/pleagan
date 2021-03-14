import { Injectable } from '@angular/core';
import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoadingIndicatorService } from '@core/service';
import { takeLast, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoadingIndicatorInterceptor implements HttpInterceptor {
  constructor( private loadingIndicatorService: LoadingIndicatorService ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loadingIndicatorService.showLoadingIndicator();
    return next.handle(request)
      .pipe(
        takeLast( 1 ),
        tap(() => this.loadingIndicatorService.hideLoadingIndicator() )
      )
  }
}

export const LoadingIndicatorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: LoadingIndicatorInterceptor,
  multi: true,
};
