import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { GROW_IN_SHRINK_OUT_SINGLE } from '@shared/animations/grow.animation';
import { HTTP_LOADING_STATUS } from '@shared/model/http-loading-wrapper/http-loading-wrapper.model';
import { PleaService } from '@core/service';
import { tap } from 'rxjs/operators';
import { GetSupportDto } from '@shared/model';

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.scss'],
  animations: [
    GROW_IN_SHRINK_OUT_SINGLE
  ]
})
export class CommentCardComponent implements OnInit {
  @ViewChild( 'editComment' ) editCommentField: ElementRef;
  @Input() support: GetSupportDto;
  @Input() isOwner: boolean;
  comment: string;
  updatingPleaStatus: HTTP_LOADING_STATUS;
  edit = false;
  edited = false;

  constructor( private pleaService: PleaService ) {}

  ngOnInit() {
    // somehow the updatedAt timestamp is a few hundred millis AFTER the createdAt timestamp
    // therefore we need to compare them and make an educated guess as to whether or not the comment
    // has been updated in the past.
    let difference = this.support.createdAt.getTime() - this.support.updatedAt.getTime();

    // I want a nice and positive number. Negative numbers get me down.
    difference = difference < 0 ? -difference : difference;

    // clone so we can detect if the user has actually changed the text
    this.comment = this.support.comment;

    // consider comment edited when updatedAt and createdAt differ with more than 5 seconds
    if ( difference > 5000 ) {
      this.edited = true;
    }
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
