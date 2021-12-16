import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
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
  private isBrowser: boolean;

  products: Product;

  public isMobile$: Observable<boolean>;

  private bProductCategory: BehaviorSubject<ProductCategory[]> = new BehaviorSubject<ProductCategory[]>([]);
  public productCategory$: Observable<ProductCategory[]> = this.bProductCategory.asObservable();

  private bProductHightlight: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  public productHightlight$: Observable<Product[]> = this.bProductHightlight.asObservable();

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
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
    this.isBrowser = isPlatformBrowser(platformId);
    if(this.isBrowser){
      this.socketIoService.connect();
    }

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
    ).subscribe((title: string) => {
      if(title){
        this.title.setTitle(title);
      }
    });
  }
}
