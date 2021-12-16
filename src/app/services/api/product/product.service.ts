import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { PaginationParams } from 'src/app/models/PaginationParams';
import { Product } from 'src/app/models/Product';

import { ProductCategory } from 'src/app/models/ProductCategory';

import { hostConfiguration } from '../../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private urlProductCategory: string = hostConfiguration.host+'/product-category';
  private urlProductHightlight: string = hostConfiguration.host+'/product-hightlight';
  private urlProduct: string = hostConfiguration.host+'/product';
  constructor(
    private httpClient: HttpClient
  ) { }

  getCategory(){
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.httpClient.get<Array<ProductCategory>>(this.urlProductCategory, { headers })
  }

  getProductHightlight(){
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.httpClient.get<Array<Product>>(this.urlProductHightlight, { headers });
  }

  getProduct(type: string, paginationParams?: PaginationParams){
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    let params: HttpParams = new HttpParams();
    if(paginationParams){
      params = params.append('size', paginationParams.size ? paginationParams.size.toString() : '10');
      params = params.append('page', paginationParams.page ? paginationParams.page.toString() : '1');
    }
    
    params = params.append('type', type);
    
    return this.httpClient.get<ProductResponse>(this.urlProduct, { headers: headers, params: params })
  }

  getProductRoute(route: string){
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    
    return this.httpClient.get<Product>(this.urlProduct+'/'+route, { headers })
  }
}

export interface ProductResponse{
  totalItems: number,
  size: number,
  page: number,
  totalPages: number,
  data: Array<Product>
}