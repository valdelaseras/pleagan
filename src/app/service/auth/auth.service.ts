import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { from, Observable, of } from 'rxjs';
import firebase from 'firebase/app';
import UserCredential = firebase.auth.UserCredential;
import { Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { JsonConvertService } from '../json-convert/json-convert.service';
import { Pleagan } from '../../model/pleagan';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User | null>;

  constructor(
    private fireAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router,
    private convertService: JsonConvertService
  ) {
    this.user$ = fireAuth.authState;
  }

  signUp(email: string, password: string): Observable<Pleagan> {
    return from(
      this.fireAuth.createUserWithEmailAndPassword(email, password)
    ).pipe(
      map( ( userCredential: UserCredential ) => this.convertService.parse( userCredential.user, Pleagan ) )
    )
  }

  login(email: string, password: string): Observable<UserCredential> {
    return from(
      this.fireAuth.signInWithEmailAndPassword(email, password)
    )
  }

  logout(): Observable<void> {
    return from(
      this.fireAuth.signOut()
    )
  }
}
