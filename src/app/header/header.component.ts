import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MenusList } from './menu';
import { OnDestroy } from '@angular/core';
import { Router, NavigationStart, Event as NavigationEvent } from '@angular/router';

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
  constructor(
    private ren: Renderer2,
    private router: Router
  ) {
    this.menusList = MenusList;
    console.log(this.menusList);
    
    this.router.events.subscribe((event: NavigationEvent) => {
      if(event instanceof NavigationStart) {
        this.currentUrl = event.url
      }
    });
  }

  ngOnInit(): void {
    window.addEventListener('scroll', this.scroll, true);
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

  ngOnDestroy() {
    window.removeEventListener('scroll', this.scroll, true);
  }
}
