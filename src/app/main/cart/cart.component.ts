import { Component, OnInit, Renderer2 } from '@angular/core';

import { CartService } from 'src/app/services/cart.service';

import { Product } from '../../mock-data/products'
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cart: Array<Product>;
  temporaryValue: number;
  constructor(
    private renderer2: Renderer2,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.cart = this.cartService.get();
    this.temporaryValue = this.cartService.sumTemporaryValue(this.cart);
  }

  changeQuantity(increase: boolean, index: number){
    console.log(increase);
    console.log(index);
    
    if(increase){
      this.cart[index].quantity!++;
    }else{
      if(this.cart[index].quantity! > 1){
        this.cart[index].quantity!--;
      }
    }
    this.cartService.set(this.cart);
    this.temporaryValue = this.cartService.sumTemporaryValue(this.cart);
  }

  quantityChange(event: Event, index: number){
    let value = (event.target as HTMLInputElement).value;
    
    if(this.isNumber(value)){
      this.cart[index].quantity = parseInt(value);
      console.log(parseInt(value));
    }
    this.cartService.set(this.cart);
    this.temporaryValue = this.cartService.sumTemporaryValue(this.cart);
  }

  laterBuy(cartItem: HTMLDivElement, index: number){
    console.log(cartItem);
    this.renderer2.addClass(cartItem, 'cart-item-removed');
    setTimeout(() => {
      this.cart.splice(index, 1);
      this.cartService.set(this.cart);
      this.temporaryValue = this.cartService.sumTemporaryValue(this.cart);
    }, 450);
  }

  isNumber(number: any) {
    return !isNaN(number) && isFinite(number)
  }
}
