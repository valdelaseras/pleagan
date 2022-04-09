import {Component, OnInit} from '@angular/core';
import {interval, Observable} from 'rxjs';
import { PleaService } from '@core/service';
import {debounce, tap} from 'rxjs/operators';
import {FormControl} from '@angular/forms';
import {PleaFilterService} from '../../../../service/plea-filter.service';
import {MyPleasDataSource} from './my-pleas.data-source';

@Component({
  selector: 'app-my-pleas-container',
  templateUrl: './my-pleas-container.component.html',
  styleUrls: ['./my-pleas-container.component.scss'],
})
export class MyPleasContainerComponent implements OnInit {
  search = new FormControl();
  dataSource: MyPleasDataSource;

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

    this.dataSource = new MyPleasDataSource(
      this.pleaService,
      this.filterService.filterOptions
    );
  }
}
