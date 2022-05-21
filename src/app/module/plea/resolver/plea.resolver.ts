import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { GetPleaDto } from '@shared/model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PleaService } from '@core/service';
import { filter, map, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PleaResolver implements Resolve<GetPleaDto> {
  constructor(
    private pleaService: PleaService
  ) {}

  resolve( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Observable<GetPleaDto> {
    const pleaId = parseInt(route.paramMap.get('pleaId')!, 10);
    return this.pleaService.get().pipe(
      filter( pleas => !!pleas.length),
      map( ( pleas: GetPleaDto[] ) => pleas.find( (plea: GetPleaDto ) => plea.id === pleaId )!),
      take( 1 )
    );
  }
}
