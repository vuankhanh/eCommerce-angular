import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Event, NavigationStart, Router } from '@angular/router';
import { MatAccordion } from '@angular/material/expansion';

import { CustomerMenu, Menu } from 'src/app/mock-data/menu';

//Service
import { UrlChangeService } from 'src/app/services/url-change.service';
import { ConfigService } from 'src/app/services/api/config.service';
import { AuthService } from 'src/app/services/auth.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main-customer',
  templateUrl: './main-customer.component.html',
  styleUrls: ['./main-customer.component.scss']
})
export class MainCustomerComponent implements OnInit, OnDestroy {
  @ViewChild('userAccordion') userAccordion: MatAccordion;
  customerMenu: Array<Menu>;
  currentUrl: string;
  activeMenu: Menu;
  private subscription: Subscription = new Subscription();
  constructor(
    private router: Router,
    private urlChangeService: UrlChangeService,
    private configService: ConfigService,
    private authService: AuthService
  ) {
    this.customerMenu = CustomerMenu;
    this.currentUrl = this.router.url;
    this.activeMenu = this.getActiveMenu(this.currentUrl, this.customerMenu);
  }

  ngOnInit(): void {
    this.subscription.add(
      this.urlChangeService.urlChange().subscribe((event)=>{
        if(event) {
          this.currentUrl = event.url;
          this.activeMenu = this.getActiveMenu(this.currentUrl, this.customerMenu);
        }
      })
    );
    
    this.subscription.add(
      this.configService.getConfig().subscribe(res=>{
        this.configService.set(res);
      })
    )
  }

  getActiveMenu(route: string, arrayMenu:Array<Menu>){
    let index: number = arrayMenu.findIndex(menu=>route.includes(menu.route));
    return arrayMenu[index];
  }

  closeAccordion(){
    this.userAccordion.closeAll();
  }

  logout(){
    this.authService.logout();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
