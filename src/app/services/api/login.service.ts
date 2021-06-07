import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { hostConfiguration } from '../../../environments/environment';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private urlLogin = hostConfiguration.host+'/login';
  constructor(
    private httpClient: HttpClient
  ) { }

  login(phoneNumber: string): Observable<ResponseLogin>{
    let body = {
      phoneNumber: phoneNumber
    }
    return this.httpClient.post<ResponseLogin>(this.urlLogin, body);
  }
}

export interface ResponseLogin{
  accessToken: string,
  refreshToken: string
}
