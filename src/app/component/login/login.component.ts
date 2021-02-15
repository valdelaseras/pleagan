import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth/auth.service';
import { merge, Observable, Subject } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import firebase from 'firebase';
import UserCredential = firebase.auth.UserCredential;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loading = false;
  loginForm = new FormGroup( {
    email: new FormControl('', Validators.required ),
    password: new FormControl('', Validators.required )
  });

  login$: Subject<FormGroup> = new Subject<FormGroup>();
  logout$: Subject<void> = new Subject<void>();

  constructor( public authService: AuthService ) {
    const actions = merge(
      this.login$.pipe(
        tap( () => this.setLoading( true ) ),
        switchMap( this.login ),
      ),
      this.logout$.pipe(
        tap( () => this.setLoading( true ) ),
        switchMap( this.logout ),
      )
    ).pipe(
      tap( () => {
        this.setLoading( false );
        this.resetForm()
      })
    );
    actions.subscribe();
  }

  private setLoading = ( state: boolean ): void => {
    this.loading = state;
  };

  private resetForm = (): void => {
    this.loginForm.get('email')?.setValue('');
    this.loginForm.get('password')?.setValue('');
  };

  // signup( form: FormGroup ): Observable<UserCredential> {
  //   return this.authService.signup( form.value.email, form.value.password );
  // }

  login = ( form: FormGroup ): Observable<UserCredential> => {
    return this.authService.login( form.value.email, form.value.password );
  };

  logout = (): Observable<void> => {
    return this.authService.logout();
  }
}
