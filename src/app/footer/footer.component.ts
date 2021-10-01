import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Event, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';
import { Menu, MenusList, SupportMenu } from '../mock-data/menu';

import { Identification } from '../models/Identification';
import { ProductCategory } from '../models/ProductCategory';

import { ConfigService } from '../services/api/config.service';
import { AppServicesService } from '../services/app-services.service';
import { Cart, CartService } from '../services/cart.service';
import { HeaderService } from '../services/header.service';
import { UrlChangeService } from '../services/url-change.service';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  @Output() toggleDrawer = new EventEmitter();
  identification: Identification;
  currentUrl: string;
  activeLink: string;
  badgeCart: number;
  menusList: Array<Menu>;
  supportMenu: Array<Menu>;
  productCategorys: Array<ProductCategory>;

  subscription: Subscription = new Subscription();
  constructor(
    private configService: ConfigService,
    private headerService: HeaderService,
    private cartService: CartService,
    private urlChangeService: UrlChangeService,
    private appServicesService: AppServicesService
  ) {
    this.menusList = MenusList;
    this.appServicesService.productCategory$.subscribe(res=>{
      this.productCategorys = res;
      for(let i in this.menusList){
        if(this.menusList[i].route === 'productions'){
          this.menusList[i].child = this.productCategorys
        }
      }
    });

    this.supportMenu = SupportMenu;
  }

  ngOnInit(): void {
    this.cartService.listenCartChange().subscribe((cart: Cart)=>{
      let badgeCart = this.cartService.sumQuantityOfCart(cart.products);
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

    this.listenConfig();
  }

  
  listenConfig(){
    this.configService.getConfig().subscribe(res=>{
      this.identification = res.identification;
    })
  }

  closeAlertAddedToCart(){
    this.headerService.set(false);
  }

  toggleDrawerEmit(){
    this.toggleDrawer.emit();
  }
}
