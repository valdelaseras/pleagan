import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  form = new FormGroup({
    email: new FormControl('', Validators.required),
    displayName: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength( 6 )]),
    confirmPassword: new FormControl('', Validators.compose( [ Validators.required, Validators.minLength( 6 ), this.passwordsMatch.bind( this ) ] ) ),
  });

  redirect = () => setTimeout(() => this.router.navigate(['/']), 5000);

  constructor(public authService: AuthService, private router: Router) {}

  private passwordsMatch( fieldControl: FormControl ): null | { nomatch: boolean } {

    return this.form && fieldControl.value === this.form.get('password')!.value ? null : {
      nomatch: true
    };
  }

  submit(form: FormGroup): void {
    const { email, password, displayName } = form.value;
    this.authService.signUp(email, password, displayName).subscribe( this.redirect );
  }
}
