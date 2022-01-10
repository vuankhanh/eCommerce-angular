import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Router, NavigationStart, Event } from '@angular/router';
import { MatTabNav } from '@angular/material/tabs'

import { ProductCategory } from '../../models/ProductCategory';

import { UrlChangeService } from 'src/app/services/url-change.service';
import { AppServicesService } from 'src/app/services/app-services.service';
import { SEOService } from 'src/app/services/seo.service';

import { Subscription } from 'rxjs';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductionsComponent implements OnInit, AfterViewInit, OnDestroy {
  productCategorys: Array<ProductCategory>;
  categoryIsActivated: ProductCategory;
  counter: number = 1;
  subscription: Subscription = new Subscription();

  changeTab: MatTabNav;
  constructor(
    private router: Router,
    private urlChangeService: UrlChangeService,
    private appServicesService: AppServicesService,
    private seoService: SEOService
  ) {
    this.subscription.add(
      this.appServicesService.productCategory$.subscribe(res=>{
        if(res.length){
          this.productCategorys = res;
          let categoryIsActivated = this.getCategoryIsActivated(this.router.url, this.productCategorys);
          this.categoryIsActivated = categoryIsActivated ? categoryIsActivated : this.productCategorys[0];
          this.seoService.updateTitle(this.categoryIsActivated.name);
        }
      })
    );
  }

  ngOnInit(): void {
    this.subscription.add(
      this.urlChangeService.urlChange().subscribe((event: Event)=>{
        if(event instanceof NavigationStart) {
          let splitRoute = event.url.split('/');
          if(splitRoute.length===2 && splitRoute[1] === 'productions'){
            this.router.navigate(['/productions/'+this.productCategorys[0].route]);
          } else if(splitRoute.length>=2 && splitRoute[1] === 'productions'){
            let categoryIsActivated = this.getCategoryIsActivated(event.url, this.productCategorys);
            this.categoryIsActivated = categoryIsActivated ? categoryIsActivated : this.productCategorys[0]; 
            this.seoService.updateTitle(this.categoryIsActivated.name);
          }
        }
      })
    );
  }

  
  ngAfterViewInit() {}
  
  getCategoryIsActivated(route: string, productCategorys: Array<ProductCategory>){
    let index: number = productCategorys.findIndex(menu=>route.includes(menu.route));
    return productCategorys[index];
  }

  setCategory(category: ProductCategory){
    this.router.navigate(['/productions/'+category.route]);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
