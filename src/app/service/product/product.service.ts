import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JsonConvertService } from '../json-convert/json-convert.service';
import { Observable } from 'rxjs';
import { Company } from '../../model/company';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { ICompany, IProduct } from 'pleagan-model';
import { Product } from '../../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor( private http: HttpClient, private convertService: JsonConvertService ) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.apiBaseUrl}/product/all`).pipe(
      map((companies: IProduct[]) => {
        try {
          return this.convertService.parseArray(companies, Product);
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
      }
    });
  }
}
