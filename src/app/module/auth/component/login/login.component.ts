import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@core/service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  form = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    public authService: AuthService,
    private router: Router
  ) {}

  login( form: FormGroup ): void {
    this.authService.login( form.value.email, form.value.password ).subscribe(() => {
      this.resetForm();
      this.router.navigate(['/']);
    });
  };

  private resetForm = (): void => {
    this.form.reset();
  };
}
