import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { Pleagan } from '@shared/model';
import { delayedRetry } from '@shared/operator';
import { environment } from '@env/*';

@Injectable({
  providedIn: 'root'
})
export class PleaganService {
  constructor(private http: HttpClient) {}

  createPleagan( country: string ): Observable<void> {
    return this.http.post<void>(`${environment.apiBaseUrl}/pleagan`, { country });
  }

  getCurrentPleagan(): Observable<Pleagan> {
    return this.http.get<Pleagan>(`${environment.apiBaseUrl}/pleagan`).pipe(
      delayedRetry(200, 3),
      shareReplay(),
    );
  }

  updatePleagan( pleagan: Pleagan ): Observable<void> {
    return this.http.put<void>( `${environment.apiBaseUrl}/pleagan`, pleagan );
  }
}
