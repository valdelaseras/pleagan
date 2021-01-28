import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-suggestion-list',
  templateUrl: './suggestion-list.component.html',
  styleUrls: [ './suggestion-list.component.scss' ]
})
export class SuggestionListComponent {
  @Input() list: string[];
  @Input() query: string;
  @Input()
  set visible( newValue: boolean ) {
    if ( newValue ) {
      this.setListVisibility( newValue );
    } else {
      this.setListVisibility( newValue );
    }
  }
  @Output() entrySelected: EventEmitter<string> = new EventEmitter<string>();
  showList = false;

  setListVisibility( visible: boolean, delay: number = 0 ) {
    setTimeout(() => {
      this.showList = visible;
    }, delay)
  }

  updateSelectedEntry( entry: string ): void {
    this.entrySelected.emit( entry );
    this.showList = false;
  }
}
