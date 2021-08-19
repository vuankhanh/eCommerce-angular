import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { AddressChooseComponent } from '../../sharing/modal/address-choose/address-choose.component';

import { Address } from 'src/app/models/Address';
import { Product } from 'src/app/models/Product';
import { UserInformation } from 'src/app/models/UserInformation';
import { ResponseLogin } from 'src/app/services/api/login.service';

import { AuthService } from 'src/app/services/auth.service';
import { Cart, CartService } from 'src/app/services/cart.service';
import { AddressModificationService } from 'src/app/services/address-modification.service';
import { ToastService } from 'src/app/services/toast.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { CustomerAddressService, ResponseAddress } from 'src/app/services/api/customer-address.service';


import { Subscription } from 'rxjs';

const tokenStoragedKey = 'carota-token';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
  @ViewChild('btnInsertAddress') btnInsertAddress: ElementRef;
  cart: Cart;
  temporaryValue: number = 0;

  userInformation: UserInformation | null;
  defaultAddress: Address;

  subscription: Subscription = new Subscription();
  constructor(
    private router: Router,
    private dialog: MatDialog,
    private renderer2: Renderer2,
    private cartService: CartService,
    private authService: AuthService,
    private addressModificationService: AddressModificationService,
    private toastService: ToastService,
    private localStorageService: LocalStorageService,
    private customerAddressService: CustomerAddressService
  ) { }

  ngOnInit(): void {
    this.initCart();
    this.listenUserInformation();
    this.listenCustomerAddress();
    // this.localStorageService.remove('carota-cart');
  }

  initCart(){
    this.subscription.add(
      this.cartService.listenCartChange().subscribe(cart=>{
        this.cart = cart;
        this.temporaryValue = this.cartService.sumTemporaryValue(this.cart.products);
        if(this.cart.deliverTo){
          this.defaultAddress = this.cart.deliverTo;
        }
      })
    )
  }

  listenCustomerAddress(){
    let tokenStoraged: ResponseLogin = <ResponseLogin>this.localStorageService.get(tokenStoragedKey);
    if(tokenStoraged){
      this.subscription.add(
        this.customerAddressService.get(tokenStoraged.accessToken).subscribe(res=>{
          if(res){
            let responseAddress: ResponseAddress = res;
            if(!this.cart.deliverTo){
              this.defaultAddress = this.cartService.getDefaultAddress(responseAddress.address);
              this.cartService.setDelivery(this.defaultAddress);
            }
          }
        })
      )
    }
  }

  listenUserInformation(){
    this.subscription.add(
      this.authService.getUserInformation().subscribe(userInfo=>{
        this.userInformation = userInfo;
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

  showDetail(product: Product){
    this.router.navigate(['productions/'+product.category.route, product._id]);
  }

  quantityInputChange(event: Event, index: number){
    let value = (event.target as HTMLInputElement).value;
    
    if(this.isNumber(value)){
      this.cart!.products[index].quantity = parseInt(value);
    }
    this.cartService.set(this.cart);
    this.temporaryValue = this.cartService.sumTemporaryValue(this.cart!.products);
  }

  laterBuy(cartItem: HTMLDivElement, index: number){
    this.renderer2.addClass(cartItem, 'cart-item-removed');
    setTimeout(() => {
      this.cart!.products.splice(index, 1);
      this.cartService.set(this.cart);
      this.temporaryValue = this.cartService.sumTemporaryValue(this.cart!.products);
    }, 450);
  }

  changeAddress(){
    if(!this.userInformation){
      this.authService.login('login');
    }else{
      this.dialog.open(AddressChooseComponent, {
        panelClass: 'address-choose',
        data: {
          defaultAddress: this.defaultAddress
        }
      }).afterClosed().subscribe(res=>{
        if(res && res.deliverTo){
          let address: Address = res.deliverTo;
          this.defaultAddress = address;
          this.cartService.setDelivery(this.defaultAddress);
        }
      })
    }
  }

  insertAddress(){
    if(!this.userInformation){
      this.authService.login('login');
    }else{
      this.renderer2.removeClass(this.btnInsertAddress.nativeElement, 'button-substyle');
      this.addressModificationService.openAddressModification('insert', null);
    }
  }

  order(){
    if(!this.userInformation){
      this.authService.login('login');
    }else{
      if(!this.cart.deliverTo){
        this.renderer2.addClass(this.btnInsertAddress.nativeElement, 'button-substyle');
        this.toastService.shortToastWarning('Bạn chưa tạo vị trí nào trong sổ địa chỉ.', '');
      }else{
        if(this.cart.products.length>0){
          this.router.navigate(['/payment-confirm']);
        }
      }
    }
  }

  isNumber(number: any) {
    return !isNaN(number) && isFinite(number)
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
