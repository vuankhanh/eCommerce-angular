import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/Product';
import { ProductCategory } from '../models/ProductCategory';
import { ProductService } from './api/product/product.service';

@Injectable({
  providedIn: 'root'
})
export class AppServicesService {
  products: Product;
  bProduct: BehaviorSubject<ProductCategory[]> = new BehaviorSubject<ProductCategory[]>([]);
  product$: Observable<ProductCategory[]> = this.bProduct.asObservable();
  constructor(
    private productService: ProductService
  ) {
    this.productService.getCategory().subscribe(res=>this.bProduct.next(res))
  }
}
