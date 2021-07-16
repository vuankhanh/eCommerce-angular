import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { AddressChooseComponent } from '../../sharing/modal/address-choose/address-choose.component';

import { Address } from 'src/app/models/Address';
import { Product } from 'src/app/models/Product';
import { UserInformation } from 'src/app/models/UserInformation';

import { AuthService } from 'src/app/services/auth.service';
import { Cart, CartService } from 'src/app/services/cart.service';
import { AddressModificationService } from 'src/app/services/address-modification.service';

import { Subscription } from 'rxjs';

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
        if(!this.cart.status){
          this.cart.status = 1;
          this.cartService.setStatus(1);
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
    
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
