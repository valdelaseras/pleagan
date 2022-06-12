import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-simple-explainer-section',
  templateUrl: './simple-explainer-section.component.html',
  styleUrls: ['./simple-explainer-section.component.scss']
})
export class SimpleExplainerSectionComponent implements OnInit {
  isExpanded = false;
  constructor() {}

  ngOnInit(): void {
  }
}
