import { Component, OnDestroy, OnInit } from '@angular/core';
import { PleasDataSource } from './pleas.data-source';
import { PleaService } from '@core/service';
import { PleaFilterService } from '../../../../service/plea-filter.service';
import { FormControl } from '@angular/forms';
import { debounce, tap } from 'rxjs/operators';
import { interval } from 'rxjs';

@Component({
  selector: 'app-pleas-container',
  templateUrl: './pleas-container.component.html',
  styleUrls: ['./pleas-container.component.scss'],
})
export class PleasContainerComponent implements OnInit {
  search = new FormControl();
  dataSource: PleasDataSource;

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

    this.dataSource = new PleasDataSource(
      this.pleaService,
      this.filterService.filterOptions
    );
  }
}
