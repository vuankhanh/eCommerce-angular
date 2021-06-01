import { Component, ElementRef, OnInit, OnDestroy, Renderer2, ViewChild, AfterViewInit } from '@angular/core';
import { MenusList } from '../mock-data/menu';
import { NavigationStart, Event } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MainComponent, TypeLogin } from '../sharing/modal/main/main.component';

import { CartService } from '../services/cart.service';
import { UrlChangeService } from '../services/url-change.service';
import { ProductCategorys, ProductCategory } from '../mock-data/products-category';

import { Subscription } from 'rxjs';

import { Product } from '../mock-data/products';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('header', { static: false }) header: ElementRef;
  @ViewChild('alertAddedToCart') alertAddedToCart: ElementRef;
  menusList: Array<any>;
  productCategorys: Array<ProductCategory>;
  prevButtonTrigger: any;
  currentUrl: string;
  activeLink: string;
  badgeCart: number;
  showAlertAddedToCart: boolean = false;

  isLogged: boolean = false;

  subscriptionUrlChange: Subscription = new Subscription();
  constructor(
    private ren: Renderer2,
    private dialog: MatDialog,
    private urlChangeService: UrlChangeService,
    private cartService: CartService
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

    this.subscriptionUrlChange.add(
      this.urlChangeService.urlChange().subscribe((event: Event)=>{
        if(event instanceof NavigationStart) {
          this.currentUrl = event.url.split("/")[1] ? event.url.split("/")[1] : '';
          this.activeLink = this.currentUrl === 'productions' ? event.url.split("/")[2] ? event.url.split("/")[2] : this.productCategorys[0].route : '';
        }
      })
    );
  }

  ngAfterViewInit(): void{
    this.login('login');
    // this.login('register');
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

  login(type: string){
    if(type === 'login' || type === 'register' || type === 'forgotPassword'){
      let data: TypeLogin = { type: type };
      const dialogRef = this.dialog.open(MainComponent,{
        panelClass: 'login-modal',
        data: data,
        autoFocus: false
      });
  
      dialogRef.afterClosed().subscribe(result=>{
        console.log(`Dialog result: ${result}`)
      })
    }else{
      console.log('Không đúng Modal Login')
    }
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.scroll, true);
  }
}
