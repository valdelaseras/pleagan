import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../service/auth/auth.service';
import { EMPTY, Observable } from 'rxjs';
import { Pleagan } from '../../../../model/pleagan';
import { filter, map } from 'rxjs/operators';
import { THEME } from 'pleagan-model/dist/model/pleagan/settings/user-settings.interface';

@Component({
  selector: 'app-my-settings',
  templateUrl: './my-settings.component.html',
  styleUrls: ['./my-settings.component.scss'],
})
export class MySettingsComponent implements OnInit {
  user$: Observable<Pleagan | undefined>;
  theme = THEME;

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    // TODO: temporary
    this.user$ = this.authService.user$.pipe(
      filter((user: Pleagan | null) => user !== null),
      map((user: Pleagan | null) => {
        if (user) {
          user.settings = {
            theme: THEME.DEFAULT,
            notifications: {
              push: {
                enabled: true,
                myPleas: {
                  onThreshold: false,
                  onCompliance: false,
                },
                supportedPleas: {
                  onThreshold: false,
                  onCompliance: false,
                },
                otherPleas: {
                  onNew: false,
                  onLocation: false,
                },
                news: false,
              },
              email: {
                enabled: false,
                myPleas: {
                  onThreshold: false,
                  onCompliance: false,
                },
                supportedPleas: {
                  onThreshold: false,
                  onCompliance: false,
                },
                otherPleas: {
                  onNew: false,
                  onLocation: false,
                },
                news: false,
              },
            },
          };
          return user;
        }
        return undefined;
      }),
    );
  }

  confirmDeletion(): void {
    alert('Are you sure you want to delete your account?');
  }
}
