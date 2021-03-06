import { Component, Input } from '@angular/core';
import { DisplayMessageService } from '../../service/display-message/display-message.service';
import { Observable } from 'rxjs';
import { DisplayMessageLevel, DisplayMessage } from '../../model/display-message/display-message.model';
import { map } from 'rxjs/operators';
import { FADE_IN_OUT_SHRINK_SINGLE, FADE_IN_OUT_SINGLE } from '../../animations';

@Component({
  selector: 'app-message-display',
  templateUrl: './message-display.component.html',
  styleUrls: ['./message-display.component.scss'],
  animations: [
    FADE_IN_OUT_SINGLE,
    FADE_IN_OUT_SHRINK_SINGLE
  ]
})
export class MessageDisplayComponent {
  @Input() messageLevels: DisplayMessageLevel[] = [
    'info',
    'success',
    'warning',
    'danger',
  ];
  displayMessages$: Observable<DisplayMessage[]>;

  constructor( private displayMessageService: DisplayMessageService ) {
    this.displayMessages$ = displayMessageService.displayMessages$.pipe(
      map( this.filterDisplayMessages )
    );
  }

  numberOfVisibleMessages( messages: DisplayMessage[] ): number {
    return messages.map( ( displayMessage: DisplayMessage ) => !displayMessage.dismissed ).length
  }

  filterDisplayMessages = ( displayMessages: DisplayMessage[] ): DisplayMessage[] => {
    return displayMessages.filter( ( displayMessage: DisplayMessage ) => this.messageLevels.includes( displayMessage.level ) )
  };

  dismiss( displayMessage: DisplayMessage ): void {
    displayMessage.dismissed = true;
    setTimeout(() => {
      this.displayMessageService.dismissDisplayMessage( displayMessage );
    }, 1000);
  }
}
