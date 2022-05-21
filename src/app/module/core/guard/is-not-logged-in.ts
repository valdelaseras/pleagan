import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import firebase from 'firebase/app';
import User = firebase.User;
import { AuthService } from '../service';

@Injectable({
  providedIn: 'root'
})
export class IsNotLoggedIn implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.currentUser.pipe(
      map((user: User | null) => user === null),
      tap((loggedOut: boolean) => !loggedOut && this.router.navigate(['/'])),
    );
  }
}
