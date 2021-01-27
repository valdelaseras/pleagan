import { Injectable } from '@angular/core';
import { Plea } from '../model/plea';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IPlea } from 'pleagan-model';
import { JsonConvert, ValueCheckingMode } from 'json2typescript';
import { map } from 'rxjs/operators';

@Injectable()
export class PleaService {
  parse: JsonConvert;
  constructor(private http: HttpClient) {
    this.parse = new JsonConvert();

    // this.parse.operationMode = OperationMode.LOGGING;
    this.parse.ignorePrimitiveChecks = false;
    this.parse.valueCheckingMode = ValueCheckingMode.ALLOW_NULL;
  }
  getPleas(): Observable<Plea[]> {
    return this.http.get<Plea[]>(`${environment.apiBaseUrl}/plea/all`).pipe(
      map((pleas: IPlea[]) => {
        try {
          return this.parse.deserializeArray(pleas, Plea);
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
          return this.parse.deserializeObject(plea, Plea);
        } catch (e) {
          throw e;
        }
      }),
    );
  }

  searchPleas = ( query: string ): Observable<Plea[]> => {
    return this.http.get<Plea[]>(`${environment.apiBaseUrl}/plea`, {
      params: { query },
    }).pipe(
      map((pleas: IPlea[]) => this.parse.deserializeArray(pleas, Plea) ),
    );
  }
}
