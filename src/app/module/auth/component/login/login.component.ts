import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@core/service';
import { HTTP_LOADING_STATUS } from '@shared/model/http-loading-wrapper/http-loading-wrapper.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginStatus: HTTP_LOADING_STATUS;
  form = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    public authService: AuthService,
    private router: Router
  ) {}

  login( form: FormGroup ): void {
    this.loginStatus = HTTP_LOADING_STATUS.LOADING;
    this.authService.login( form.value.email, form.value.password ).subscribe(() => {
      this.loginStatus = HTTP_LOADING_STATUS.FINISHED;
      this.resetForm();
      this.router.navigate(['/']);
    });
  }

  private resetForm = (): void => {
    this.form.reset();
  }
}
