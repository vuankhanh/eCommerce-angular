import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hostConfiguration } from 'src/environments/environment';

import { Address } from 'src/app/models/Address';

@Injectable({
  providedIn: 'root'
})
export class CustomerAddressService {
  private urlAddress: string = hostConfiguration.host+'/customer/address';
  private urlInsertAddress: string = hostConfiguration.host+'/customer/address/insert';
  private urlUpdateAddress: string = hostConfiguration.host+'/customer/address/update';
  private urlRemoveAddress: string = hostConfiguration.host+'/customer/address/remove';
  constructor(
    private httpClient: HttpClient
  ) { }

  get(token: string){
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token
    });
    return this.httpClient.get<ResponseAddress>(this.urlAddress, { headers: headers });
  }

  insert(token: string, address: Address){
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token
    });
    return this.httpClient.post<ResponseAddress>(this.urlInsertAddress, {address}, { headers: headers });
  }

  update(token: string, address: Address){
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token
    });
    return this.httpClient.put<ResponseAddress>(this.urlUpdateAddress, {address}, { headers: headers });
  }

  remove(token: string, address: Address){
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token
    });
    return this.httpClient.put<ResponseAddress>(this.urlRemoveAddress, {address}, { headers: headers });
  }
  
}

export interface ResponseAddress{
  _id: string,
  address: Array<Address>
}
