import { Injectable } from '@angular/core';
import { Plea } from '../../model/plea';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IPlea } from 'pleagan-model';
import { map } from 'rxjs/operators';
import { JsonConvertService } from '../json-convert/json-convert.service';

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

  getPleaById(id: string): Observable<Plea> {
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

  createPlea( plea: Plea ): Observable<{id: number}> {
    return this.http.post<{id: number}>( `${environment.apiBaseUrl}/plea`, plea );
  }

  searchPleas = (query: string): Observable<Plea[]> => {
    return this.http
      .get<IPlea[]>(`${environment.apiBaseUrl}/plea`, {
        params: { query },
      })
      .pipe(map((pleas: IPlea[]) => this.convertService.parseArray(pleas, Plea)));
  };
}
