<<<<<<< HEAD
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
=======
import { Injectable } from '@angular/core';
>>>>>>> eb644a7f4fa094aaf7ca075300a9b1dcac009f60
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

import { Product } from '../models/Product';
import { ProductCategory } from '../models/ProductCategory';

import { ProductService } from './api/product/product.service';
import { AuthService } from './auth.service';
import { ResponseLogin } from './api/login.service';
import { LocalStorageService } from './local-storage.service';
import { AddIconSvgService } from './add-icon-svg.service';
import { SocketIoService } from './socket/socket-io.service';

import { BehaviorSubject, Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

const defaultPageTitle = 'Thủy Hải Sản Carota';
@Injectable({
  providedIn: 'root'
})
export class AppServicesService {
<<<<<<< HEAD
  private isBrowser: boolean;

=======
>>>>>>> eb644a7f4fa094aaf7ca075300a9b1dcac009f60
  products: Product;

  public isMobile$: Observable<boolean>;

  private bProductCategory: BehaviorSubject<ProductCategory[]> = new BehaviorSubject<ProductCategory[]>([]);
  public productCategory$: Observable<ProductCategory[]> = this.bProductCategory.asObservable();

  private bProductHightlight: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  public productHightlight$: Observable<Product[]> = this.bProductHightlight.asObservable();

  constructor(
<<<<<<< HEAD
    @Inject(PLATFORM_ID) platformId: Object,
=======
>>>>>>> eb644a7f4fa094aaf7ca075300a9b1dcac009f60
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private title: Title,
    private breakpointObserver: BreakpointObserver,
    private productService: ProductService,
    private localStorageService: LocalStorageService,
    private authService: AuthService,
    private addIconSvgService: AddIconSvgService,
    private socketIoService: SocketIoService
  ) {
<<<<<<< HEAD
    this.isBrowser = isPlatformBrowser(platformId);
    if(this.isBrowser){
      this.socketIoService.connect();
    }

=======
>>>>>>> eb644a7f4fa094aaf7ca075300a9b1dcac009f60
    this.isMobile$ = this.breakpointObserver.observe(['(min-width: 768px)']).pipe(map((state: BreakpointState)=>!state.matches ? true : false));

    this.productService.getCategory().subscribe(res=>this.bProductCategory.next(res));

    this.productService.getProductHightlight().subscribe(res=>this.bProductHightlight.next(res));

    this.addIconSvgService.addIcon();

    let tokenStoraged: ResponseLogin = <ResponseLogin>this.localStorageService.get(this.localStorageService.tokenStoragedKey);
    if(tokenStoraged && tokenStoraged.accessToken){
      let accessToken = tokenStoraged.accessToken;
      this.authService.checkTokenValidation(accessToken);
    }

    //Set Title For Page
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
<<<<<<< HEAD
=======

    this.socketIoService.connect();
>>>>>>> eb644a7f4fa094aaf7ca075300a9b1dcac009f60
  }
}
