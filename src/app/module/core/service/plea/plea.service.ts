import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JsonConvertService } from '../json-convert/json-convert.service';
import { CreatePleaDto, GetPleaDto, GetSupportDto, UpdatePleaDto } from '@shared/model';
import { environment } from '@env/*';

@Injectable({
  providedIn: 'root'
})
export class PleaService {
  constructor(private http: HttpClient, private convertService: JsonConvertService) {}

  getPleas(): Observable<GetPleaDto[]> {
    return this.http.get<GetPleaDto[]>(`${environment.apiBaseUrl}/plea/all`).pipe(
      map((pleas: GetPleaDto[]) => {
        try {
          return this.convertService.parseArray(pleas, GetPleaDto);
        } catch (e) {
          console.log(e);
          return [];
        }
      }),
    );
  }

  getMyPleas(): Observable<GetPleaDto[]> {
    return this.http.get<GetPleaDto[]>(`${environment.apiBaseUrl}/plea/my-pleas`).pipe(
      map((pleas: GetPleaDto[]) => {
        try {
          return this.convertService.parseArray(pleas, GetPleaDto);
        } catch (e) {
          console.log(e);
          return [];
        }
      }),
    );
  }

  getPleasISupport(): Observable<GetPleaDto[]> {
    return this.http.get<GetPleaDto[]>(`${environment.apiBaseUrl}/plea/my-supported-pleas`).pipe(
      map((pleas: GetPleaDto[]) => {
        try {
          return this.convertService.parseArray(pleas, GetPleaDto);
        } catch (e) {
          console.log(e);
          return [];
        }
      }),
    );
  }

  getSupportById( id: number ): Observable<GetSupportDto> {
    return this.http.get<GetSupportDto>( `${environment.apiBaseUrl}/support/${id}` ).pipe(
      map((support: GetSupportDto) => {
        try {
          return this.convertService.parse(support, GetSupportDto);
        } catch (e) {
          throw e;
        }
      }),
    )
  }

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

  getPleaById(id: number): Observable<GetPleaDto> {
    return this.http.get<GetPleaDto>(`${environment.apiBaseUrl}/plea/${id}`).pipe(
      map((plea: GetPleaDto) => {
        try {
          return this.convertService.parse(plea, GetPleaDto);
        } catch (e) {
          throw e;
        }
      }),
    );
  }

  supportPlea(id: number, comment: string): Observable<void> {
    const body = { comment };
    return this.http.post<void>(`${environment.apiBaseUrl}/plea/${id}/support`, body);
  }

  updateComment(id: number, comment: string): Observable<void> {
    const body = { comment };
    return this.http.put<void>(`${environment.apiBaseUrl}/support/${id}`, body);
  }

  removeComment(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiBaseUrl}/plea/${id}/support`);
  }

  createPlea(plea: CreatePleaDto): Observable<{ id: number }> {
    return this.http.post<{ id: number }>(`${environment.apiBaseUrl}/plea`, plea);
  }

  updatePlea(pleaId: number, plea: UpdatePleaDto): Observable<void> {
    return this.http.put<void>(`${environment.apiBaseUrl}/plea/${pleaId}`, plea);
  }

  removePlea(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiBaseUrl}/plea/${id}`);
  }

  searchPleas = (query: string): Observable<GetPleaDto[]> => {
    return this.http
      .get<GetPleaDto[]>(`${environment.apiBaseUrl}/plea`, {
        params: { query },
      })
      .pipe(map((pleas: GetPleaDto[]) => this.convertService.parseArray(pleas, GetPleaDto)));
  };
}
