import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { from, Observable } from 'rxjs';
import firebase from 'firebase/app';
import User = firebase.User;
import UserCredential = firebase.auth.UserCredential;
import { Router } from '@angular/router';
import { delay, map, mergeMap, switchMap, take, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from '../notification/notification.service';
import { PleaganService } from '../pleagan/pleagan.service';
import { filterNullOrUndefined } from '@shared/operator';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User | null>;

  get idToken$(): Observable<string | null> {
    return this.fireAuth.idToken;
  }

  constructor(
    private http: HttpClient,
    private fireAuth: AngularFireAuth,
    private router: Router,
    private pleaganService: PleaganService,
    private displayMessageService: NotificationService,
  ) {
    this.user$ = this.fireAuth.user;
  }

  signUp( email: string, password: string, displayName: string, country: string ): Observable<void> {
    this.displayMessageService.dismissAllNotifications();
    return from(
      this.fireAuth.createUserWithEmailAndPassword( email, password )
    ).pipe(
      switchMap( ( userCredential: UserCredential ) => {
        return from(this.fireAuth.currentUser.then( async ( user: User | null ) => {
          const photoURL = `https://ui-avatars.com/api/?name=${ displayName }&size=120&background=random`;
          if ( user ) {
            await user.updateProfile({ displayName, photoURL });
          }
        }))
      }),
      switchMap(() => this.pleaganService.createPleagan( country )),
    );
  }

  login( email: string, password: string ): Observable<User> {
    this.displayMessageService.dismissAllNotifications();
    return from(
      this.fireAuth.signInWithEmailAndPassword( email, password )
    ).pipe(
      map( ( userCredential: UserCredential ) => userCredential.user! )
    );
  }

  logout(): Observable<boolean> {
    return from(this.fireAuth.signOut()).pipe(
      delay(100),
      mergeMap((_) => {
        return this.router.navigate(['/', 'login']);
      }),
    );
  }

  getUser(): Observable<User> {
    return this.user$.pipe(
      take( 1 ),
      filterNullOrUndefined(),
    );
  }

  private formatErrorMessage( code: String, message: string ): string {
    switch( code ) {
      case 'auth/user-not-found':
        return 'There is no account corresponding to this email address. The account may have been deleted.';
      case 'auth/invalid-email':
        return 'Make sure you entered a valid email address.';
      default:
        return message;
    }
  }
}
