import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PaginationParams } from 'src/app/models/PaginationParams';
import { Product } from 'src/app/models/Product';
import { ProductCategory } from 'src/app/models/ProductCategory';

import { ProductResponse, ProductService } from 'src/app/services/api/product/product.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-category-home-page',
  templateUrl: './product-category-home-page.component.html',
  styleUrls: ['./product-category-home-page.component.scss']
})
export class ProductCategoryHomePageComponent implements OnInit, OnDestroy {
  @Input() category: string;
  @Input() isSameCategory: boolean;
  
  productResponse: ProductResponse;
  configPagination: PaginationParams;
  products: Array<Product>;
  productCategorys: Array<ProductCategory>;

  subscription: Subscription = new Subscription();
  constructor(
    private router: Router,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.listenProduct(this.category);
  }

  listenProduct(type: string){
    this.subscription.add(
      this.productService.getProduct(type).subscribe(res=>{
        this.productResponse = res;
        this.configPagination = {
          totalItems: this.productResponse.totalItems,
          page: this.productResponse.page,
          size: this.productResponse.size,
          totalPages: this.productResponse.totalPages
        };
        this.products = this.productResponse.data;
      })
    )
  }

  showDetail(product: Product){
    this.router.navigate(['productions/'+this.category, product.route]);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
