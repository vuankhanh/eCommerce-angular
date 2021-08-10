import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { hostConfiguration } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private url:string = hostConfiguration.host+'/register';
  constructor(
    private httpClient: HttpClient
  ) { }

  register(account: Account){
    return this.httpClient.post(this.url, account);
  }
}

export interface Account{
  userName: string,
  password: string,
  name: string,
  emailAddress: string,
  phoneNumber: string
}
