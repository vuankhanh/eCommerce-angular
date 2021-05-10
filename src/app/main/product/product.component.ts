import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Router, NavigationStart, Event } from '@angular/router';
import { Subscription } from 'rxjs';

import { ProductCategorys, ProductCategory } from '../../mock-data/products-category';

import { UrlChangeService } from 'src/app/services/url-change.service';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductionsComponent implements OnInit, AfterViewInit, OnDestroy {
  productCategorys: Array<ProductCategory>;
  activeLink: string;
  subscriptionUrlChange: Subscription = new Subscription();
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
          console.log(this.activeLink);
          this.activeLink = event.url.split("/")[2] ? event.url.split("/")[2] : this.productCategorys[0].route;
        }
      })
    );
  }

  ngAfterViewInit() {
  }

  ngOnDestroy(){
    this.subscriptionUrlChange.unsubscribe();
  }
}
