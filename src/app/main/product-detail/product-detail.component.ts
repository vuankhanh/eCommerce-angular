import { AfterViewInit, Component, ElementRef, Inject, OnDestroy, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { AddressChooseComponent } from '../../sharing/modal/address-choose/address-choose.component';

//Pipe
import { GalleryRoutePipe } from '../../pipes/gallery-route/gallery-route.pipe';

import { Product } from 'src/app/models/Product';
import { Media } from 'src/app/models/ProductGallery';
import { UserInformation } from 'src/app/models/UserInformation';
import { Address } from 'src/app/models/Address';
import { MetaTagFacebook } from 'src/app/models/MetaTag';

import { Cart, CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/api/product/product.service';
import { AuthService } from 'src/app/services/auth.service';
import { AddressModificationService } from 'src/app/services/address-modification.service';
import { ResponseAddress } from 'src/app/services/api/customer-address.service';
import { EstimateFeeService } from 'src/app/services/api/estimate-fee.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { SocketIoService } from 'src/app/services/socket/socket-io.service';
import { SEOService } from 'src/app/services/seo.service';

import { combineLatest, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('listImg') listImg: ElementRef;

  private isBrowser: boolean;

  playerVars = {
    cc_lang_pref: 'en',
  };

  arrYoutube: Array<PlayerObject> = [];

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
    @Inject(PLATFORM_ID) platformId: Object,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private galleryRoutePipe: GalleryRoutePipe,
    private productService: ProductService,
    private cartService: CartService,
    private authService: AuthService,
    private addressModificationService: AddressModificationService,
    private estimateFeeService: EstimateFeeService,
    private localStorageService: LocalStorageService,
    private socketIoService: SocketIoService,
    private seoService: SEOService,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    let route: string = this.activatedRoute.snapshot.params.route;

    this.cartChange$ = this.cartService.listenCartChange();
    this.userInformation$ = this.authService.getUserInformation();
    this.getProductDetail$ = this.productService.getProductRoute(route);

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
          if(!this.product.quantity){
            this.product.quantity = 1;
          }
          let index: number = this.product.albumImg!.media.findIndex(media=>media.isMain);
          index >= 0 ?  this.setImgMain(index) : this.setImgMain(0);
          
          let metaTagFacebook: MetaTagFacebook = {
            title: this.product.name,
            image: this.galleryRoutePipe.transform(this.product.thumbnailUrl),
            imageAlt: this.product.name,
            imageType: 'image/png',
            imageWidth: '100',
            imageHeight: '100',
            url: window.location.href,
            description: this.product.sortDescription
          }
          this.seoService.updateTitle(this.product.name);
          this.seoService.updateMetaTagFacebook(metaTagFacebook);

        }
  
        if(userInfo && this.cart.deliverTo && this.product){
          let tokenStoraged = this.localStorageService.get(this.localStorageService.tokenStoragedKey);
          if(tokenStoraged && tokenStoraged.accessToken){
            let estimateFee$ = this.estimateFeeService.getEstimateFee(tokenStoraged.accessToken, this.cart.deliverTo._id!, this.product.price);
            this.subscription.add(
              estimateFee$.subscribe(res=>{
                if(res){
                  this.estimateFeeInfo = res;
                  
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
    );
    
    if(this.isBrowser){
      this.subscription.add(
        this.socketIoService.theRemainingAmoutChange$().subscribe(socketData=>{
          if(this.product){
            if(this.product._id === socketData.product._id){
              this.product.theRemainingAmount = socketData.product.theRemainingAmount;
            }
          }
        })
      )
    }
  }

  ngAfterViewInit(){
  }

  setImgMain(index: number){
    this.indexImgMain = index;
    this.imgMain = this.product.albumImg!.media[index];
  }

  setImgMainDirection(direction: string){
    if(this.isBrowser){
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
  }

  login(){
    this.authService.login('login');
  }

  onStateChange(event: any, index: number) {
    if(event.data === 1){
      this.arrYoutube.forEach(objPlayer=>{
        if(objPlayer.index != index){
          objPlayer.player.pauseVideo();
        }
      })
    }
  }

  savePlayer(player: any, index: number) {
    let object: PlayerObject={
      player,
      index
    }
    this.arrYoutube.push(object);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}

interface PlayerObject{
  player: any,
  index: number
}
