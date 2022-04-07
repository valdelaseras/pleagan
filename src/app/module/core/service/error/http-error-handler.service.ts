import { Injectable } from '@angular/core';
import { EMPTY, Observable, of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

export type HandleError = <T> ( operation?: string, result?: T ) => ( error: HttpErrorResponse ) => Observable<T>;

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerService {

  createHandleError = ( serviceName: string ): HandleError => <T> ( operation = 'operation', result = {} as T ) => {
    return this.handleError( serviceName, operation, result );
  };

  handleError<T>( serviceName: string, operation: string, result = {} as T ) {
    return ( error: HttpErrorResponse ): Observable<T> => {

      // 40x errors are handled by the application, not by this handler
      if ( error.status >= 400 && error.status < 500 ) {
        return throwError( error );
      }

      // All other errors (eg. 50x) are handled here
      const message = error.error && error.error.hasOwnProperty( 'message' ) ?
        error.error.message :
        `Server returned code ${ error.status } with body "${error.error}"`;

      // Return a safe result to prevent app from crashing
      if ( result !== null ) {
        return of(result);
      }

      // Emit nothing if no default result was given
      return EMPTY;
    }
  }
}
