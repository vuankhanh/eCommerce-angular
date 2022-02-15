import { AfterViewInit, Component, ElementRef, Inject, isDevMode, OnDestroy, OnInit, PLATFORM_ID, Renderer2, ViewChild } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { AddressChooseComponent } from '../../sharing/modal/address-choose/address-choose.component';
import { WriteRatingComponent } from 'src/app/sharing/modal/write-rating/write-rating.component';
import { ThanksForTheReviewComponent } from 'src/app/sharing/modal/thanks-for-the-review/thanks-for-the-review.component';

//Pipe
import { GalleryRoutePipe } from '../../pipes/gallery-route/gallery-route.pipe';

import { Product } from 'src/app/models/Product';
import { Media } from 'src/app/models/ProductGallery';
import { UserInformation } from 'src/app/models/UserInformation';
import { Address } from 'src/app/models/Address';
import { MetaTagFacebook } from 'src/app/models/MetaTag';
import { Identification } from 'src/app/models/Identification';
import { Rating } from 'src/app/models/ServerConfig';
import { ProductReviews } from 'src/app/models/ProductReviews';
import { PaginationParams } from 'src/app/models/PaginationParams';

import { Cart, CartService } from 'src/app/services/cart.service';
import { ProductReviewsResponse, ProductReviewsService, TotalProductReviews } from 'src/app/services/api/product/product-reviews.service';
import { AuthService } from 'src/app/services/auth.service';
import { AddressModificationService } from 'src/app/services/address-modification.service';
import { ResponseAddress } from 'src/app/services/api/customer-address.service';
import { EstimateFeeService } from 'src/app/services/api/estimate-fee.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { SocketIoService } from 'src/app/services/socket/socket-io.service';
import { SEOService } from 'src/app/services/seo.service';
import { InProgressSpinnerService } from 'src/app/services/in-progress-spinner.service';
import { ConfigService } from 'src/app/services/api/config.service';
import { MainContainerScrollService, DirectionPostion } from 'src/app/services/main-container-scroll.service';

import { combineLatest, of, Subject, Subscription } from 'rxjs';
import { filter, map, switchMap, take, takeUntil, tap } from 'rxjs/operators';

const headerOffset = 85;
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('listImg') listImg: ElementRef;
  @ViewChild('mainContainer') mainContainer: ElementRef;
  currentUrl: string;

  isBrowser: boolean;

  playerVars = {
    cc_lang_pref: 'en',
  };

  arrYoutube: Array<PlayerObject> = [];

  detailId: string;
  userInformation: UserInformation | null;
  product: Product;
  productReviews: Array<ProductReviews>;
  configPagination: PaginationParams | undefined;
  productReviewsResponse: ProductReviewsResponse;
  totalProductReviews: TotalProductReviews = {
    totalProductReviewsReponse: {
      level1: 0,
      level2: 0,
      level3: 0,
      level4: 0,
      level5: 0,
    },
    totalRating: 0,
    existRating: 0,
    averageRating: 0
  }
  cart: Cart;

  estimateFeeInfo: any = null;
  estimateFeeError: any;
  
  imgMain: Media;
  indexImgMain: number = 0;
  headquartersAddress: Address;

  identification: Identification;
  rating: Array<Rating>;

  subscription: Subscription = new Subscription();
  scrollToBottomMainContainer: Subject<null> = new Subject<null>();
  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    @Inject(DOCUMENT) private _document: Document,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private renderer2: Renderer2,
    private dialog: MatDialog,
    private galleryRoutePipe: GalleryRoutePipe,
    private productReviewsService: ProductReviewsService,
    private cartService: CartService,
    private authService: AuthService,
    private addressModificationService: AddressModificationService,
    private estimateFeeService: EstimateFeeService,
    private localStorageService: LocalStorageService,
    private socketIoService: SocketIoService,
    private seoService: SEOService,
    private inProgressSpinnerService: InProgressSpinnerService,
    private configService: ConfigService,
    private mainContainerScrollService: MainContainerScrollService,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.currentUrl = window.location.href;
  }

  ngOnInit(): void {
    const activatedRouteData$ = this.activatedRoute.data.pipe(
      map(data => data.product)
    )
    const cartChange$ = this.cartService.listenCartChange();
    const userInformation$ = this.authService.getUserInformation();
    this.subscription.add(
      combineLatest(
        [
          userInformation$,
          cartChange$,
          activatedRouteData$
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
          this.setProductDetail(productDetail)
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
      },error=>{
        console.log(error);
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

    this.listenConfig();
  }

  listenConfig(){
    this.configService.getConfig().subscribe(res=>{
      this.identification = res.identification;
      this.rating = res.rating
    })
  }

  ngAfterViewInit(){
    
  }

  listenScroll(product: Product, paginationParams?: PaginationParams){
    this.configPagination = paginationParams;
    var body = document.body,
    html = document.documentElement;

    var height = Math.max(
      body.scrollHeight,
      body.offsetHeight, 
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );

    const getTotalProductReview$ = this.productReviewsService.getTotal(product._id);
    const getProductReviews$ = this.productReviewsService.get(product._id, paginationParams);

    this.subscription.add(
      this.mainContainerScrollService.listenScrollTop$.pipe(
        map(pos=>{
          let mainContainer: HTMLDivElement = this.mainContainer ? this.mainContainer.nativeElement : null;
          return {
            pos,
            mainContainer
          }
        }),
        filter(data=>{
          if(data.mainContainer){
            let bottomElement: number = data.mainContainer.offsetTop + data.mainContainer.offsetHeight;
            let total: number = data.pos+height;
            if(total>=bottomElement){
              return true;
            }else{
              return false;
            }
          }else{
            return false;
          }
        }),
        take(1),
        switchMap((data)=>combineLatest([getTotalProductReview$, getProductReviews$, of(data.mainContainer)])),
        takeUntil(this.scrollToBottomMainContainer)
      ).subscribe(([productReviewsTotal ,productReviews, mainContainer])=>{
        if(productReviews){
          if(this.configPagination){
            let directionPostion: DirectionPostion = {
              direction: 'y',
              position: mainContainer.offsetTop - headerOffset
            }
            this.mainContainerScrollService.setDirectionPosition(directionPostion)
          }
          this.productReviewsResponse = productReviews;
          this.configPagination = {
            totalItems: this.productReviewsResponse.totalItems,
            page: this.productReviewsResponse.page-1,
            size: this.productReviewsResponse.size,
            totalPages: this.productReviewsResponse.totalPages
          };
          this.productReviews = this.productReviewsResponse.data;
        }

        if(productReviewsTotal){
          this.totalProductReviews = productReviewsTotal;
        }
      })
    )
  }

  changeIndex(index: number){
    this.configPagination!.page = index;
    this.listenScroll(this.product, this.configPagination);
  }

  dosomething(event: any){
    let img: HTMLImageElement = <HTMLImageElement>event.target;
    if(img){
      let src: string = img.src;
    }
  }

  setProductDetail(product: Product){
    if(product){
      if(!this.product || this.product._id != product._id){
        this.product = product;
        if(this.isBrowser){
          this.listenScroll(this.product);
        }
        if(!isDevMode() && this.isBrowser){
          let script = this.renderer2.createElement('script');
          script.type = `text/javascript`;
          script.text = `fbq('track', 'ViewContent',{
            _id: '${this.product._id}',
            name: '${this.product.name}',
            price: ${this.product.price},
            quantity: ${this.product.quantity},
            theRemainingAmount: ${this.product.theRemainingAmount}
          });`;
          this.renderer2.appendChild(this._document.head, script);
        }

        let images = this.product.albumImg?.media.map(media=>"\""+this.galleryRoutePipe.transform(media.src)+"\"");

        let googleSchemaScript = this.renderer2.createElement('script');
        googleSchemaScript.type = 'application/ld+json';
        googleSchemaScript.text = `{
          "@context": "https://schema.org/",
          "@type": "Product",
          "name": "${this.product.name}",
          "image": [${images}],
          "description": "${this.product.sortDescription}",
          "brand": {
            "@type": "Brand",
            "name": "Thủy hải sản Carota"
          },
          "offers": {
            "@type": "Offer",
            "url": "${this.currentUrl}",
            "priceCurrency": "${this.product.currencyUnit}",
            "price": "${this.product.price}",
            "priceValidUntil": "N/A",
            "itemCondition": "https://schema.org/UsedCondition",
            "availability": "https://schema.org/InStock"
          }
        }`;
        this.renderer2.appendChild(this._document.head, googleSchemaScript);

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
          url: this.currentUrl,
          description: this.product.sortDescription,

          productBrand: 'Thủy hải sản Carota',
          productAvailability: 'in stock',
          productCondition: 'new',
          productPriceAmount: this.product.price.toString(),
          productPriceCurrency: this.product.currencyUnit,
          productRetailerItemId: this.product.route,
          productItemGroupId: this.product.category.route,
          googleProductCategory: this.product.category.googleProductCategory,
        }
        this.seoService.updateTitle(this.product.name);
        this.seoService.updateMetaTagFacebook(metaTagFacebook);
      }
    }
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

          this.listImg.nativeElement.scrollTo({ left: this.indexImgMain*elementId.offsetWidth,  behavior: "smooth"});
        }
      }else if(direction === 'toRight'){
        if(this.imgMain._id != this.product?.albumImg?.media[this.product?.albumImg?.media.length-1]._id){
          this.indexImgMain++;
          this.product?.albumImg?.media[this.indexImgMain] ? this.imgMain = this.product?.albumImg?.media[this.indexImgMain] : this.product?.albumImg?.media[0];
          const elementId = window.document.getElementById("list-item-"+this.indexImgMain)! as HTMLDivElement;

          this.listImg.nativeElement.scrollTo({ left: this.indexImgMain*elementId.offsetWidth,  behavior: "smooth"})
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

  bookNow(product: Product){
    this.cartService.addToCart(product, false);
    this.router.navigate(['/cart']);
  }

  addToCart(product: Product){
    this.cartService.addToCart(product, true);
    if(!isDevMode() && this.isBrowser){
      let script = this.renderer2.createElement('script');
      script.type = `text/javascript`;
      script.text = `fbq('track', 'AddToCart',{
        _id: '${this.product._id}',
        name: '${this.product.name}',
        price: ${this.product.price},
        quantity: ${this.product.quantity},
        theRemainingAmount: ${this.product.theRemainingAmount}
      });`;
      this.renderer2.appendChild(this._document.head, script);
    }
  }

  openWriteReviews(){
    this.subscription.add(
      this.dialog.open(WriteRatingComponent, {
        panelClass: 'write-rating-component',
        disableClose: true,
        data: this.product
      }).afterClosed().subscribe(res=>{
        if(res){
          this.openThanksForTheReview(res);
        }
      })
    )
  }

  openThanksForTheReview(productReviews: ProductReviews){
    this.dialog.open(ThanksForTheReviewComponent, {
      panelClass: 'thanks-for-the-review-component',
      data: productReviews
    })
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
