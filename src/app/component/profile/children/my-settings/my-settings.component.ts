import { Component } from '@angular/core';
import { AuthService } from '../../../../service/auth/auth.service';

@Component({
  selector: 'app-my-settings',
  templateUrl: './my-settings.component.html',
  styleUrls: ['./my-settings.component.scss'],
})
export class MySettingsComponent  {
  constructor( public authService: AuthService ) {}
}
