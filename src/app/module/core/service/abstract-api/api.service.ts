import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@env/*';
import { JsonConvertService } from '@core/service/json-convert/json-convert.service';
import { HandleError } from '@core/service/error/http-error-handler.service';
import { Observable, ReplaySubject } from 'rxjs';

export interface GenericParams {
  [key: string]: string | number | undefined;
}

@Injectable({
  providedIn: 'root'
})
export abstract class ApiService<O> extends JsonConvertService<O>{
  protected endpoint = environment.apiBaseUrl;
  protected handleError: HandleError;
  protected cache: ReplaySubject<O[]> = new ReplaySubject<O[]>( 1 );

  protected constructor(
    protected http: HttpClient
  ) {
    super();
  }

  abstract get( params?: GenericParams ): Observable<O[]>;
  getById?( id: number ): Observable<O>;
  create?( newEntity: O ): Observable<null>;
  update?( id: number, updatedEntity: O ): Observable<null>;
  delete?( id: number ): Observable<null>;
  protected fetchAll?( params?: GenericParams ): void;

  protected mapToHttpParams( params: GenericParams ): HttpParams {
    let httpParams = new HttpParams();
    for ( const key of Object.keys( params ) ) {
      if ( params[ key ] !== undefined && params[ key ] !== '' ) {
        const param: string = typeof params[ key ] === 'number' ? params[ key ]!.toString() : params[ key ] as string;
        httpParams = httpParams.append( key, param );
      }
    }
    return httpParams;
  };
}
