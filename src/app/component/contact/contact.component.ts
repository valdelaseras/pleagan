import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  icons = [
    { imageUrl: 'assets/icons/instagram.svg', socialUrl: '/', socialAlt: 'Instagram logo' },
    { imageUrl: 'assets/icons/facebook.svg', socialUrl: '/', socialAlt: 'Facebook logo' }
  ]

  constructor() {}
}
