import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Product } from 'src/app/models/Product';
import { ProductService } from '../api/product/product.service';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailResolver implements Resolve<Product> {
  constructor(
    private productService: ProductService
  ){

  }
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Product> | Promise<Product> | Product {
    let productRoute = route.paramMap.get('route') || '';
    return this.productService.getProductRoute(productRoute);
  }
}
