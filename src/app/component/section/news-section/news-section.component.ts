import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-news-section',
  templateUrl: './news-section.component.html',
  styleUrls: ['./news-section.component.scss']
})
export class NewsSectionComponent implements OnInit {
  query: string;
  constructor() {}

  ngOnInit(): void {}
  updateQuery(query: string): void {
    this.query = query;
  }
}
