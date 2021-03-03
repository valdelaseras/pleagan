import { Observable, OperatorFunction } from 'rxjs';
import { filter } from 'rxjs/operators';

export const filterNullOrUndefined = <T>() => {

  return ( src: Observable<T | undefined | null> ): Observable<T> =>
    src.pipe(
      filter(x => x != null) as OperatorFunction<T | null |  undefined, T>
    );
};
