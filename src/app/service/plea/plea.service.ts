import { Injectable } from '@angular/core';
import { Plea } from '../../model/plea';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IPlea } from 'pleagan-model';
import { map } from 'rxjs/operators';
import { JsonConvertService } from '../json-convert/json-convert.service';
import { Support } from '../../model/plea/support.model';
import { ISupport } from 'pleagan-model/dist/model/plea/base/support.interfase';

@Injectable()
export class PleaService {
  constructor(private http: HttpClient, private convertService: JsonConvertService) {}

  getPleas(): Observable<Plea[]> {
    return this.http.get<IPlea[]>(`${environment.apiBaseUrl}/plea/all`).pipe(
      map((pleas: IPlea[]) => {
        try {
          return this.convertService.parseArray(pleas, Plea);
        } catch (e) {
          console.log(e);
          return [];
        }
      }),
    );
  }

  getMyPleas(): Observable<Plea[]> {
    return this.http.get<IPlea[]>(`${environment.apiBaseUrl}/plea/my-pleas`).pipe(
      map((pleas: IPlea[]) => {
        try {
          return this.convertService.parseArray(pleas, Plea);
        } catch (e) {
          console.log(e);
          return [];
        }
      }),
    );
  }

  getPleasISupport(): Observable<Plea[]> {
    return this.http.get<IPlea[]>(`${environment.apiBaseUrl}/plea/my-supported-pleas`).pipe(
      map((pleas: IPlea[]) => {
        try {
          return this.convertService.parseArray(pleas, Plea);
        } catch (e) {
          console.log(e);
          return [];
        }
      }),
    );
  }

  getSupportById( id: number ): Observable<Support> {
    return this.http.get<ISupport>( `${environment.apiBaseUrl}/support/${id}` ).pipe(
      map((support: ISupport) => {
        try {
          return this.convertService.parse(support, Support);
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

  getPleaById(id: number): Observable<Plea> {
    return this.http.get<IPlea>(`${environment.apiBaseUrl}/plea/${id}`).pipe(
      map((plea: IPlea) => {
        try {
          return this.convertService.parse(plea, Plea);
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
    return this.http.put<void>(`${environment.apiBaseUrl}/plea/${id}/support`, body);
  }

  removeComment(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiBaseUrl}/plea/${id}/support`);
  }

  createPlea(plea: Plea): Observable<{ id: number }> {
    return this.http.post<{ id: number }>(`${environment.apiBaseUrl}/plea`, plea);
  }

  updatePlea(plea: Plea): Observable<void> {
    return this.http.put<void>(`${environment.apiBaseUrl}/plea/${plea.id}`, plea);
  }

  removePlea(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiBaseUrl}/plea/${id}`);
  }

  searchPleas = (query: string): Observable<Plea[]> => {
    return this.http
      .get<IPlea[]>(`${environment.apiBaseUrl}/plea`, {
        params: { query },
      })
      .pipe(map((pleas: IPlea[]) => this.convertService.parseArray(pleas, Plea)));
  };
}
