import { Component, ElementRef, OnInit, OnDestroy, Renderer2, ViewChild, AfterViewInit } from '@angular/core';
import { MenusList } from '../mock-data/menu';
import { NavigationStart, Event, Router } from '@angular/router';

import { LocalStorageService } from '../services/local-storage.service';
import { UrlChangeService } from '../services/url-change.service';
import { ProductCategorys, ProductCategory } from '../mock-data/products-category';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('header', { static: false }) header: ElementRef;

  menusList: Array<any>;
  productCategorys: Array<ProductCategory>;
  prevButtonTrigger: any;
  currentUrl: string;
  activeLink: string;
  badgeCart: number = 0;

  subscriptionUrlChange: Subscription = new Subscription();
  constructor(
    private router: Router,
    private ren: Renderer2,
    private urlChangeService: UrlChangeService,
    private localStorageService: LocalStorageService
  ) {
    this.menusList = MenusList;
    this.productCategorys = ProductCategorys;
    
  }

  ngOnInit(): void {
    window.addEventListener('scroll', this.scroll, true);

    this.localStorageService.listenCartStoragedChange.subscribe((value: any)=>{
      this.badgeCart = this.sumQuantityOfCart(value);
    });

    this.subscriptionUrlChange.add(
      this.urlChangeService.urlChange().subscribe((event: Event)=>{
        if(event instanceof NavigationStart) {
          this.currentUrl = event.url.split("/")[1] ? event.url.split("/")[1] : '';
          console.log(event.url);
          this.activeLink = this.currentUrl === 'productions' ? event.url.split("/")[2] ? event.url.split("/")[2] : this.productCategorys[0].route : '';
        }
      })
    );
  }

  ngAfterViewInit(): void{
    
  }

  scroll = (event: any): void => {
    let index: number = event.srcElement.scrollingElement.scrollTop;
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

  sumQuantityOfCart(arrayCart: any){
    let total: number = 0;
    if(arrayCart.length>0){
      for(let product of arrayCart){
        total += product.quantity;
      }
    }
    return total;
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.scroll, true);
  }
}
