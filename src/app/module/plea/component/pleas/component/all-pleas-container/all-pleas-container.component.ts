import { Component, OnDestroy, OnInit } from '@angular/core';
import { AllPleasDataSource } from './all-pleas.data-source';
import { AuthService, PleaService } from '@core/service';
import { PleaFilterService } from '../../../../service/plea-filter.service';
import { FormControl } from '@angular/forms';
import { debounce, filter, startWith, tap } from 'rxjs/operators';
import { combineLatest, interval } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PLEA_STATUS } from '@shared/model';
import { tapOnce } from '@shared/operator';

@Component({
  selector: 'app-all-pleas-container',
  templateUrl: './all-pleas-container.component.html',
  styleUrls: ['./all-pleas-container.component.scss'],
})
export class AllPleasContainerComponent implements OnInit, OnDestroy {
  searchControl = new FormControl();
  statusControl = new FormControl();
  myPleasControl = new FormControl();
  supportedPleasControl = new FormControl();
  dataSource: AllPleasDataSource;
  statuses = Object.values(PLEA_STATUS);

  constructor(
    private pleaService: PleaService,
    private filterService: PleaFilterService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
  ) {
    route.queryParams.pipe(
      tapOnce( ( params: Params ) => {
        this.myPleasControl.setValue( !!params.pleagan );
        this.supportedPleasControl.setValue( params.supported );
        this.statusControl.setValue( !params.status ? null : params.status );
      }),
      tap( ( params: Params ) => {

        filterService.filterOptions.next({
          ...this.filterService.filterOptions.value,
          pleagan: params.pleagan,
          status: params.status,
          supported: params.supported
        })
      })
    ).subscribe();
  }

  ngOnInit(): void {
    this.dataSource = new AllPleasDataSource(
      this.pleaService,
      this.filterService.filterOptions,
    );

    this.initFilters();
  }

  ngOnDestroy(): void {
    this.filterService.reset();
  }

  initFilters(): void {
    this.searchControl.valueChanges.pipe(
      debounce(() => interval(1000)),                 // Wait 1s before updating filters
      tap( ( search ) => this.filterService.filterOptions.next( {
        ...this.filterService.filterOptions.value,                        // Pass in the current filters
        search                                                            // and update the searchControl property
      }) )
    ).subscribe();

    combineLatest([
      this.statusControl.valueChanges.pipe(startWith( this.statusControl.value )),
      this.myPleasControl.valueChanges.pipe(startWith( this.myPleasControl.value )),
      this.supportedPleasControl.valueChanges.pipe(startWith( this.supportedPleasControl.value )),
      this.authService.currentUser
    ]).pipe(
      tap( ( [ status, myPleas, supported, currentUser ] ) => {
        const queryParams: { [ key: string ]: string } = {};
        if ( status ) {
          queryParams.status = status;
        }
        if ( myPleas ) {
          queryParams.pleagan = currentUser.displayName!;
        }
        if ( supported ) {
          queryParams.supported = supported;
        }

        this.router.navigate( [], { queryParams });
      })
    ).subscribe();
  }
}
