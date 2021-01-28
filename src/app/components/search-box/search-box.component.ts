import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
})
export class SearchBoxComponent {
  @Output() queryUpdated: EventEmitter<string> = new EventEmitter<string>();
  constructor() {}
  updateQuery( event: any ): void {
    this.queryUpdated.emit( event.currentTarget.value );
  }
}
