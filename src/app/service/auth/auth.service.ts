import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { from, Observable, of } from 'rxjs';
import firebase from 'firebase/app';
import UserCredential = firebase.auth.UserCredential;
import { Router } from '@angular/router';
import { delay, map, mergeMap, shareReplay, switchMap } from 'rxjs/operators';
import { JsonConvertService } from '../json-convert/json-convert.service';
import { Pleagan } from '../../model/pleagan';
import { PleaganService } from '../pleagan/pleagan.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<Pleagan | null>;
  get idToken$() {
    return this.fireAuth.idToken;
  }

  constructor(
    private fireAuth: AngularFireAuth,
    private router: Router,
    private convertService: JsonConvertService,
    private pleaganService: PleaganService,
  ) {
    this.user$ = this.fireAuth.authState.pipe(
      switchMap((user: firebase.User | null) => {
        if (user !== null) {
          return this.pleaganService.getCurrentPleagan();
        } else {
          return of(null);
        }
      }),
      shareReplay(),
    );
  }

  signUp(email: string, password: string, displayName: string): Observable<Pleagan> {
    return from(this.fireAuth.createUserWithEmailAndPassword(email, password)).pipe(
      map((userCredential: UserCredential) => this.convertService.parse(userCredential.user, Pleagan)),
      mergeMap((pleagan: Pleagan) => this.pleaganService.createPleagan(pleagan, displayName)),
    );
  }

  login(email: string, password: string): Observable<Pleagan> {
    return from(this.fireAuth.signInWithEmailAndPassword(email, password)).pipe(
      map((userCredential: UserCredential) => this.convertService.parse(userCredential.user, Pleagan)),
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
