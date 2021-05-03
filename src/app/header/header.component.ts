import { Component, ElementRef, OnInit, OnDestroy, Renderer2, ViewChild } from '@angular/core';
import { MenusList } from './menu';
import { Router, NavigationStart, Event as NavigationEvent } from '@angular/router';

import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @ViewChild('header', { static: false }) header: ElementRef;

  menusList: Array<any>;
  prevButtonTrigger: any;
  currentUrl: string;
  badgeCart: number = 0;
  constructor(
    private ren: Renderer2,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {
    this.menusList = MenusList;
    
    this.router.events.subscribe((event: NavigationEvent) => {
      if(event instanceof NavigationStart) {
        this.currentUrl = event.url
      }
    });
  }

  ngOnInit(): void {
    window.addEventListener('scroll', this.scroll, true);
    this.localStorageService.listenCartStoragedChange.subscribe((value: any)=>{
      console.log(value)
      this.badgeCart = this.sumQuantityOfCart(value);
    });
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
