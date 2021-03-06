import { Component } from '@angular/core';
import { THEME } from 'pleagan-model/dist/model/pleagan/settings/user-settings.interface';
import { AuthService } from '../../../../service/auth/auth.service';

@Component({
  selector: 'app-my-settings',
  templateUrl: './my-settings.component.html',
  styleUrls: ['./my-settings.component.scss'],
})
export class MySettingsComponent {
  themes = THEME;
  // TODO: Temp, replace with actual settings
  theme = THEME.DEFAULT;
  pushEnabled: boolean = true;
  pushOnThreshold: boolean = true;
  pushOnCompliance: boolean = true;
  pushSupportedPleasOnThreshold: boolean = true;
  pushSupportedPleasOnCompliance: boolean = true;
  pushOtherPleasOnNew: boolean = false;
  pushOtherPleasOnLocation: boolean = true;
  emailEnabled: boolean = false;
  emailMyPleasOnThreshold: boolean = false;
  emailMyPleasOnCompliance: boolean = false;
  emailSupportedPleasOnThreshold: boolean = false;
  emailSupportedPleasOnCompliance: boolean = false;
  emailOtherPleasOnNew: boolean = false;
  emailOtherPleasOnLocation: boolean = false;

  constructor(public authService: AuthService) {}
  confirmDeletion(): void {
    alert('Are you sure you want to delete your account?');
  }
}
