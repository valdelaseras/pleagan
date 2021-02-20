import { Component, Input, OnInit } from '@angular/core';
import { Pleagan } from '../../model/pleagan';

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.scss']
})
export class CommentCardComponent implements OnInit {
  @Input() supporter: Pleagan;

  constructor() { }

  ngOnInit(): void {
  }

}
