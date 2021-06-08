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

  login(userName: UserName): Observable<ResponseLogin>{
    return this.httpClient.post<ResponseLogin>(this.urlLogin, userName);
  }
}

export interface UserName{
  userName: string,
  password: string
}

export interface ResponseLogin{
  accessToken: string,
  refreshToken: string,
  message: string
}
