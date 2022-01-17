import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { delayedRetry } from '@shared/operator';
import { environment } from '@env/*';
import { DeviceService } from '@core/service/device/device.service';
import { GetCurrentPleaganDto, GetPleaDto, UpdatePleaDto } from '@shared/model';

@Injectable({
  providedIn: 'root'
})
export class PleaganService {
  constructor(
    private http: HttpClient
  ) {}

  createPleagan( country: string ): Observable<void> {
    return this.http.post<void>(`${ environment.apiBaseUrl }/pleagan`, { country });
  }

  getCurrentPleagan(): Observable<GetCurrentPleaganDto> {
    return this.http.get<GetCurrentPleaganDto>(`${ environment.apiBaseUrl }/pleagan`).pipe(
      delayedRetry(200, 3),
      shareReplay(),
    );
  }

  // updatePleagan( pleagan: UpdatePleagan ): Observable<void> {
  //   return this.http.put<void>( `${ environment.apiBaseUrl }/pleagan`, pleagan );
  // }

  // @TODO: move to device service
  // addDevice( token: string ): Observable<Device> {
  //   const uuid = DeviceService.UUID;
  //   return this.http.post<Device>( `${ environment.apiBaseUrl }/pleagan/device`, { token, uuid })
  // }
  //
  // deleteDevice(): Observable<void> {
  //   const uuid = DeviceService.UUID;
  //   return this.http.delete<void>( `${ environment.apiBaseUrl }/pleagan/device/${ uuid }`)
  // }
}
