import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { hostConfiguration } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private url: string = hostConfiguration.host+'/config';
  constructor(
    private httpClient: HttpClient
  ) { }
  
  getConfig(token: string){
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token
    });
    return this.httpClient.get(this.url, { headers: headers })
  }
}
