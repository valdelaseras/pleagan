import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth/auth.service';
import { EMPTY, Observable, Subject } from 'rxjs';
import { catchError, mergeMap, tap } from 'rxjs/operators';
import { Pleagan } from '../../model/pleagan';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  error?: string;
  loading = false;
  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  loginClick$: Subject<FormGroup> = new Subject<FormGroup>();

  constructor(public authService: AuthService, private router: Router) {
    this.loginClick$
      .pipe(
        tap(() => this.setLoading(true)),
        mergeMap(this.login),
        tap(() => {
          this.setLoading(false);
          this.resetForm();
          this.router.navigate(['/']);
        }),
      )
      .subscribe();
  }

  login = (form: FormGroup): Observable<Pleagan> => {
    return this.authService.login(form.value.email, form.value.password).pipe(
      catchError((error: Error) => {
        this.error = error.message;
        this.setLoading(false);
        return EMPTY;
      }),
    );
  };

  private setLoading = (state: boolean): void => {
    this.loading = state;
  };

  private resetForm = (): void => {
    this.error = undefined;
    this.loginForm.reset();
  };
}
