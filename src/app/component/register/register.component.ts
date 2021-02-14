import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm = new FormGroup( {
    email: new FormControl('', Validators.required ),
    username: new FormControl('', Validators.required ),
    password: new FormControl('', Validators.required ),
    confirmPassword: new FormControl('', Validators.required )
  });
  submit(): void {
    console.log('create account');
  }
}
