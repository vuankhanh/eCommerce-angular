import { Component, ElementRef, OnInit, OnDestroy, Renderer2, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { NavigationStart, Event, Router } from '@angular/router';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

//Component
import { AlertTitleComponent } from '../sharing/component/alert-title/alert-title.component'

//Model
import { ProductCategory } from '../models/ProductCategory';
import { UserInformation, JwtDecoded } from '../models/UserInformation';
import { Identification } from '../models/Identification';

//Mock Data
import { Menu, MenusList } from '../mock-data/menu';

//Service
import { HeaderService } from '../services/header.service';
import { Cart, CartService } from '../services/cart.service';
import { UrlChangeService } from '../services/url-change.service';
import { JwtDecodedService } from '../services/jwt-decoded.service';
import { AuthService } from '../services/auth.service';
import { AppServicesService } from '../services/app-services.service';
import { MainContainerScrollService } from '../services/main-container-scroll.service';
import { CheckTokenService } from '../services/api/check-token.service';
import { ConfigService } from '../services/api/config.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('header', { static: false }) header: ElementRef;
  @Output() toggleDrawer = new EventEmitter();
  identification: Identification;
  menusList: Array<Menu>;
  productCategorys: Array<ProductCategory>;
  currentUrl: string = this.router.url;
  badgeCart: number;
  showAlertAddedToCart: boolean = false;
  isMobile: boolean = false;

  isLogin: boolean = false;
  userInformation: UserInformation | null;

  subscription: Subscription = new Subscription();
  constructor(
    private router: Router,
    private ren: Renderer2,
    private bottomSheet: MatBottomSheet,
    public headerService: HeaderService,
    private urlChangeService: UrlChangeService,
    private cartService: CartService,
    private jwtDecodedService: JwtDecodedService,
    public authService: AuthService,
    private appServicesService: AppServicesService,
    private mainContainerScrollService: MainContainerScrollService,
    private checkTokenService: CheckTokenService,
    private configService: ConfigService
  ) {
    this.menusList = MenusList;
    this.appServicesService.productCategory$.subscribe(res=>{
      this.productCategorys = res;
      for(let i in this.menusList){
        if(this.menusList[i].route === 'productions'){
          this.menusList[i].child = this.productCategorys
        }
      }
    })
    this.closeAlertAddedToCart();
    // this.cartService.remove();
  }

  ngOnInit(): void {
    this.cartService.listenCartChange().subscribe((cart: Cart)=>{
      let badgeCart = this.cartService.sumQuantityOfCart(cart.products);
      this.badgeCart = badgeCart;
    });

    this.subscription.add(
      this.urlChangeService.urlChange().subscribe((event: Event)=>{
        if(event instanceof NavigationStart) {
          this.currentUrl = event.url;
        }
      })
    );

    this.listenUserInformation();
    this.listenIsMobile();
  }

  ngAfterViewInit(): void{
    setTimeout(() => {
      this.listentMainContainerScroll();
    }, 300);
  }

  toggleDrawerEmit(){
    this.toggleDrawer.emit();
  }

  listenIsMobile(){
    this.appServicesService.isMobile$.subscribe(res=>{
      this.isMobile = res;
    })
  }

  closeAlertAddedToCart(){
    this.headerService.set(false);
  }

  listentMainContainerScroll(){
    this.subscription.add(
      this.mainContainerScrollService.bScrollTop$.subscribe(position=>{
        this.changeStyleHeader(position);
      })
    )
  }

  changeStyleHeader(index: number): void{
    if(index){
      this.ren.addClass(this.header.nativeElement, 'header-container-scrolled')
    }else{
      this.ren.removeClass(this.header.nativeElement, 'header-container-scrolled');
    }
  }

  listenUserInformation(){
    this.subscription.add(
      this.authService.getUserInformation().subscribe(userInfo=>{
        this.userInformation = userInfo;
      })
    );

    this.subscription.add(
      this.headerService.get().subscribe(res=>{
        if(!res){
          this.showAlertAddedToCart=res;
        }else{
          setTimeout(() => {
            if(res) {
              this.showAlertAddedToCart=res;
              if(this.isMobile){
                this.bottomSheet.open(AlertTitleComponent, {
                  panelClass: 'add-to-card-bottom-sheet'
                });
              }
            }
          }, 1);
        }
      })
    );

    this.subscription.add(
      this.checkTokenService.get().subscribe(res=>{
        this.isLogin = res;
      })
    );

    this.subscription.add(
      this.configService.getConfig().subscribe(res=>{
        this.identification = res.identification;
      })
    );
  }

  decodeJwtUserInfo(accessToken: string){
    let tokenInformation: JwtDecoded = <JwtDecoded>this.jwtDecodedService.jwtDecoded(accessToken);
    this.authService.setUserInformation(tokenInformation.data);
  }

  logout(){
    this.authService.logout();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
