import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { hostConfiguration } from '../../../environments/environment';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private urlLogin = hostConfiguration.host+'/login';
  private urlRefreshToken = hostConfiguration.host+'/refresh-token';
  constructor(
    private httpClient: HttpClient
  ) { }

  login(userName: UserName): Observable<ResponseLogin>{
    return this.httpClient.post<ResponseLogin>(this.urlLogin, userName);
  }

  refreshToken(refreshToken: string){
    return this.httpClient.post<ResponseRefreshToken>(this.urlRefreshToken, { refreshToken });
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

export interface ResponseRefreshToken{
  accessToken: string
}