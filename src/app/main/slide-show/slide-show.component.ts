import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnDestroy, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';

import { animationSlide } from '../../animation/slide-show';

import { Product } from 'src/app/models/Product';

import { CartService } from 'src/app/services/cart.service';
import { HeaderService } from 'src/app/services/header.service';
import { AppServicesService } from 'src/app/services/app-services.service';

import { interval, Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-slide-show',
  templateUrl: './slide-show.component.html',
  styleUrls: ['./slide-show.component.scss'],
  animations: [animationSlide]
})
export class SlideShowComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('imgBanner') imgBanner: ElementRef;
  @ViewChild('txtProductName') txtProductName: ElementRef;
  @ViewChild('txtProductReviews') txtProductReviews: ElementRef;
  @ViewChild('btnBookNow', { read: ElementRef }) btnBookNow: ElementRef;
  @ViewChild('btnDetail', { read: ElementRef }) btnDetail: ElementRef;

  productHightlights: Array<Product>;

  counter: number = 0;
  private stopPlay$: Subject<any> = new Subject();
  private subscription: Subscription = new Subscription();
  constructor(
    private ren: Renderer2,
    private router: Router,
    private cartService: CartService,
    private headerService: HeaderService,
    private appServicesService: AppServicesService
  ) {}

  ngOnInit(): void {
    
    this.subscription.add(
      this.appServicesService.bProductHightlight$.subscribe(res=>{
        this.productHightlights = res;
        if(this.productHightlights.length>0){
          
          interval(5000).pipe(takeUntil(this.stopPlay$)).subscribe(val=>{            
            this.counter++;
            if( this.counter === this.productHightlights.length){
              this.counter = 0;
            }
            setTimeout(() => {
              this.animationText();
            }, 150)
          });
          
        }
      })
    )
  }

  ngAfterViewInit(){
    setTimeout(() => {
      this.animationText();
    }, 300);

    
  }

  animationText(): void {
    this.ren.setStyle(this.txtProductName.nativeElement, 'margin-left', '0');
    this.ren.setStyle(this.txtProductReviews.nativeElement, 'margin-left', '0');
    setTimeout(() => {
      this.ren.setStyle(this.btnBookNow.nativeElement, 'opacity', '1');
      setTimeout(() => {
        this.ren.setStyle(this.btnDetail.nativeElement, 'opacity', '1');
      }, 500);
    }, 1000);
  }

  addToCart(product: Product): void{
    this.cartService.addToCart(product);
    this.headerService.set(true);
  }

  showDetail(product: Product): void{
    this.router.navigate(['productions/'+product.category.route, product._id]);
  }
  
  ngOnDestroy(){
    this.subscription.unsubscribe();
    this.stopPlay$.next();
  }

}
