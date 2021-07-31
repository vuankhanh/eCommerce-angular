import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hostConfiguration } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {
  urlCheckToken: string = hostConfiguration.host+'/forgot-password/check-token';
  urlNewPassword: string = hostConfiguration.host+'/forgot-password/new-password';
  constructor(
    private httpClient: HttpClient
  ) { }

  checkToken(token: string){
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'token': token
    });

    return this.httpClient.get(this.urlCheckToken, {headers});
  }

  newPassword(token: string, newPassword: string){
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'token': token
    });

    return this.httpClient.post(this.urlNewPassword, { newPassword }, { headers })
  }


}
