import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { hostConfiguration } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CheckExistsAccountService {
  private urlCheckUserName: string = hostConfiguration.host+'/check-user-name';
  private urlCheckEmail: string = hostConfiguration.host+'/check-email';
  constructor(
    private httpClient: HttpClient
  ) { }

  checkExistUserName(userName: UserName){
    return this.httpClient.post(this.urlCheckUserName, userName);
  }

  checkExistEmail(email: Email){
    return this.httpClient.post(this.urlCheckEmail, email);
  }
}

export interface UserName{
  userName: string
}

export interface Email{
  email: string
}
