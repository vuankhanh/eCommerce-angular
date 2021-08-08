import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';

import { ProductCategory } from '../models/ProductCategory';
import { UserInformation } from '../models/UserInformation';
import { Identification } from '../models/Identification';

//Mock Data
import { CustomerMenu, Menu, MenusList } from '../mock-data/menu';

import { AppServicesService } from '../services/app-services.service';
import { AuthService } from '../services/auth.service';
import { CheckTokenService } from '../services/api/check-token.service';
import { ConfigService } from '../services/api/config.service';

import { Subscription } from 'rxjs';
import { Cart, CartService } from '../services/cart.service';
import { UrlChangeService } from '../services/url-change.service';
import { Event, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss']
})
export class DrawerComponent implements OnInit {
  @ViewChild('accordion') accordion: MatAccordion;
  @ViewChild('userAccordion') userAccordion: MatAccordion;
  @Output() toggleDrawer = new EventEmitter();
  identification: Identification;
  menusList: Array<Menu>;
  customerMenu: Array<Menu>;
  productCategorys: Array<ProductCategory>;
  badgeCart: number;
  currentUrl: string = this.router.url;

  isLogin: boolean = false;
  userInformation: UserInformation | null;

  subscription: Subscription = new Subscription();
  constructor(
    private router: Router,
    private urlChangeService: UrlChangeService,
    private appServicesService: AppServicesService,
    private authService: AuthService,
    private checkTokenService: CheckTokenService,
    private configService: ConfigService,
    private cartService: CartService
  ) {
    this.menusList = MenusList;
    this.customerMenu = CustomerMenu;
    this.appServicesService.productCategory$.subscribe(res=>{
      this.productCategorys = res;
      for(let i in this.menusList){
        if(this.menusList[i].route === 'productions'){
          this.menusList[i].child = this.productCategorys;
        }
      }
    })
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
  }

  listenUserInformation(){
    this.subscription.add(
      this.authService.getUserInformation().subscribe(userInfo=>{
        this.userInformation = userInfo;
        console.log(this.userInformation);
        
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
        console.log(this.identification);
      })
    );
  }

  navigationMenuItem(length: number, url: string){
    if(length === 0){
      this.closeSideMenu();
      this.router.navigate([url]);
    }
  }

  closeSideMenu(){
    this.accordion.closeAll();
    this.userAccordion.closeAll();
    this.toggleDrawer.emit();
  }

  login(type: 'login' | 'register'){
    this.authService.login(type);
    this.closeSideMenu();
  }

  logout(){
    this.closeSideMenu();
    this.authService.logout();
  }

}
