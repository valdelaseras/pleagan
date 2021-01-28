import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JsonConvertService } from '../json-convert/json-convert.service';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { ICompany, IPlea } from 'pleagan-model';
import { Company } from '../../model/company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor( private http: HttpClient, private convertService: JsonConvertService ) { }

  getCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(`${environment.apiBaseUrl}/company/all`).pipe(
      map((companies: ICompany[]) => {
        try {
          return this.convertService.parseArray(companies, Company);
        } catch (e) {
          console.log(e);
          return [];
        }
      }),
    );
  }

  getCompanyNames(): Observable<string[]> {
    return this.http.get<string[]>(`${environment.apiBaseUrl}/company/all`, {
      params: {
        namesOnly: 'true',
      }
    });
  }
}
