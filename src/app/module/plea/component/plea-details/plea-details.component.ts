import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { SWIPE_IN_BELOW_SWIPE_OUT_TOP } from '@shared/animations';
import { AuthService, PleaService } from '@core/service';
import { Plea, Pleagan, Support } from '@shared/model';
import { map, shareReplay } from 'rxjs/operators';
import firebase from 'firebase/app';
import User = firebase.User;
import { filterNullOrUndefined } from '@shared/operator';

@Component({
  selector: 'app-submission-details',
  templateUrl: './plea-details.component.html',
  styleUrls: ['./plea-details.component.scss'],
  animations: [SWIPE_IN_BELOW_SWIPE_OUT_TOP],
})
export class PleaDetailsComponent {
  // Modals
  reportModalIsOpen = false;
  retractSupportModalIsOpen = false;

  retractReason: string = 'already-exists';

  plea$: Observable<Plea>;
  pleaganUid$: Observable<string>;
  userIsInitiator$: Observable<boolean>;
  userHasSupported$: Observable<boolean>;
  // Select elements in modals
  reportReason: string = 'inappropriate-content';

  private pleaganAndPlea$: Observable<[User | null, Plea]>;

  constructor(
    private route: ActivatedRoute,
    private pleaService: PleaService,
    private authService: AuthService
  ) {
    this.refreshPlea();
  }
  submitReport() {
    console.log('submit');
    // TODO: signUp with reason value and plea id
    this.reportModalIsOpen = false;
  }
  retractSupport(): void {
    console.log('retract support');
    // remove comment
    // adjust count
    this.retractSupportModalIsOpen = false;
  }

  refreshPlea(): void {
    // perform request for data
    this.plea$ = this.pleaService.getPleaById( parseInt( this.route.snapshot.paramMap.get('pleaId')! ) );

    this.pleaganUid$ = this.authService.user$.pipe(
      filterNullOrUndefined(),
      map( ( user: User ) => user.uid )
    );

    // combine plea and authorised user into a single observable
    this.pleaganAndPlea$ = combineLatest( [
      this.authService.user$,
      this.plea$
    ]).pipe(
      shareReplay()
    );

    // emits `true` when the currently logged in user is also the initiator for this plea
    this.userIsInitiator$ = this.pleaganAndPlea$.pipe(
      map( ( [ pleagan, plea] ) => pleagan !== null && pleagan.uid === plea.pleagan!.uid ),
      shareReplay()
    );

    // emits `true` when the currently logged in user has supported this plea
    this.userHasSupported$ = this.pleaganAndPlea$.pipe(
      map( ( [ pleagan, plea] ) => pleagan !== null && this.userInSupports( pleagan.uid, plea.supports! ) ),
      shareReplay()
    );
  }

  private userInSupports( uid: string, supports: Support[]): boolean {
    return !!supports.find( ( support: Support ) => support.pleagan.uid === uid );
  }
}
