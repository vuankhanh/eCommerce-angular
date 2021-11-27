<<<<<<< HEAD
import { Component, ElementRef, Inject, OnDestroy, OnInit, PLATFORM_ID, Renderer2, ViewChild } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
=======
import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
>>>>>>> eb644a7f4fa094aaf7ca075300a9b1dcac009f60
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { AddressChooseComponent } from '../../sharing/modal/address-choose/address-choose.component';

import { Address } from 'src/app/models/Address';
import { Product } from 'src/app/models/Product';
import { UserInformation } from 'src/app/models/UserInformation';
<<<<<<< HEAD
=======
import { ResponseLogin } from 'src/app/services/api/login.service';
>>>>>>> eb644a7f4fa094aaf7ca075300a9b1dcac009f60

import { AuthService } from 'src/app/services/auth.service';
import { Cart, CartService } from 'src/app/services/cart.service';
import { AddressModificationService } from 'src/app/services/address-modification.service';
import { ToastService } from 'src/app/services/toast.service';
<<<<<<< HEAD
=======
import { LocalStorageService } from 'src/app/services/local-storage.service';
>>>>>>> eb644a7f4fa094aaf7ca075300a9b1dcac009f60
import { CartApiService } from 'src/app/services/api/cart-api.service';
import { SocketIoService } from 'src/app/services/socket/socket-io.service';

import { Subscription } from 'rxjs';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
  @ViewChild('btnInsertAddress') btnInsertAddress: ElementRef;
<<<<<<< HEAD

  private isBrowser: boolean;

=======
>>>>>>> eb644a7f4fa094aaf7ca075300a9b1dcac009f60
  cart: Cart;
  temporaryValue: number = 0;
  totalBill: number = 0;

  userInformation: UserInformation | null;
  defaultAddress: Address;

  subscription: Subscription = new Subscription();
  constructor(
<<<<<<< HEAD
    @Inject(PLATFORM_ID) platformId: Object,
=======
>>>>>>> eb644a7f4fa094aaf7ca075300a9b1dcac009f60
    private router: Router,
    private dialog: MatDialog,
    private renderer2: Renderer2,
    private cartService: CartService,
    private authService: AuthService,
    private addressModificationService: AddressModificationService,
    private toastService: ToastService,
<<<<<<< HEAD
    private cartApiService: CartApiService,
    private socketIoService: SocketIoService
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }
=======
    private localStorageService: LocalStorageService,
    private cartApiService: CartApiService,
    private socketIoService: SocketIoService
  ) { }
>>>>>>> eb644a7f4fa094aaf7ca075300a9b1dcac009f60

  ngOnInit(): void {
    this.initCart();
    this.listenUserInformation();
<<<<<<< HEAD
    if(this.isBrowser){
      this.listenSocketDataProduct();
    }
=======
    this.listenSocketDataProduct();
    // this.localStorageService.remove('carota-cart');
>>>>>>> eb644a7f4fa094aaf7ca075300a9b1dcac009f60
  }

  initCart(){
    this.subscription.add(
      this.cartService.listenCartChange().subscribe(cart=>{
        this.cart = cart;
        this.temporaryValue = this.cartService.sumTemporaryValue(this.cart.products);
        if(this.cart.products.length>0){
          this.cartApiService.getTotalBill(this.cart.products).subscribe(res=>{
            this.totalBill = res.totalBill;
          },error=>{
            this.totalBill = 0;
          })
          if(this.cart.deliverTo){
            this.defaultAddress = this.cart.deliverTo;
          }
        }
      })
    )
  }

  listenUserInformation(){
    this.subscription.add(
      this.authService.getUserInformation().subscribe(userInfo=>{
        this.userInformation = userInfo;
      })
    )
  }

  listenSocketDataProduct(){
    this.subscription.add(
      this.socketIoService.theRemainingAmoutChange$().subscribe(socketData=>{
        if(this.cart){
          let products: Array<Product> = this.cart.products;
          if(products && products.length>0){
            let index: number = products.findIndex(product=>product._id === socketData.product._id);
            if(index >= 0){
              products[index].theRemainingAmount = socketData.product.theRemainingAmount;
              this.cartService.setProduct(products);
            }
          }
        }
      })
    )
  }

  changeQuantity(increase: boolean, index: number){
    let products: Array<Product> = this.cart.products;
    if(increase){
      if(products[index].quantity! < products[index].theRemainingAmount){
        products[index].quantity!++;
      }else{
        this.toastService.shortToastWarning(products[index].name+ ' chỉ còn '+products[index].theRemainingAmount+ ' sản phẩm', '');
      }
    }else{
      if(products[index].quantity! > 1){
        products[index].quantity!--;
      }
    }
    this.cartService.setProduct(products);
    this.temporaryValue = this.cartService.sumTemporaryValue(this.cart!.products);
  }

  showDetail(product: Product){
    this.router.navigate(['productions/'+product.category.route, product._id]);
  }

  quantityInputChange(event: Event, index: number){
    let value = (event.target as HTMLInputElement).value;
    
    let products: Array<Product> = this.cart.products;
    if(this.isNumber(value)){
      if(products[index].quantity! <= products[index].theRemainingAmount){
        products[index].quantity = parseInt(value);
      }else{
        products[index].quantity = products[index].theRemainingAmount;
        this.toastService.shortToastWarning(products[index].name+ ' chỉ còn '+products[index].theRemainingAmount+ ' sản phẩm', '');
      }
    }else{
      products[index].quantity = 1;
    }
    this.cartService.setProduct(products);
    this.temporaryValue = this.cartService.sumTemporaryValue(products);
  }

  laterBuy(cartItem: HTMLDivElement, index: number){
    this.renderer2.addClass(cartItem, 'cart-item-removed');
    setTimeout(() => {
      let products: Array<Product> = this.cart.products;
      products.splice(index, 1);
      this.cartService.setProduct(products);
      this.temporaryValue = this.cartService.sumTemporaryValue(products);
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
          let checkMatchingQuantity = this.cartService.checkMatchingQuantity();

          if(checkMatchingQuantity.length === 0){
            this.router.navigate(['/payment-confirm']);
          }else{
            alert(checkMatchingQuantity)
          }
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
