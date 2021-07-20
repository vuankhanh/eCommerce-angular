import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, NavigationStart, Event } from '@angular/router';

import { ProductCategory } from '../../models/ProductCategory';
import { PaginationParams } from 'src/app/models/PaginationParams';
import { Product } from 'src/app/models/Product';

import { UrlChangeService } from 'src/app/services/url-change.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductResponse, ProductService } from 'src/app/services/api/product/product.service';
import { HeaderService } from 'src/app/services/header.service';
import { AppServicesService } from 'src/app/services/app-services.service';

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
    private urlChangeService: UrlChangeService,
    private cartService: CartService,
    private productService: ProductService,
    private headerService: HeaderService,
    private appServicesService: AppServicesService
  ) {
    
    
  }

  ngOnInit(): void {
    // this.cartService.remove();
    this.appServicesService.productCategory$.subscribe(res=>{
      this.productCategorys = res;
      this.activeLink = this.router.url.split("/")[2] ? this.router.url.split("/")[2] : this.productCategorys[0].route;
      this.listenProduct(this.activeLink);
    })

    this.subscription.add(
      this.urlChangeService.urlChange().subscribe((event: Event)=>{
        if(event instanceof NavigationStart) {
          this.activeLink = event.url.split("/")[2] ? event.url.split("/")[2] : this.productCategorys[0].route;
          this.listenProduct(this.activeLink);
        }
      })
    );
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

  addToCart(product: Product){
    this.cartService.addToCart(product);
    this.headerService.set(true);
  }

  showDetail(product: Product){
    this.router.navigate(['productions/'+this.activeLink, product._id]);
  }

  toProducts(): void{
    this.router.navigate(['/productions/']);
  }

  changeIndex(index: number){
    console.log('Change index = ' + index);
    
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
