import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '@env/*';
import { GetProductDto } from '@shared/model';
import { ApiService, GenericParams } from '@core/service/abstract-api/api.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends ApiService<GetProductDto> {
  constructor(
    protected http: HttpClient
  ) {
    super( http );
  }

  get( params: GenericParams ): Observable<GetProductDto[]> {
    return this.http.get<GetProductDto[]>(`${environment.apiBaseUrl}/product/all`).pipe(
      map((companies: GetProductDto[]) => {
        try {
          return this.parseArray(companies, GetProductDto);
        } catch (e) {
          console.log(e);
          return [];
        }
      }),
    );
  }

  getProductNames(): Observable<string[]> {
    return this.http.get<string[]>(`${environment.apiBaseUrl}/product/all`, {
      params: {
        namesOnly: 'true',
      },
    });
  }
}
