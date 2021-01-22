import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
})
export class SearchBoxComponent {
  @Output() update: EventEmitter<string> = new EventEmitter<string>();
  query: string;
  constructor() {}
  searchQueryChanged(): void {
    this.update.emit(this.query);
  }
}
