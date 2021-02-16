import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import firebase from 'firebase/app';
import UserCredential = firebase.auth.UserCredential;
import { Router } from '@angular/router';
import { filter, map, tap } from 'rxjs/operators';
import { JsonConvertService } from '../json-convert/json-convert.service';
import { Pleagan } from '../../model/pleagan';
import { IPleagan } from 'pleagan-model';

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
    );
  }

  login(email: string, password: string): Observable<Pleagan> {
    return from(
      this.fireAuth.signInWithEmailAndPassword(email, password)
    ).pipe(
      map( ( userCredential: UserCredential ) => this.convertService.parse( userCredential.user, Pleagan ) )
    );
  }

  logout(): Observable<void> {
    return from(
      this.fireAuth.signOut()
    );
  }
}
