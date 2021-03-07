import { Component } from '@angular/core';

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.scss'],
})
export class NewsCardComponent {
  title = 'Pleagan has launched!';
  date = '20/10/2021';
  subtitle = 'I really like dolphins';
  imageUrl = '/assets/icons/rocket.svg';
  content =
    'Pellentesque fringilla egestas urna, quis auctor nibh facilisis nec. Maecenas lorem nunc, porta sit amet condimentum.';
  constructor() {}
}
