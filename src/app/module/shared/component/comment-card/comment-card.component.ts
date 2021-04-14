import { Component, Input, OnInit } from '@angular/core';
import { Support } from '../../model/plea/support.model';

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.scss'],
})
export class CommentCardComponent {
  @Input() support: Support;
  @Input() isOwner: boolean;
  edit = false;

  constructor() {}

  editComment() {
    this.edit = true;
  }
}
