import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { AddressChooseComponent } from '../../sharing/modal/address-choose/address-choose.component';
import { PaymentSuccessfulComponent } from '../../sharing/modal/payment-successful/payment-successful.component';

import { Address } from 'src/app/models/Address';
import { Product } from 'src/app/models/Product';
import { UserInformation } from 'src/app/models/UserInformation';

import { AuthService } from 'src/app/services/auth.service';
import { Cart, CartService } from 'src/app/services/cart.service';
import { AddressModificationService } from 'src/app/services/address-modification.service';
import { OrderService } from 'src/app/services/api/order.service';
import { ResponseLogin } from 'src/app/services/api/login.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ToastService } from 'src/app/services/toast.service';

import { Subscription } from 'rxjs';

const tokenStoragedKey = 'carota-token';
@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.scss']
})
export class PaymentPageComponent implements OnInit, OnDestroy {
  @ViewChild('btnInsertAddress') btnInsertAddress: ElementRef;

  displayedColumns: string[] = ['numericalOrder', 'thumbnail', 'name', 'price', 'quantity'];
  cart: Cart;
  userInformation: UserInformation | null;
  defaultAddress: Address;
  temporaryValue: number = 0;
  subscription: Subscription = new Subscription();
  constructor(
    private router: Router,
    private dialog: MatDialog,
    private renderer2: Renderer2,
    private cartService: CartService,
    private authService: AuthService,
    private addressModificationService: AddressModificationService,
    private orderService: OrderService,
    private localStorageService: LocalStorageService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.initCart();
    this.listenUserInformation();
  }

  initCart(){
    this.subscription.add(
      this.cartService.listenCartChange().subscribe(cart=>{
        this.cart = cart;
        console.log(this.cart)
        this.temporaryValue = this.cartService.sumTemporaryValue(this.cart.products);
        if(this.cart.deliverTo){
          this.defaultAddress = this.cart.deliverTo;
        }
      })
    )
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

  showDetail(product: Product){
    this.router.navigate(['productions/'+product.category.route, product._id]);
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
        console.log(this.cart.deliverTo);
      }
    })
  }

  insertAddress(){
    this.renderer2.removeClass(this.btnInsertAddress.nativeElement, 'button-substyle');
    this.addressModificationService.openAddressModification('insert', null).subscribe(address=>{
      console.log(address);
    })
  }

  confirmPayment(){
    let tokenStoraged: ResponseLogin = <ResponseLogin>this.localStorageService.get(tokenStoragedKey);
    if(tokenStoraged && tokenStoraged.accessToken){
      this.subscription.add(
        this.orderService.insert(tokenStoraged.accessToken, this.cart).subscribe(async order=>{
          await this.router.navigate(['/productions']);
          this.cartService.resetProduct();
          this.dialog.open(PaymentSuccessfulComponent,
            {
              panelClass: 'payment-success-modal',
              data: order,
              autoFocus: false
            }
          ).afterClosed().subscribe(res=>{
            let result: 'goProduct' | 'goOrderHistory' = res;
            if(result === 'goOrderHistory'){
              this.router.navigate(['/customer/order-history']);
            }
          })
        },error=>{
          this.toastService.shortToastError(error.error.message, 'Đã có lỗi xảy ra');
        })
      )
    }
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
