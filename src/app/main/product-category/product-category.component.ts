import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, NavigationStart, Event } from '@angular/router';

import { ProductList, Product } from '../../mock-data/products';
import { ProductCategorys, ProductCategory } from '../../mock-data/products-category';

import { UrlChangeService } from 'src/app/services/url-change.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

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
    private localStorageService: LocalStorageService
  ) {
    this.productCategorys = ProductCategorys;
    this.products = ProductList;
  }

  ngOnInit(): void {
    // this.localStorageService.remove(this.localStorageService.cartKey);
    console.log(this.router.url);
    
    this.activeLink = this.router.url.split("/")[2] ? this.router.url.split("/")[2] : this.productCategorys[0].route;
    this.changeCategory(this.activeLink, this.products, this.productCategorys);
    

    this.subscriptionUrlChange.add(
      this.urlChangeService.urlChange().subscribe((event: Event)=>{
        if(event instanceof NavigationStart) {
          this.activeLink = event.url.split("/")[2] ? event.url.split("/")[2] : this.productCategorys[0].route;
          this.products = ProductList;
          this.changeCategory(this.activeLink, this.products, this.productCategorys);
        }
      })
    );
  }

  addToCart(id: number): void{
    let productStoraged = this.localStorageService.get(this.localStorageService.cartKey);

    let product = this.products.find(product=>product.id === id);

    let checkExist = productStoraged.some((animal: { id: number; }) => animal.id === product?.id);

    console.log(checkExist);

    if(!checkExist){
      product ? product.quantity = 1 : 0;
      productStoraged.push(product);
    }else{
      for(let product of productStoraged){
        if(product.id === id){
          product.quantity +=1;
        }
      }
    }
    
    this.localStorageService.set(this.localStorageService.cartKey, productStoraged);
    this.localStorageService.cartStoragedChange$.next(productStoraged);
  }

  showDetail(id: number): void{
    this.router.navigate(['productions-detail', id]);
  }

  toProducts(): void{
    this.router.navigate(['/productions'])
  }

  changeCategory(activeLink: string, products: Array<Product>, categorys: Array<ProductCategory>){
    
    let category = categorys.find(productCategory=>productCategory.route === activeLink);
    
    if(category){
      this.products = products.filter(product=>{
        return product.category === category?.id;
      });
    }
  }

  ngOnDestroy(){
    this.subscriptionUrlChange.unsubscribe();
  }

}
