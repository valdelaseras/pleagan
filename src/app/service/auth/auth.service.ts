import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { EMPTY, from, Observable } from 'rxjs';
import firebase from 'firebase/app';
import UserCredential = firebase.auth.UserCredential;
import { Router } from '@angular/router';
import { catchError, delay, map, mergeMap, switchMap } from 'rxjs/operators';
import { PleaganService } from '../pleagan/pleagan.service';
import { DisplayMessageService } from '../display-message/display-message.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DisplayMessage } from '../../model/display-message/display-message.model';

@Injectable()
export class AuthService {
  user$: Observable<firebase.User | null>;

  get idToken$() {
    return this.fireAuth.idToken;
  }

  constructor(
    private fireAuth: AngularFireAuth,
    private router: Router,
    private pleaganService: PleaganService,
    private displayMessageService: DisplayMessageService
  ) {
    this.user$ = this.fireAuth.authState;
  }

  signUp( email: string, password: string, displayName: string ): Observable<void> {
    this.displayMessageService.dismissAllDisplayMessages();
    return from(
      this.fireAuth.createUserWithEmailAndPassword( email, password )
    ).pipe(
      catchError( ( error: HttpErrorResponse ) => {
        this.displayMessageService.addDisplayMessage( new DisplayMessage( error.message, 'warning' ) );
        return EMPTY;
      }),
      switchMap( ( userCredential: UserCredential ) => {
        return from(this.fireAuth.currentUser.then( async ( user: firebase.User | null ) => {
          const photoURL = '/assets/images/default-user.png';
          if ( user ) {
            await user.updateProfile({ displayName, photoURL });
          }
        }))
      }),
      switchMap( () => this.pleaganService.createPleagan() )
    );
  }

  login( email: string, password: string ): Observable<firebase.User> {
    this.displayMessageService.dismissAllDisplayMessages();
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
}
