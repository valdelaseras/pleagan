import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingIndicatorService {
  private __showLoadingIndicator$__: BehaviorSubject<boolean> = new BehaviorSubject<boolean>( false );

  get showLoadingIndicator$(): Observable<boolean> {
    return this.__showLoadingIndicator$__.asObservable();
  }

  constructor() { }

  showLoadingIndicator(): void {
    this.__showLoadingIndicator$__.next( true );
  }

  hideLoadingIndicator(): void {
    this.__showLoadingIndicator$__.next( false );
  }
}
