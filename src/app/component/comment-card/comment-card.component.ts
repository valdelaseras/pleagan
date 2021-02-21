import { Component, Input, OnInit } from '@angular/core';
import { Support } from '../../model/plea/support.model';

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.scss']
})
export class CommentCardComponent implements OnInit {
  @Input() support: Support;

  constructor() { }

  ngOnInit(): void {
  }

}
