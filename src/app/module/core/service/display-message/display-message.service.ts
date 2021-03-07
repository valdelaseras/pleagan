import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DisplayMessage } from '../../../shared/model/display-message/display-message.model';
import { map, shareReplay } from 'rxjs/operators';
import { Event, NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DisplayMessageService {
  private __displayMessages__: DisplayMessage[] = [];
  private __displayMessages$__: BehaviorSubject<DisplayMessage[]> = new BehaviorSubject<DisplayMessage[]>( this.__displayMessages__ );

  get displayMessages$(): Observable<DisplayMessage[]> {
    return this.__displayMessages$__.asObservable().pipe(
      map( ( displayMessages: DisplayMessage[] ) => displayMessages.filter( ( displayMessage: DisplayMessage ) => !displayMessage.dismissed ) ),
      shareReplay()
    );
  }

  constructor( private router: Router ) {
    router.events.subscribe( ( event: Event ) => {
      if ( event instanceof NavigationEnd ) {
        this.dismissAllDisplayMessages();
      }
    })
  }

  dismissDisplayMessage( displayMessage: DisplayMessage ): void {
    const dismissedDisplayMessage = this.__displayMessages__[ this.__displayMessages__.findIndex( ( _displayMessage: DisplayMessage ) => _displayMessage.message === displayMessage.message ) ];

    if ( dismissedDisplayMessage ) {
      dismissedDisplayMessage.dismissed = true;
    }

    this.__displayMessages$__.next( this.__displayMessages__ );
  }

  dismissAllDisplayMessages(): void {
    for ( const displayMessage of this.__displayMessages__ ) {
      displayMessage.dismissed = true;
    }

    this.__displayMessages$__.next( this.__displayMessages__ );
  }

  addDisplayMessage( displayMessage: DisplayMessage ): void {
    this.__displayMessages__.push( displayMessage );
    this.__displayMessages$__.next( this.__displayMessages__ );
  }
}
