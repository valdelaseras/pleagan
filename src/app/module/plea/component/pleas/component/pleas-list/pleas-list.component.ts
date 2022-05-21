import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { PleaListItem, AllPleasDataSource } from '../all-pleas-container/all-pleas.data-source';
import { Observable } from 'rxjs';
import {
  fadeInUpOnEnterAnimation
} from 'angular-animations';

@Component({
  selector: 'app-pleas-list',
  templateUrl: './pleas-list.component.html',
  styleUrls: ['./pleas-list.component.scss'],
  animations: [
    fadeInUpOnEnterAnimation({anchor: 'enter'}),
  ],
})
export class PleasListComponent implements OnInit, OnDestroy {
  @Input() dataSource: AllPleasDataSource;

  imagesLoaded: Observable<boolean>;
  pleas: Observable<PleaListItem[]>;

  ngOnInit(): void {
    this.pleas = this.dataSource.connect();
    this.dataSource.load();
  }

  ngOnDestroy(): void {
    this.dataSource.disconnect();
  }
}
