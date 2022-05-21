import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { CreatePleaDto, GetPleaDto, UpdatePleaDto } from '@shared/model';
import { environment } from '@env/*';
import { ApiService } from '@core/service/abstract-api/api.service';
import { HttpErrorHandlerService } from '@core/service/error/http-error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class PleaService extends ApiService<GetPleaDto> {
  protected cache: BehaviorSubject<GetPleaDto[]>;

  constructor(
    protected http: HttpClient,
    private httpErrorHandler: HttpErrorHandlerService
  ) {
    super( http );
    this.endpoint += '/plea';
    this.handleError = httpErrorHandler.createHandleError( 'PleaService' );
  }

  get(): Observable<GetPleaDto[]> {
    if ( !this.cache ) {
      this.cache = new BehaviorSubject<GetPleaDto[]>([]);
      this.fetchAll();
    }
    return this.cache.asObservable();
  }

  // getMine(): Observable<GetPleaDto[]> {
  //   return this.http.get<GetPleaDto[]>(
  //     `${this.endpoint}/mine`
  //   ).pipe(
  //     map((pleas: GetPleaDto[]) => this.parseArray( pleas, GetPleaDto ) ),
  //     catchError( this.handleError( 'getMine', [] ) )
  //   );
  // }

  getSupported(): Observable<GetPleaDto[]> {
    return this.http.get<GetPleaDto[]>(
      `${this.endpoint}/supported`
    ).pipe(
      map((pleas: GetPleaDto[]) => this.parseArray( pleas, GetPleaDto ) ),
      catchError( this.handleError( 'getSupported', [] ) ),
    );
  }

  // getSupportById( id: number ): Observable<GetSupportDto> {
  //   return this.http.get<GetSupportDto>( `${environment.apiBaseUrl}/support/${id}` ).pipe(
  //     map((support: GetSupportDto) => {
  //       try {
  //         return this.parse(support, GetSupportDto);
  //       } catch (e) {
  //         throw e;
  //       }
  //     }),
  //   );
  // }

  // getMySupports(): Observable<Support[]> {
  //   return this.http.get<ISupport[]>(`${environment.apiBaseUrl}/plea/my-supports`).pipe(
  //     map((supports: ISupport[]) => {
  //       try {
  //         return this.convertService.parseArray(supports, Support);
  //       } catch (e) {
  //         console.log(e);
  //         return [];
  //       }
  //     }),
  //   );
  // }

  getById( id: number ): Observable<GetPleaDto> {
    return this.http.get<GetPleaDto>(
      `${this.endpoint}/${id}`
    ).pipe(
      map((plea: GetPleaDto) => this.parse( plea, GetPleaDto ) ),
      catchError( this.handleError( 'getById', {} as GetPleaDto ) ),
    );
  }

  // @todo put in support service
  supportPlea(id: number, comment: string): Observable<void> {
    const body = { comment };
    return this.http.post<void>(`${this.endpoint}/${id}/support`, body);
  }

  // @todo put in support service
  updateComment(id: number, comment: string): Observable<void> {
    const body = { comment };
    return this.http.put<void>(`${this.endpoint}/support/${id}`, body);
  }

  // @todo put in support service
  removeComment(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiBaseUrl}/plea/${id}/support`);
  }

  create( plea: CreatePleaDto ): Observable<GetPleaDto> {
    return this.http.post<GetPleaDto>(
      this.endpoint,
      plea
    ).pipe(
      tap( () => this.fetchAll() ),
      catchError( this.handleError( 'create', {} as GetPleaDto ) )
    );
  }

  update( id: number, updatedPlea: UpdatePleaDto): Observable<GetPleaDto> {
    return this.http.put<GetPleaDto>(
      `${this.endpoint}/${id}`,
      updatedPlea
    ).pipe(
      tap( () => this.fetchAll() ),
      catchError( this.handleError( 'update', {} as GetPleaDto ) )
    );
  }

  delete( id: number ): Observable<null> {
    return this.http.delete<null>(
      `${this.endpoint}/${id}`
    ).pipe(
      tap( () => this.fetchAll() ),
      catchError( this.handleError( 'delete', null ) )
    );
  }

  // searchPleas = (query: string): Observable<GetPleaDto[]> => {
  //   let params = new HttpParams();
  //   params = params.append( 'query', query );
  //
  //   return this.http.get<GetPleaDto[]>(
  //     this.endpoint,
  //     { params }
  //     ).pipe(
  //       map((pleas: GetPleaDto[]) => this.parseArray(pleas, GetPleaDto))
  //     );
  // }

  protected fetchAll(): void  {
    this.http.get<GetPleaDto[]>(
      this.endpoint
    ).pipe(
      catchError( this.handleError( 'get', [] ) ),
      map(( pleas: GetPleaDto[] ) => this.parseArray( pleas, GetPleaDto )),
      tap( ( pleas: GetPleaDto[] ) => this.cache.next( pleas ) ),
    ).subscribe();
  }
}
