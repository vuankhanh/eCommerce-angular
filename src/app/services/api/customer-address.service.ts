import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Address } from 'src/app/models/Address';
import { hostConfiguration } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerAddressService {
  private urlInsertAddress: string = hostConfiguration.host+'/customer/address/insert';
  private urlUpdateAddress: string = hostConfiguration.host+'/customer/address/update';
  private urlRemoveAddress: string = hostConfiguration.host+'/customer/address/remove';
  constructor(
    private httpClient: HttpClient
  ) { }

  insert(token: string, address: Address){
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token
    });
    return this.httpClient.post<ResponseAddress>(this.urlInsertAddress, {address}, { headers: headers, observe: 'response' });
  }

  update(token: string, address: Address){
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token
    });
    return this.httpClient.put<ResponseAddress>(this.urlUpdateAddress, {address}, { headers: headers, observe: 'response' });
  }

  remove(token: string, address: Address){
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token
    });
    return this.httpClient.put<ResponseAddress>(this.urlRemoveAddress, {address}, { headers: headers, observe: 'response' });
  }
  
}

export interface ResponseAddress{
  message: string,
  accessToken: string
}
