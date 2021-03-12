import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { AuthService } from '../../service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.idToken$.pipe(
      take(1),
      switchMap((idToken) => {
        let clone = request.clone();
        if (idToken) {
          clone = clone.clone({ headers: request.headers.set('Authorization', `Bearer ${idToken}`) });
        }
        return next.handle(clone);
      }),
    );
  }
}

export const AuthorizationInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthorizationInterceptor,
  multi: true,
};
