import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Province, District, Ward } from '../../models/Address';

import { hostConfiguration } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AdministrativeUnitsService {
  private urlAdministrativeUnits: string = hostConfiguration.host+'/administrative-units';
  constructor(
    private httpClient: HttpClient
  ) { }

  getProvince(token: string){
    let params = new HttpParams().set('province', 'all');

    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token
    });

    return this.httpClient.get<Array<Province>>(this.urlAdministrativeUnits, { headers, params });
  }

  getDistrict(token: string, provinceCode: string){
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token
    });

    return this.httpClient.get<Array<District>>(this.urlAdministrativeUnits+"/"+provinceCode+'/district', { headers: headers });
  }

  getWard(token: string, districtCode: string){
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token
    });

    return this.httpClient.get<Array<Ward>>(this.urlAdministrativeUnits+"/"+districtCode+'/ward', { headers: headers });
  }
}
