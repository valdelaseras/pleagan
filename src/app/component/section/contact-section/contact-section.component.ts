import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-section',
  templateUrl: './contact-section.component.html',
  styleUrls: ['./contact-section.component.scss']
})
export class ContactSectionComponent implements OnInit {
  icons = [
    { imageUrl: 'assets/icons/instagram.svg', socialUrl: '/', socialAlt: 'Instagram logo' },
    { imageUrl: 'assets/icons/facebook.svg', socialUrl: '/', socialAlt: 'Facebook logo' },
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
