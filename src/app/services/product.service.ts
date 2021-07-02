import { Injectable } from '@angular/core';

import { Product } from '../mock-data/products';
import { ProductCategorys, ProductCategory } from '../models/Product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productCategorys: Array<ProductCategory>;
  constructor() {
    this.productCategorys = ProductCategorys;
  }

  getCategoryOfProduct(product: Product): string{
    for(let productCategory of this.productCategorys){
      if(product.category === productCategory.id){
        return productCategory.route;
      }
    }
    return 'unknow-category';
  }
}
