import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../service/auth/auth.service';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import firebase from 'firebase/app';

@Injectable()
export class IsLoggedIn implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.user$.pipe(
      map((user: firebase.User | null) => user !== null),
      tap((loggedIn: boolean) => !loggedIn && this.router.navigate(['/', 'login'])),
    );
  }
}
