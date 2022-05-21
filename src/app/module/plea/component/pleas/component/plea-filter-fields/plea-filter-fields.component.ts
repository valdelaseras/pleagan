import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthService } from '@core/service';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import firebase from 'firebase/app';

@Component({
  selector: 'app-plea-filter-fields',
  templateUrl: './plea-filter-fields.component.html',
  styleUrls: ['./plea-filter-fields.component.scss']
})
export class PleaFilterFieldsComponent implements OnInit {
  @Input() statusControl: FormControl;
  @Input() myPleasControl: FormControl;
  @Input() supportedPleasControl: FormControl;

  showMyPleasFilter: Observable<boolean>;

  constructor(
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.showMyPleasFilter = this.authService.currentUser.pipe(
      map( ( currentUser: firebase.User | null ) => !!currentUser )
    );

    this.myPleasControl.valueChanges.pipe(
      filter( Boolean ),
      tap( () => this.supportedPleasControl.setValue( false ) )
    ).subscribe();

    this.supportedPleasControl.valueChanges.pipe(
      filter( Boolean ),
      tap( () => this.myPleasControl.setValue( false ) )
    ).subscribe();
  }
}
