import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  @Input() imageUrl = 'assets/icons/instagram.svg';
  @Input() socialUrl = '/';
  @Input() socialAlt = 'Instagram logo';
  constructor() {}

  ngOnInit(): void {}
}
