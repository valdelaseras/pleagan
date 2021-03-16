import { Component } from '@angular/core';
import { AuthService, PleaganService } from '../../../core/service';
import { Pleagan } from '@shared/model';
import { forkJoin, Observable } from 'rxjs';
import firebase from 'firebase/app';
import User = firebase.User;
import { THEME } from 'pleagan-model';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  themes = THEME;
  user$: Observable<{auth: User, pleagan: Pleagan}>;

  constructor(
    public authService: AuthService,
    private pleaganService: PleaganService
  ) {
    this.user$ = forkJoin( {
      auth: this.authService.getUser(),
      pleagan: this.pleaganService.getCurrentPleagan()
    }).pipe(
      tap( console.log)
    );
  }

  saveUserSettings( user: { auth: User, pleagan: Pleagan } ): void {
    this.pleaganService.updatePleagan( user.pleagan ).subscribe();
  }

  confirmDeletion(): void {
    alert('Are you sure you want to delete your account?');
  }
}
