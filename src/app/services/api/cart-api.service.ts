import { Injectable } from '@angular/core';
import { hostConfiguration } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Product } from 'src/app/models/Product';

@Injectable({
  providedIn: 'root'
})
export class CartApiService {
  private urlTotalBill = hostConfiguration.host+'/cart/total-bill';
  private urlEstimateFee: string = hostConfiguration.host+'/cart/estimate-shipping-fee';
  constructor(
    private httpClient: HttpClient
  ) { }

  getTotalBill(products: Array<Product>){
    let cart = products.map(product=> {
      return { _id: product._id, quantity: product.quantity }
    })
    return this.httpClient.post<TotalBill>(this.urlTotalBill, { cart });
  }

  getEstimateFee(token: string, addressId: string, products: Array<Product>){
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token
    });

    let cart = products.map(product=> {
      return { _id: product._id, quantity: product.quantity }
    })

    return this.httpClient.post(this.urlEstimateFee, { addressId, cart }, { headers });
  }
}

export interface TotalBill{
  totalBill: number
}
