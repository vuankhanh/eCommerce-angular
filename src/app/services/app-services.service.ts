import { Injectable } from '@angular/core';

import { Product } from '../models/Product';
import { ProductCategory } from '../models/ProductCategory';

import { ProductService } from './api/product/product.service';

import { BehaviorSubject, Observable } from 'rxjs';
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
    private productService: ProductService
  ) {
    this.productService.getCategory().subscribe(res=>this.bProductCategory.next(res))
    this.productService.getProductHightlight().subscribe(res=>this.bProductHightlight.next(res))
  }
}
