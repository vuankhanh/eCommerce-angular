import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

import { Product } from '../models/Product';
import { ProductCategory } from '../models/ProductCategory';

import { ProductService } from './api/product/product.service';
import { AuthService } from './auth.service';
import { ResponseLogin } from './api/login.service';
import { LocalStorageService } from './local-storage.service';
import { AddIconSvgService } from './add-icon-svg.service';

import { BehaviorSubject, Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';

const tokenStoragedKey = 'carota-token';
const defaultPageTitle = 'Thủy Hải Sản Carota';
@Injectable({
  providedIn: 'root'
})
export class AppServicesService {
  products: Product;

  public isMobile$: Observable<boolean>;

  private bProductCategory: BehaviorSubject<ProductCategory[]> = new BehaviorSubject<ProductCategory[]>([]);
  public productCategory$: Observable<ProductCategory[]> = this.bProductCategory.asObservable();

  private bProductHightlight: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  public productHightlight$: Observable<Product[]> = this.bProductHightlight.asObservable();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private title: Title,
    private breakpointObserver: BreakpointObserver,
    private productService: ProductService,
    private localStorageService: LocalStorageService,
    private authService: AuthService,
    private addIconSvgService: AddIconSvgService,
  ) {
    this.isMobile$ = this.breakpointObserver.observe(['(min-width: 768px)']).pipe(map((state: BreakpointState)=>!state.matches ? true : false));

    this.productService.getCategory().subscribe(res=>this.bProductCategory.next(res));

    this.productService.getProductHightlight().subscribe(res=>this.bProductHightlight.next(res));

    this.addIconSvgService.addIcon();

    let tokenStoraged: ResponseLogin = <ResponseLogin>this.localStorageService.get(tokenStoragedKey);
    if(tokenStoraged && tokenStoraged.accessToken){
      let accessToken = tokenStoraged.accessToken;
      this.authService.checkTokenValidation(accessToken);
    }

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        let child = this.activatedRoute.firstChild;
  
        if (!child) {
          return this.activatedRoute.snapshot.data.title || defaultPageTitle;
        }
  
        while (child.firstChild) {
          child = child.firstChild;
        }
  
        if (child.snapshot.data.title) {
          return child.snapshot.data.title || defaultPageTitle;
        }
      })
    ).subscribe((title: string) => this.title.setTitle(title));
  }
}
