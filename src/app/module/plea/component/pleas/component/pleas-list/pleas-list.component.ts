import { Component, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { FADE_IN_LIST, FADE_IN_SINGLE } from '@shared/animations';
import { PLEA_STATUS } from '@shared/model';
import { PleaListItem, AllPleasDataSource } from '../all-pleas-container/all-pleas.data-source';
import { Observable } from 'rxjs';
import { PleaFilterService } from '../../../../service/plea-filter.service';

@Component({
  selector: 'app-pleas-list',
  templateUrl: './pleas-list.component.html',
  styleUrls: ['./pleas-list.component.scss'],
  animations: [FADE_IN_LIST, FADE_IN_SINGLE],
})
export class PleasListComponent implements OnInit, OnDestroy {
  @Input() dataSource: AllPleasDataSource;

  screenSize: 'small' | 'large' | 'xl' = this.getScreenSize();
  PLEA_STATUS = PLEA_STATUS;
  pleas: Observable<PleaListItem[]>

  @HostListener('window:resize', ['$event'])
  handleResize(event: UIEvent): void {
    this.screenSize = this.getScreenSize();
  }

  constructor ( private filterService: PleaFilterService ) {}

  ngOnInit(): void {
    this.pleas = this.dataSource.connect();
  }

  ngOnDestroy(): void {
    this.dataSource.unsubscribe.next();
    this.dataSource.unsubscribe.complete();

    this.filterService.reset();
  }

  // todo: move out of pleas-list.component
  private getScreenSize(): 'small' | 'large' | 'xl' {
    if ( window.innerWidth <= 768 ) {
      return 'small';
    } else if ( window.innerWidth > 768 && window.innerWidth < 1440 ) {
      return 'large';
    } else {
      return 'xl';
    }
  }
}
