import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { EMPTY, from, Observable, of } from 'rxjs';
import firebase from 'firebase/app';
import User = firebase.User;
import UserCredential = firebase.auth.UserCredential;
import { Router } from '@angular/router';
import { catchError, delay, map, mergeMap, switchMap, take, takeLast, tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { DisplayMessageService } from '../display-message/display-message.service';
import { LoadingIndicatorService } from '../loading-indicator/loading-indicator.service';
import { PleaganService } from '../pleagan/pleagan.service';
import { DisplayMessage } from '@shared/model';
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
    private fireAuth: AngularFireAuth,
    private router: Router,
    private pleaganService: PleaganService,
    private displayMessageService: DisplayMessageService,
    private loadingIndicatorService: LoadingIndicatorService
  ) {
    this.user$ = this.fireAuth.user;
  }

  signUp( email: string, password: string, displayName: string, country: string ): Observable<void> {
    this.displayMessageService.dismissAllDisplayMessages();
    this.loadingIndicatorService.showLoadingIndicator();
    return from(
      this.fireAuth.createUserWithEmailAndPassword( email, password )
    ).pipe(
      catchError( ( error: HttpErrorResponse ) => {
        this.loadingIndicatorService.hideLoadingIndicator();
        this.displayMessageService.addDisplayMessage( new DisplayMessage( error.message, 'warning' ) );
        return EMPTY;
      }),
      switchMap( ( userCredential: UserCredential ) => {
        return from(this.fireAuth.currentUser.then( async ( user: User | null ) => {
          const photoURL = '/assets/images/default-user.png';
          if ( user ) {
            await user.updateProfile({ displayName, photoURL });
          }
        }))
      }),
      switchMap(() => this.pleaganService.createPleagan( country )),
    );
  }

  login( email: string, password: string ): Observable<User> {
    this.displayMessageService.dismissAllDisplayMessages();
    this.loadingIndicatorService.showLoadingIndicator();
    return from(
      this.fireAuth.signInWithEmailAndPassword( email, password )
    ).pipe(
      tap( () => this.loadingIndicatorService.hideLoadingIndicator()),
      catchError( ( error: any ) => { // DIRTYYYY!!!
        this.loadingIndicatorService.hideLoadingIndicator();
        this.displayMessageService.addDisplayMessage( new DisplayMessage( this.formatErrorMessage( error['code'], error.message ), 'warning' ) );
        return EMPTY;
      }),
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
