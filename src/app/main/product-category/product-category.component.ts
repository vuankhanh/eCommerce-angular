import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, NavigationStart, Event } from '@angular/router';

import { ProductList, Product } from '../../mock-data/products';
import { ProductCategorys, ProductCategory } from '../../models/Product-category';

import { UrlChangeService } from 'src/app/services/url-change.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { HeaderService } from 'src/app/services/header.service';

import { Subscription } from 'rxjs';
@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.scss']
})
export class ProductCategoryComponent implements OnInit, OnDestroy {
  products: Array<Product>;
  productCategorys: Array<ProductCategory>;
  activeLink: string;
  subscriptionUrlChange: Subscription = new Subscription();
  constructor(
    private router: Router,
    private urlChangeService: UrlChangeService,
    private cartService: CartService,
    private productService: ProductService,
    private headerService: HeaderService
  ) {
    this.productCategorys = ProductCategorys;
    
  }

  ngOnInit(): void {
    // this.cartService.remove();
    console.log(this.router.url);
    
    this.activeLink = this.router.url.split("/")[2] ? this.router.url.split("/")[2] : this.productCategorys[0].route;
    setTimeout(() => {
      this.products = ProductList;
      this.changeCategory(this.activeLink, this.products, this.productCategorys);
    }, 1000);

    this.subscriptionUrlChange.add(
      this.urlChangeService.urlChange().subscribe((event: Event)=>{
        if(event instanceof NavigationStart) {
          this.activeLink = event.url.split("/")[2] ? event.url.split("/")[2] : this.productCategorys[0].route;
          this.products = [];
          setTimeout(() => {
            this.products = ProductList;
            this.changeCategory(this.activeLink, this.products, this.productCategorys);
          }, 1000);
        }
      })
    );
  }

  addToCart(product: Product){
    this.cartService.addToCart(product);
    this.headerService.set(true);
  }

  showDetail(product: Product){
    let categoryOfProduct: string = this.productService.getCategoryOfProduct(product);
    
    this.router.navigate(['productions/'+categoryOfProduct, product.id]);
  }

  toProducts(): void{
    this.router.navigate(['/productions/']);
  }

  changeCategory(activeLink: string, products: Array<Product>, categorys: Array<ProductCategory>){
    
    let category = categorys.find(productCategory=>productCategory.route === activeLink);
    if(category && products){
      this.products = products.filter(product=>{
        return product.category === category?.id;
      });
    }
  }

  ngOnDestroy(){
    this.subscriptionUrlChange.unsubscribe();
  }

}
