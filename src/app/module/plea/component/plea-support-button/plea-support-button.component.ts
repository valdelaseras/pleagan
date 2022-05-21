import {Component, Input, Output} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {PleaService} from '@core/service';
import { GetPleaDto } from '@shared/model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-plea-support-button',
  templateUrl: './plea-support-button.component.html',
  styleUrls: ['./plea-support-button.component.scss'],
})
export class PleaSupportButtonComponent {
  @Input() plea: GetPleaDto;
  @Output() onSupport: Subject<string> = new Subject<string>();
  comment: FormControl = new FormControl();
  supportModalIsOpen = false;

  supportPlea(): void {
    this.onSupport.next( this.comment.value );
  }

  displayModal(event: MouseEvent): void {
    // if ( this.userHasSupported ) return;
    // event.stopPropagation();
    // event.preventDefault();
    // this.supportModalIsOpen = true;
  }
}
