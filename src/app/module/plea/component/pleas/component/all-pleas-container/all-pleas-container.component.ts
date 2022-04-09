import { Component, OnInit } from '@angular/core';
import { AllPleasDataSource } from './all-pleas.data-source';
import { PleaService } from '@core/service';
import { PleaFilterService } from '../../../../service/plea-filter.service';
import { FormControl } from '@angular/forms';
import { debounce, tap } from 'rxjs/operators';
import { interval } from 'rxjs';

@Component({
  selector: 'app-all-pleas-container',
  templateUrl: './all-pleas-container.component.html',
  styleUrls: ['./all-pleas-container.component.scss'],
})
export class AllPleasContainerComponent implements OnInit {
  search = new FormControl();
  dataSource: AllPleasDataSource;

  constructor(
    private pleaService: PleaService,
    private filterService: PleaFilterService
  ) {}

  ngOnInit(): void {
    this.search.valueChanges.pipe(
      debounce(() => interval(1000)),                 // Wait 1s before updating filters
      tap( ( search ) => this.filterService.filterOptions.next( {
        ...this.filterService.filterOptions.value,                        // Pass in the current filters
        search                                                            // and update the search property
      }) )
    ).subscribe();

    this.dataSource = new AllPleasDataSource(
      this.pleaService,
      this.filterService.filterOptions
    );
  }
}
