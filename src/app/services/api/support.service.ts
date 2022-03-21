import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { hostConfiguration } from 'src/environments/environment';

import { Support, SupportDetail } from 'src/app/models/Support';

@Injectable({
  providedIn: 'root'
})
export class SupportService {
  private urlGetAll: string = hostConfiguration.host+'/support';
  constructor(
    private httpClient: HttpClient
  ) { }

  getAll(){
    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.httpClient.get<Array<Support>>(this.urlGetAll, { headers });
  }

  getDetail(route: string){
    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.httpClient.get<SupportDetail>(this.urlGetAll+'/'+route, { headers });
  }
}
