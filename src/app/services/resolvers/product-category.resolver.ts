import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';

import { ProductCategory } from 'src/app/models/ProductCategory';

import { AppServicesService } from '../app-services.service';

import { Observable } from 'rxjs';
import { filter, map, take, takeUntil, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ProductCategoryResolver implements Resolve<ProductCategory> {
  constructor(
    private appServicesService: AppServicesService
  ){

  }
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<ProductCategory> | Promise<ProductCategory> | ProductCategory {
    
    const category = route.paramMap.get('category');

    return this.appServicesService.productCategory$.pipe(
      filter(productCategories=>productCategories.length>0),
      map(productCategories=>productCategories.filter(c=>c.route === category)[0]),
      take(1)
    )
  }
}
