import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JsonConvertService } from '../json-convert/json-convert.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '@env/*';
import { GetCompanyDto } from '@shared/model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  constructor(private http: HttpClient, private convertService: JsonConvertService) {}

  getCompanies(): Observable<GetCompanyDto[]> {
    return this.http.get<GetCompanyDto[]>(`${environment.apiBaseUrl}/company/all`).pipe(
      map((companies: GetCompanyDto[]) => {
        try {
          return this.convertService.parseArray(companies, GetCompanyDto);
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
      },
    });
  }
}
