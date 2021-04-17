import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, CountryService } from '@core/service';
import { HTTP_LOADING_STATUS } from '@shared/model/http-loading-wrapper/http-loading-wrapper.model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  signUpStatus: HTTP_LOADING_STATUS;
  form = new FormGroup({
    email: new FormControl('', Validators.required),
    displayName: new FormControl('', Validators.required),
    countryName: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength( 6 )]),
    confirmPassword: new FormControl('', Validators.compose( [ Validators.required, Validators.minLength( 6 ),
      this.passwordsMatch.bind( this ) ] ) ),
  });
  countries = CountryService.countries;

  constructor( public authService: AuthService, private router: Router ) {}

  private passwordsMatch( fieldControl: FormControl ): null | { nomatch: boolean } {
    return this.form && fieldControl.value === this.form.get( 'password' )!.value ? null : {
      nomatch: true
    };
  }

  signUp( form: FormGroup): void {
    const { email, password, displayName, countryName } = form.value;
    this.signUpStatus = HTTP_LOADING_STATUS.LOADING;
    this.authService.signUp( email, password, displayName, countryName ).subscribe(
      () => {
        this.router.navigate(['/'] );
      }, ( error ) => {
        this.signUpStatus = HTTP_LOADING_STATUS.FINISHED;
        form.controls[ 'displayName' ].setErrors( { 'duplicate': true } );
      } );
  }
}
