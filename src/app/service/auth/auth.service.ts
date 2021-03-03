import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { from, Observable } from 'rxjs';
import firebase from 'firebase/app';
import UserCredential = firebase.auth.UserCredential;
import { Router } from '@angular/router';
import { delay, map, mergeMap, shareReplay, switchMap } from 'rxjs/operators';
import { PleaganService } from '../pleagan/pleagan.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<firebase.User | null>;

  get idToken$() {
    return this.fireAuth.idToken;
  }

  constructor(private fireAuth: AngularFireAuth, private router: Router, private pleaganService: PleaganService) {
    this.user$ = this.fireAuth.authState;
  }

  signUp(email: string, password: string, displayName: string): Observable<void> {
    return from(this.fireAuth.createUserWithEmailAndPassword(email, password)).pipe(
      switchMap((userCredential: UserCredential) => {
        return from(
          this.fireAuth.currentUser.then(async (user: firebase.User | null) => {
            const photoURL = '/assets/images/default-user.png';
            if (user) {
              await user.updateProfile({ displayName, photoURL });
            }
          }),
        );
      }),
      switchMap(() => this.pleaganService.createPleagan()),
    );
  }

  login(email: string, password: string): Observable<firebase.User> {
    return from(this.fireAuth.signInWithEmailAndPassword(email, password)).pipe(
      map((userCredential: UserCredential) => userCredential.user!),
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
