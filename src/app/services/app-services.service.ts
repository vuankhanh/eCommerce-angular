import { Injectable } from '@angular/core';

import { Product } from '../models/Product';
import { ProductCategory } from '../models/ProductCategory';

import { ProductService } from './api/product/product.service';
import { AuthService } from './auth.service';
import { ResponseLogin } from './api/login.service';
import { LocalStorageService } from './local-storage.service';
import { AddIconSvgService } from './add-icon-svg.service';

import { BehaviorSubject, Observable } from 'rxjs';

const tokenStoragedKey = 'carota-token';
@Injectable({
  providedIn: 'root'
})
export class AppServicesService {
  products: Product;
  private bProductCategory: BehaviorSubject<ProductCategory[]> = new BehaviorSubject<ProductCategory[]>([]);
  productCategory$: Observable<ProductCategory[]> = this.bProductCategory.asObservable();

  private bProductHightlight: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  bProductHightlight$: Observable<Product[]> = this.bProductHightlight.asObservable();
  constructor(
    private productService: ProductService,
    private localStorageService: LocalStorageService,
    private authService: AuthService,
    private addIconSvgService: AddIconSvgService,
  ) {
    this.productService.getCategory().subscribe(res=>this.bProductCategory.next(res));
    this.productService.getProductHightlight().subscribe(res=>this.bProductHightlight.next(res));
    this.addIconSvgService.addIcon();
    let tokenStoraged: ResponseLogin = <ResponseLogin>this.localStorageService.get(tokenStoragedKey);
    if(tokenStoraged && tokenStoraged.accessToken){
      let accessToken = tokenStoraged.accessToken;
      this.authService.checkTokenValidation(accessToken);
    }
  }
}
