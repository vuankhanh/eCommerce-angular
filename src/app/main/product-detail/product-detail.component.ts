import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { AddressChooseComponent } from '../../sharing/modal/address-choose/address-choose.component';

import { Product } from 'src/app/models/Product';
import { Media } from 'src/app/models/ProductGallery';
import { UserInformation } from 'src/app/models/UserInformation';
import { Address } from 'src/app/models/Address';

import { Cart, CartService } from 'src/app/services/cart.service';
import { HeaderService } from 'src/app/services/header.service';
import { ProductService } from 'src/app/services/api/product/product.service';
import { AuthService } from 'src/app/services/auth.service';
import { AddressModificationService } from 'src/app/services/address-modification.service';
import { ResponseAddress } from 'src/app/services/api/customer-address.service';
import { EstimateFeeService } from 'src/app/services/api/estimate-fee.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

import { combineLatest, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('listImg') listImg: ElementRef;
  detailId: string;
  userInformation: UserInformation | null;
  product: Product;
  cart: Cart;

  estimateFeeInfo: any = null;
  estimateFeeError: any;
  
  imgMain: Media;
  indexImgMain: number = 0;
  headquartersAddress: Address;

  userInformation$: Observable<UserInformation | null>;
  cartChange$: Observable<Cart>;

  getProductDetail$: Observable<Product>;
  subscription: Subscription = new Subscription();
  constructor(
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private headerService: HeaderService,
    private productService: ProductService,
    private cartService: CartService,
    private authService: AuthService,
    private addressModificationService: AddressModificationService,
    private estimateFeeService: EstimateFeeService,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    let detailId: string = this.activatedRoute.snapshot.params.detail;

    this.cartChange$ = this.cartService.listenCartChange();
    this.userInformation$ = this.authService.getUserInformation();
    this.getProductDetail$ = this.productService.getProductDetail(detailId);

    this.subscription.add(
      combineLatest(
        [
          this.userInformation$,
          this.cartChange$,
          this.getProductDetail$
        ]
      ).subscribe(([userInfo, cart, productDetail])=>{
        if(userInfo){
          this.userInformation = userInfo;
        }
  
        this.cart = cart;
        if(this.cart.deliverTo){
          this.headquartersAddress = this.cart.deliverTo;
        }

        if(productDetail){
          this.product = productDetail;
          this.product.quantity = 1;
          let index: number = this.product.albumImg!.media.findIndex(media=>media.isMain);
          index >= 0 ?  this.setImgMain(index) : this.setImgMain(0);
        }
  
        if(userInfo && this.cart.deliverTo && this.product){
          let tokenStoraged = this.localStorageService.get(this.localStorageService.tokenStoragedKey);
          if(tokenStoraged && tokenStoraged.accessToken){
            let estimateFee$ = this.estimateFeeService.getEstimateFee(tokenStoraged.accessToken, this.cart.deliverTo._id!, this.product.price);
            this.subscription.add(
              estimateFee$.subscribe(res=>{
                if(res){
                  this.estimateFeeInfo = res;
                  console.log(this.estimateFeeInfo);
                  
                  this.estimateFeeError = null;
                }
              }, error=>{
                console.log(error);
                
                this.estimateFeeInfo = null;
                this.estimateFeeError = {
                  desc: 'AhaMove hiện tại không hỗ trợ vận chuyển đến địa chỉ của bạn vì thế Carota sẽ liên hệ với bạn và chuẩn bị một hình thức vận chuyển khác.'
                }
                // if(error.status === 406){
                //   if(error.error.code === 'INVALID_DISTANCE'){
                //     this.estimateFeeError = {
                //       desc: 'AhaMove hiện tại không hỗ trợ vận chuyển đến địa của bạn vì thế Carota sẽ liên hệ với bạn và chuẩn bị một hình thức vận chuyển khác.'
                //     }
                //   }
                // }
              })
            )
          }
        }
      })
    )

  }

  ngAfterViewInit(){
  }

  setImgMain(index: number){
    this.indexImgMain = index;
    this.imgMain = this.product.albumImg!.media[index];
  }

  setImgMainDirection(direction: string){
    if(direction === 'toLeft'){
      if(this.imgMain._id != this.product?.albumImg?.media[0]._id){
        this.indexImgMain--;
        this.product?.albumImg?.media[this.indexImgMain] ? this.imgMain = this.product?.albumImg?.media[this.indexImgMain] : this.product?.albumImg?.media[0];
        const elementId = window.document.getElementById("list-item-"+this.indexImgMain)! as HTMLDivElement;
        this.listImg.nativeElement.scrollTo({ left: elementId.offsetLeft-10,  behavior: "smooth"});
      }
    }else if(direction === 'toRight'){
      if(this.imgMain._id != this.product?.albumImg?.media[this.product?.albumImg?.media.length-1]._id){
        this.indexImgMain++;
        this.product?.albumImg?.media[this.indexImgMain] ? this.imgMain = this.product?.albumImg?.media[this.indexImgMain] : this.product?.albumImg?.media[0];
        const elementId = window.document.getElementById("list-item-"+this.indexImgMain)! as HTMLDivElement;
        
        this.listImg.nativeElement.scrollTo({ left: elementId.offsetLeft-10,  behavior: "smooth"})
      }
    }else{
      console.log('Hướng không xác định');
    }
  }

  chooseAddress(headquartersAddress: Address){
    if(!this.userInformation){
      this.authService.login('login');
    }else{
      this.subscription.add(
        this.dialog.open(AddressChooseComponent, {
          panelClass: 'address-choose',
          data: {
            defaultAddress: headquartersAddress
          }
        }).afterClosed().subscribe(res=>{
          if(res && res.deliverTo){
            let address: Address = res.deliverTo;
            this.headquartersAddress = address;
            this.cartService.setDelivery(this.headquartersAddress);
          }
        })
      )
    }
  }

  insertAddress(){
    if(!this.userInformation){
      this.authService.login('login');
    }else{
      this.subscription.add(
        this.addressModificationService.openAddressModification('insert', null).subscribe(res=>{
          if(res){
            let responseAddress: ResponseAddress = res;
            let address: Address = responseAddress.address[0];
            this.cartService.setDelivery(address);
          }
        })
      );
    }
  }

  changeQuantity(increase: 'increase' | 'decrease'){
    if(increase === 'increase'){
      this.product.quantity!++;
    }else{
      if(this.product.quantity! > 1){
        this.product.quantity!--;
      }
    }
  }

  quantityInputChange(event: Event){
    let value = (event.target as HTMLInputElement).value;
    this.product.quantity = !isNaN(parseInt(value)) ? parseInt(value) : 1;
  }

  addToCart(product: Product){
    this.cartService.addToCart(product);
    this.headerService.set(true);
  }

  login(){
    this.authService.login('login');
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
