import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MenusList } from './menu';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatButton } from '@angular/material/button';
import { OnDestroy } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @ViewChild('header', { static: false }) header: ElementRef;

  menusList: Array<any>;
  enteredButton = false;
  isMatMenuOpen = false;
  isMatMenu2Open = false;
  prevButtonTrigger: any;
  constructor(
    private ren: Renderer2
  ) {
    this.menusList = MenusList;
  }

  ngOnInit(): void {
    window.addEventListener('scroll', this.scroll, true);
  }

  menuenter() {
    this.isMatMenuOpen = true;
    if (this.isMatMenu2Open) {
      this.isMatMenu2Open = false;
    }
  }

  menuLeave(trigger: MatMenuTrigger, button: MatButton) {
    setTimeout(() => {
      if (!this.isMatMenu2Open && !this.enteredButton) {
        this.isMatMenuOpen = false;
        trigger.closeMenu();
        this.ren.removeClass(button['_elementRef'].nativeElement, 'cdk-focused');
        this.ren.removeClass(button['_elementRef'].nativeElement, 'cdk-program-focused');
      } else {
        this.isMatMenuOpen = false;
      }
    }, 80)
  }

  menu2enter() {
    this.isMatMenu2Open = true;
  }

  menu2Leave(trigger1: MatMenuTrigger, trigger2: MatMenuTrigger, button: MatButton) {
    setTimeout(() => {
      if (this.isMatMenu2Open) {
        trigger1.closeMenu();
        this.isMatMenuOpen = false;
        this.isMatMenu2Open = false;
        this.enteredButton = false;
        this.ren.removeClass(button['_elementRef'].nativeElement, 'cdk-focused');
        this.ren.removeClass(button['_elementRef'].nativeElement, 'cdk-program-focused');
      } else {
        this.isMatMenu2Open = false;
        trigger2.closeMenu();
      }
    }, 100)
  }

  buttonEnter(trigger: MatMenuTrigger, button: MatButton) {
    setTimeout(() => {
      this.ren.addClass(button['_elementRef'].nativeElement, 'cdk-focused');
      this.ren.addClass(button['_elementRef'].nativeElement, 'cdk-program-focused');
      if(this.prevButtonTrigger && this.prevButtonTrigger != trigger){
        this.prevButtonTrigger.closeMenu();
        this.prevButtonTrigger = trigger;
        this.isMatMenuOpen = false;
        this.isMatMenu2Open = false;
        trigger.openMenu();
      }
      else if (!this.isMatMenuOpen) {
        this.enteredButton = true;
        this.prevButtonTrigger = trigger;
        trigger.openMenu();
      }
      else {
        this.enteredButton = true;
        this.prevButtonTrigger = trigger
      }
    }, 150)
  }

  buttonLeave(trigger: MatMenuTrigger, button: MatButton) {
    setTimeout(() => {
      if (this.enteredButton && !this.isMatMenuOpen) {
        trigger.closeMenu();
        this.ren.removeClass(button['_elementRef'].nativeElement, 'cdk-focused');
        this.ren.removeClass(button['_elementRef'].nativeElement, 'cdk-program-focused');
      } if (!this.isMatMenuOpen) {
        trigger.closeMenu();
        this.ren.removeClass(button['_elementRef'].nativeElement, 'cdk-focused');
        this.ren.removeClass(button['_elementRef'].nativeElement, 'cdk-program-focused');
      } else {
        this.enteredButton = false;
      }
    }, 100)
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
