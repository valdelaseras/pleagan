import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Pleagan } from '../../model/pleagan';
import { shareReplay } from 'rxjs/operators';
import { delayedRetry } from '../../operator/delayed-retry.operator';

@Injectable()
export class PleaganService {
  constructor(private http: HttpClient) {}

  createPleagan(): Observable<void> {
    return this.http.post<void>(`${environment.apiBaseUrl}/pleagan`, null );
  }

  getCurrentPleagan(): Observable<Pleagan> {
    return this.http.get<Pleagan>(`${environment.apiBaseUrl}/pleagan`).pipe(
      delayedRetry(200, 3),
      shareReplay(),
    );
  }
}
