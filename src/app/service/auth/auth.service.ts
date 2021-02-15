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
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User | null>;

  constructor(
    private fireAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router
  ) {
    this.user$ = fireAuth.authState;
  }

  signup(email: string, password: string): Observable<UserCredential> {
    return from(
      this.fireAuth.createUserWithEmailAndPassword(email, password)
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
