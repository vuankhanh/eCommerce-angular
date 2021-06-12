import { Component, ElementRef, OnInit, OnDestroy, Renderer2, ViewChild, AfterViewInit } from '@angular/core';
import { NavigationStart, Event } from '@angular/router';


import { CartService } from '../services/cart.service';
import { UrlChangeService } from '../services/url-change.service';
import { JwtDecodedService } from '../services/jwt-decoded.service';
import { LocalStorageService } from '../services/local-storage.service';
import { ResponseLogin } from '../services/api/login.service';
import { AuthService } from '../services/auth.service';
import { ConfigService } from '../services/api/config.service';

//Mock Data
import { Menu, MenusList } from '../mock-data/menu';
import { ProductCategorys, ProductCategory } from '../mock-data/products-category';
import { Product } from '../mock-data/products';

//Model
import { UserInformation, JwtDecoded } from '../models/UserInformation';

import { Subscription } from 'rxjs';

const tokenStoragedKey = 'carota-token';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('header', { static: false }) header: ElementRef;
  @ViewChild('alertAddedToCart') alertAddedToCart: ElementRef;
  menusList: Array<Menu>;
  productCategorys: Array<ProductCategory>;
  prevButtonTrigger: any;
  currentUrl: string;
  activeLink: string;
  badgeCart: number;
  showAlertAddedToCart: boolean = false;

  isLogged: boolean = false;
  userInformation: UserInformation | null;

  subscription: Subscription = new Subscription();
  constructor(
    private ren: Renderer2,

    private urlChangeService: UrlChangeService,
    private cartService: CartService,
    private jwtDecodedService: JwtDecodedService,
    private localStorageService: LocalStorageService,
    public authService: AuthService,
    private configService: ConfigService,
  ) {
    this.menusList = MenusList;
    this.productCategorys = ProductCategorys;
    this.closeAlertAddedToCart();
  }

  ngOnInit(): void {
    window.addEventListener('scroll', this.scroll, true);

    this.cartService.listenCartChange().subscribe((productStoraged: Array<Product>)=>{
      let badgeCart = this.cartService.sumQuantityOfCart(productStoraged);
      if(this.badgeCart < badgeCart && this.badgeCart != undefined){
        setTimeout(() => {
          this.showAlertAddedToCart = true;
        }, 1);
      }
      this.badgeCart = badgeCart;
    });

    this.subscription.add(
      this.urlChangeService.urlChange().subscribe((event: Event)=>{
        if(event instanceof NavigationStart) {
          this.currentUrl = event.url.split("/")[1] ? event.url.split("/")[1] : '';
          this.activeLink = this.currentUrl === 'productions' ? event.url.split("/")[2] ? event.url.split("/")[2] : this.productCategorys[0].route : '';
        }
      })
    );

    this.listenUserInformation();
  }

  ngAfterViewInit(): void{

  }

  closeAlertAddedToCart(){
    this.showAlertAddedToCart = false;
  }

  scroll = (event: any): void => {
    let index: number = event.srcElement.scrollingElement?.scrollTop;
    this.changeStyleHeader(index);
    //handle your scroll here
    //notice the 'odd' function assignment to a class field
    //this is used to be able to remove the event listener
  };

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
    )
  }

  decodeJwtUserInfo(accessToken: string){
    let tokenInformation: JwtDecoded = <JwtDecoded>this.jwtDecodedService.jwtDecoded(accessToken);
    console.log(tokenInformation);
    this.authService.setUserInformation(tokenInformation.data);
  }

  logout(){
    this.authService.logout();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    window.removeEventListener('scroll', this.scroll, true);
  }
}
