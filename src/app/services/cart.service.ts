import { Injectable } from '@angular/core';

import { LocalStorageService } from './local-storage.service'

import { Address } from '../models/Address';
import { Product } from '../models/Product';

import { BehaviorSubject, Observable } from 'rxjs';

const cartKey = 'addToCart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartDefault: Cart = {
    deliverTo: null,
    products: [],
    status: 'inLocalStorageCart'
  }
  private cartStoragedChange$: BehaviorSubject<Cart> = new BehaviorSubject<Cart>(this.get());
  private listenCartStoragedChange: Observable<Cart> = this.cartStoragedChange$.asObservable();
  constructor(
    private localStorageService: LocalStorageService
  ) {}

  listenCartChange(): Observable<Cart>{
    return this.listenCartStoragedChange;
  }

  get(){
    let products: Cart| null = this.localStorageService.get(cartKey);
    return products ? products : this.cartDefault;
  }

  set(cart: Cart){
    this.cartStoragedChange$.next(cart);
    return this.localStorageService.set(cartKey, cart);
  }

  setDelivery(address: Address){
    let cart: Cart = this.get();
    cart.deliverTo = address;
    this.set(cart);
  }

  setProduct(products: Array<Product>){
    let cart: Cart = this.get();
    cart.products = products;
    this.set(cart);
  }

  addToCart(product: Product): void{
    let productsInCart: Array<Product> = this.get().products;
    
    let checkExist = productsInCart.some((itemCart: Product) => itemCart._id === product._id);
    if(!checkExist){
      product.quantity = 1;
      productsInCart.push(product);
    }else{
      for(let itemCart of productsInCart){
        if(itemCart._id === product._id){
          itemCart.quantity!++;
        }
      }
    }
    
    this.setProduct(productsInCart);
  }

  resetProduct(){
    this.cartStoragedChange$.next(this.cartDefault);
    this.setProduct([]);
  }

  sumQuantityOfCart(itemCarts: Array<Product>): number{
    let total: number = 0;
    if(itemCarts && itemCarts.length>0){
      for(let product of itemCarts){
        total += product.quantity!;
      }
    }
    return total;
  }

  sumTemporaryValue(products: Array<Product>): number{
    let temporaryValue: number = 0;
    if(products && products.length>0){
      for(let product of products){
        temporaryValue += (product.quantity!*product.price);
      }
    }
    return temporaryValue;
  }

  getDefaultAddress(addresses: Array<Address>): Address{
    let addressDefault = addresses.find(address=>address.isHeadquarters);
    return addressDefault ? addressDefault : addresses[0];
  }
}

export interface Cart{
  deliverTo: Address | null,
  products: Array<Product>,
  status: 'inLocalStorageCart'
}