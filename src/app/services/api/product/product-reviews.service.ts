import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductReviews } from 'src/app/models/ProductReviews';
import { hostConfiguration } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductReviewsService {
  private urlProductReviews: string = hostConfiguration.host+'/product-reviews';
  private urlProductReviewsInsert: string = hostConfiguration.host+'/product-reviews/insert';
  constructor(
    private httpClient: HttpClient
  ) { }

  get(productId: string){
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    let params: HttpParams = new HttpParams();
    params = params.append('productId', productId);

    return this.httpClient.get<Array<ProductReviews>>(this.urlProductReviews, { headers, params });
  }

  insert(reviewsWillUpload: ReviewsWillUpload){
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.httpClient.post(this.urlProductReviewsInsert, reviewsWillUpload, { headers });
  }
}

export interface ReviewsWillUpload{
  productId: string,
  clientInformation: {
    name: string,
    phoneNumber: string
  },
  content: string,
  rating: number
}