import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { GROW_IN_SHRINK_OUT } from '@shared/animations/grow.animation';
import { Support } from '@shared/model';
import { HTTP_LOADING_STATUS } from '@shared/model/http-loading-wrapper/http-loading-wrapper.model';
import { PleaService } from '@core/service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.scss'],
  animations: [
    GROW_IN_SHRINK_OUT
  ]
})
export class CommentCardComponent implements OnInit {
  @ViewChild( 'editComment' ) editCommentField: ElementRef;
  @Input() support: Support;
  @Input() isOwner: boolean;
  comment: string;
  updatingPleaStatus: HTTP_LOADING_STATUS;
  edit = false;

  constructor( private pleaService: PleaService ) {}

  ngOnInit() {
    this.comment = this.support.comment;
  }

  editComment() {
    this.edit = true;
    setTimeout(() => {
      this.editCommentField.nativeElement.focus();
      this.editCommentField.nativeElement.scrollIntoView({ behavior: "smooth", block: "start" });
    })
  }

  saveCommentEdit() {
    this.updatingPleaStatus = HTTP_LOADING_STATUS.LOADING;
    this.pleaService.updateComment( this.support.id, this.comment ).pipe(
      tap( _ => {
        this.updatingPleaStatus = HTTP_LOADING_STATUS.FINISHED;
        this.support.comment = this.comment;
        this.edit = false;
      } )
    ).subscribe();
  }
}
