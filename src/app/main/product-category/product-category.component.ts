import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ProductCategory } from '../../models/ProductCategory';
import { PaginationParams } from 'src/app/models/PaginationParams';
import { Product } from 'src/app/models/Product';

import { ProductResponse, ProductService } from 'src/app/services/api/product/product.service';

import { Subscription } from 'rxjs';
@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.scss']
})
export class ProductCategoryComponent implements OnInit, OnDestroy {
  productResponse: ProductResponse;
  configPagination: PaginationParams;
  products: Array<Product>;
  productCategorys: Array<ProductCategory>;
  activeLink: string;
  subscription: Subscription = new Subscription();
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private productService: ProductService
  ) {
    
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.activeLink = <string>params.get('category');
      this.listenProduct(this.activeLink);
    });
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
        console.log(this.products);
      })
    )
  }

  showDetail(product: Product){
    this.router.navigate(['productions/'+this.activeLink, product._id]);
  }

  changeIndex(index: number){
    console.log('Change index = ' + index);
    
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
