import { Component } from '@angular/core';
import { AuthService, PleaganService } from '../../../core/service';
import { Pleagan } from '@shared/model';
import { concat, forkJoin, Observable, of } from 'rxjs';
import firebase from 'firebase/app';
import { THEME } from 'pleagan-model';
import { map, tap } from 'rxjs/operators';
import { HTTP_LOADING_STATUS, HttpLoadingWrapper } from '@shared/model/http-loading-wrapper/http-loading-wrapper.model';
import User = firebase.User;

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  themes = THEME;
  userRequest$: Observable<HttpLoadingWrapper<{auth: User, pleagan: Pleagan}>>;
  updateStatus: HTTP_LOADING_STATUS;

  constructor(
    private authService: AuthService,
    private pleaganService: PleaganService
  ) {
    this.userRequest$ = concat(
      of( new HttpLoadingWrapper<{auth: User, pleagan: Pleagan}>() ),
      forkJoin( {
        auth: this.authService.getUser(),
        pleagan: this.pleaganService.getCurrentPleagan()
      }).pipe(
        map( ( user: { auth: User, pleagan: Pleagan }) => (new HttpLoadingWrapper<{auth: User, pleagan: Pleagan}>( user )) )
      )
    );
  }

  saveUserSettings( user: { auth: User, pleagan: Pleagan } ): void {
    this.updateStatus = HTTP_LOADING_STATUS.LOADING;
    this.pleaganService.updatePleagan( user.pleagan ).subscribe(() => this.updateStatus = HTTP_LOADING_STATUS.FINISHED);
  }

  confirmDeletion(): void {
    alert('Are you sure you want to delete your account?');
  }
}
