import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { GetPleaDto } from '@shared/model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PleaService } from '@core/service';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PleasResolver implements Resolve<GetPleaDto[]> {
  constructor(
    private pleaService: PleaService
  ) {}

  resolve( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Observable<GetPleaDto[]> {
    return this.pleaService.get().pipe(
      take( 1 )
    );
  }

}
