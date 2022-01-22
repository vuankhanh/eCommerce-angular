import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProductCategory } from '../../models/ProductCategory';

import { AppServicesService } from 'src/app/services/app-services.service';

import { combineLatest, Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductionsComponent implements OnInit, OnDestroy {
  productCategorys: Array<ProductCategory>;
  categoryIsActivated: ProductCategory;

  subscription: Subscription = new Subscription();

  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
    private appServicesService: AppServicesService,
  ) {}

  ngOnInit(): void {

    const productCategory$ = this.appServicesService.productCategory$;
    const url$ = this.activateRoute.url.pipe(map(segments => segments.join('')));

    this.subscription.add(
      combineLatest([productCategory$, url$]).subscribe(([productCategories, url])=>{
        if(productCategories.length){
          this.productCategorys = productCategories;
          setTimeout(() => {
            if(!this.activateRoute.firstChild){
              this.router.navigate(['/san-pham/'+this.productCategorys[0].route])
            }
          }, 10);
        }
      })
    );
    
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
