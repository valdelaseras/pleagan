import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { AuthService, PleaService } from '@core/service';
import { map, shareReplay, tap, withLatestFrom } from 'rxjs/operators';
import firebase from 'firebase/app';
import User = firebase.User;
import { filterNullOrUndefined } from '@shared/operator';
import { GetPleaDto, GetSupportDto } from '@shared/model';

@Component({
  selector: 'app-submission-details',
  templateUrl: './plea-details.component.html',
  styleUrls: ['./plea-details.component.scss']
})
export class PleaDetailsComponent implements OnInit {
  // Modals
  reportModalIsOpen = false;
  retractSupportModalIsOpen = false;

  retractReason: string = 'already-exists';

  plea: Observable<GetPleaDto>;
  pleaganUid$: Observable<string>;
  userIsInitiator: Observable<boolean>;
  userHasSupported$: Observable<boolean>;
  // Select elements in modals
  reportReason: string = 'inappropriate-content';

  private pleaganAndPlea$: Observable<[User | null, GetPleaDto]>;

  constructor(
    private route: ActivatedRoute,
    private pleaService: PleaService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.plea = this.route.data.pipe(
      map( ( data: Data ) => data.plea ),
      tap(console.log)
    );

    this.userIsInitiator = this.plea.pipe(
      withLatestFrom( this.authService.currentUser ),
      map( ( [ plea, currentUser ] ) => plea.pleagan.displayName === currentUser.displayName )
    );
  }

  // submitReport() {
  //   console.log('submit');
  //   // TODO: signUp with reason value and plea id
  //   this.reportModalIsOpen = false;
  // }
  // retractSupport(): void {
  //   console.log('retract support');
  //   // remove comment
  //   // adjust count
  //   this.retractSupportModalIsOpen = false;
  // }

  // refreshPlea(): void {
    // perform request for data
    // this.plea$ = this.pleaService.getById( parseInt( this.route.snapshot.paramMap.get('pleaId')! ) );

    // this.pleaganUid$ = this.authService.currentUser.pipe(
    //   filterNullOrUndefined(),
    //   map( ( user: User ) => user.uid )
    // );
    //
    // // combine plea and authorised user into a single observable
    // this.pleaganAndPlea$ = combineLatest( [
    //   this.authService.currentUser,
    //   this.plea$
    // ]).pipe(
    //   shareReplay()
    // );
    //
    // // emits `true` when the currently logged in user is also the initiator for this plea
    // this.userIsInitiator$ = this.pleaganAndPlea$.pipe(
    //   map( ( [ pleagan, plea] ) => pleagan !== null && pleagan.uid === plea.pleagan!.uid ),
    //   shareReplay()
    // );
    //
    // // emits `true` when the currently logged in user has supported this plea
    // this.userHasSupported$ = this.pleaganAndPlea$.pipe(
    //   map( ( [ pleagan, plea] ) => pleagan !== null && this.userInSupports( pleagan.uid, plea.supports! ) ),
    //   shareReplay()
    // );
  // }

  // private userInSupports( uid: string, supports: GetSupportDto[]): boolean {
  //   return !!supports.find( ( support: GetSupportDto ) => support.pleagan.uid === uid );
  // }
}
