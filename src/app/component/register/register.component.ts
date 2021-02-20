import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth/auth.service';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Pleagan } from '../../model/pleagan';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  form = new FormGroup({
    email: new FormControl('', Validators.required),
    displayName: new FormControl( '', Validators.required ),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
  });

  redirect = () => setTimeout( () => this.router.navigate(['/']), 5000 );

  constructor( public authService: AuthService, private router: Router ) {}

  submit( form: FormGroup ): void {
    const { email, password, displayName } = form.value;
    this.authService.signUp( email, password, displayName ).subscribe( this.redirect );
  }
}
