import { Injectable } from '@angular/core';

import { LocalStorageService } from './local-storage.service'

import { BehaviorSubject, Observable, Observer } from 'rxjs';

import { Product } from '../mock-data/products';

const cartKey = 'addToCart';
@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartStoragedChange$: BehaviorSubject<any> = new BehaviorSubject([]);
  private listenCartStoragedChange: Observable<Array<Product>> = this.cartStoragedChange$.asObservable();
  constructor(
    private localStorageService: LocalStorageService
  ) {
    this.cartStoragedChange$.next(this.localStorageService.get(cartKey));
  }

  listenCartChange(): Observable<Array<Product>>{
    return this.listenCartStoragedChange;
  }

  get(){
    let products: Array<Product> = this.localStorageService.get(cartKey);
    return products;
  }

  set(products: Array<Product>){
    this.cartStoragedChange$.next(products);
    return this.localStorageService.set(cartKey, products);
  }

  remove(){
    this.cartStoragedChange$.next([]);
    this.localStorageService.remove(cartKey);
  }

  sumQuantityOfCart(itemCarts: Array<Product>): number{
    let total: number = 0;
    if(itemCarts.length>0){
      for(let product of itemCarts){
        total += product.quantity!;
      }
    }
    return total;
  }

  sumTemporaryValue(itemCarts: Array<Product>): number{
    console.log(itemCarts);
    let temporaryValue: number = 0;
    if(itemCarts && itemCarts.length>0){
      for(let product of itemCarts){
        temporaryValue += (product.quantity!*product.price);
      }
    }
    return temporaryValue;
  }
}
