import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Router, NavigationStart, Event } from '@angular/router';
import { MatTabNav } from '@angular/material/tabs'

import { ProductCategorys, ProductCategory } from '../../mock-data/products-category';

import { UrlChangeService } from 'src/app/services/url-change.service';

import { Subscription } from 'rxjs';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductionsComponent implements OnInit, AfterViewInit, OnDestroy {
  productCategorys: Array<ProductCategory>;
  activeLink: string;
  counter: number = 1;
  subscriptionUrlChange: Subscription = new Subscription();

  changeTab: MatTabNav;
  constructor(
    private router: Router,
    private urlChangeService: UrlChangeService,
  ) {
    this.productCategorys = ProductCategorys;
    this.activeLink = this.router.url.split("/")[2] ? this.router.url.split("/")[2] : this.productCategorys[0].route;
  }

  ngOnInit(): void {
    this.subscriptionUrlChange.add(
      this.urlChangeService.urlChange().subscribe((event: Event)=>{
        if(event instanceof NavigationStart) {
          this.activeLink = event.url.split("/")[2] ? event.url.split("/")[2] : this.productCategorys[0].route;
        }
      })
    );
  }

  ngAfterViewInit() {
  }

  change(event: any){
    console.log(event);
  }

  ngOnDestroy(){
    this.subscriptionUrlChange.unsubscribe();
  }
}
