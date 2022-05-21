import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';

export const tapOnce = <T>( fn: ( value: any )=> void ) => {
  return function( source: Observable<T> ) {
    source
      .pipe(
        take( 1 ),
        tap(value => fn( value ) )
      )
      .subscribe();

    return source;
  };
}
