import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { AddressChooseComponent } from '../../sharing/modal/address-choose/address-choose.component';

import { Address } from 'src/app/models/Address';

import { AuthService } from 'src/app/services/auth.service';
import { Cart, CartService } from 'src/app/services/cart.service';

import { Product } from '../../mock-data/products'
import { UserInformation } from 'src/app/models/UserInformation';

import { Subscription } from 'rxjs';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
  cart: Cart;
  productsCart: Array<Product>;
  temporaryValue: number = 0;
  userInformation: UserInformation | null;

  defaultAddress: Address;

  subscription: Subscription = new Subscription();
  constructor(
    private dialog: MatDialog,
    private renderer2: Renderer2,
    private cartService: CartService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.initCart();
    this.listenUserInformation();
  }

  initCart(){
    this.cart = this.cartService.get();
    this.temporaryValue = this.cartService.sumTemporaryValue(this.cart.products);

    if(this.cart.deliverTo){
      console.log(this.defaultAddress);
      this.defaultAddress = this.cart.deliverTo;
    }
    if(!this.cart.status){
      this.cart.status = 1;
      this.cartService.setStatus(1);
    }
  }

  listenUserInformation(){
    this.subscription.add(
      this.authService.getUserInformation().subscribe(userInfo=>{
        this.userInformation = userInfo;
        if(this.userInformation && this.userInformation.address.length>0 && !this.cart.deliverTo){
          this.defaultAddress = this.cartService.getDefaultAddress(this.userInformation.address);
          this.cartService.setDelivery(this.defaultAddress);
        }
      })
    )
  }

  changeQuantity(increase: boolean, index: number){
    if(increase){
      this.cart.products[index].quantity!++;
    }else{
      if(this.cart.products[index].quantity! > 1){
        this.cart.products[index].quantity!--;
      }
    }
    this.cartService.set(this.cart);
    this.temporaryValue = this.cartService.sumTemporaryValue(this.cart!.products);
  }

  quantityInputChange(event: Event, index: number){
    let value = (event.target as HTMLInputElement).value;
    
    if(this.isNumber(value)){
      this.cart!.products[index].quantity = parseInt(value);
      console.log(parseInt(value));
    }
    this.cartService.set(this.cart);
    this.temporaryValue = this.cartService.sumTemporaryValue(this.cart!.products);
  }

  laterBuy(cartItem: HTMLDivElement, index: number){
    console.log(cartItem);
    this.renderer2.addClass(cartItem, 'cart-item-removed');
    setTimeout(() => {
      this.cart!.products.splice(index, 1);
      this.cartService.set(this.cart);
      this.temporaryValue = this.cartService.sumTemporaryValue(this.cart!.products);
    }, 450);
  }

  changeAddress(){
    console.log("open Modal");
    this.dialog.open(AddressChooseComponent, {
      panelClass: 'address-choose',
      data: {
        defaultAddress: this.defaultAddress
      }
    }).afterClosed().subscribe(res=>{
      console.log(res);
      if(res && res.deliverTo){
        let address: Address = res.deliverTo;
        this.defaultAddress = address;
        this.cartService.setDelivery(this.defaultAddress);
        console.log(address);
      }
    })
  }

  isNumber(number: any) {
    return !isNaN(number) && isFinite(number)
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
