import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JsonConvertService } from '../json-convert/json-convert.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '@env/*';
import { GetProductDto } from '@shared/model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient, private convertService: JsonConvertService) {}

  getProducts(): Observable<GetProductDto[]> {
    return this.http.get<GetProductDto[]>(`${environment.apiBaseUrl}/product/all`).pipe(
      map((companies: GetProductDto[]) => {
        try {
          return this.convertService.parseArray(companies, GetProductDto);
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
