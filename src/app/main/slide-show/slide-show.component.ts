import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';

import { Product, ProductList } from '../../mock-data/products';

import { animationSlide } from '../../animation/slide-show';

import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

import { interval } from 'rxjs';

@Component({
  selector: 'app-slide-show',
  templateUrl: './slide-show.component.html',
  styleUrls: ['./slide-show.component.scss'],
  animations: [animationSlide]
})
export class SlideShowComponent implements OnInit, AfterViewInit, AfterViewChecked {
  @ViewChild('txtProductName') txtProductName: ElementRef;
  @ViewChild('txtProductReviews') txtProductReviews: ElementRef;
  @ViewChild('btnBookNow', { read: ElementRef }) btnBookNow: ElementRef;
  @ViewChild('btnDetail', { read: ElementRef }) btnDetail: ElementRef;
  @ViewChildren('imgBanner', {read: ElementRef}) imgBanner: QueryList<ElementRef>;

  parentContainerHeight: number;
  products: Array<any>;
  private source$ = interval(5000);
  counter: number = 0;
  constructor(
    private ren: Renderer2,
    private router: Router,
    private cartService: CartService,
    private productService: ProductService
  ) {
    this.products = ProductList.filter(product=>product.highlight);
  }

  ngOnInit(): void {
    this.source$.subscribe(val=>{
      // this.counter++;
      if( this.counter === this.products.length){
        this.counter = 0;
      }
      setTimeout(() => {
        this.animationText();
      }, 150)
    })
  }

  ngAfterViewInit(){
    setTimeout(() => {
      this.animationText();
      this.parentContainerHeight = this.imgBanner.first.nativeElement.height;
    }, 150);

  }

  onResize(){
    this.parentContainerHeight = this.imgBanner.first.nativeElement.height;
  }

  ngAfterViewChecked(){
    
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
    let itemCarts: Array<Product> = this.cartService.get();
  
    let checkExist = itemCarts.some((itemCart: Product) => itemCart.id === product.id);

    console.log(checkExist);

    if(!checkExist){
      product.quantity = 1;
      itemCarts.push(product);
    }else{
      for(let itemCart of itemCarts){
        if(itemCart.id === product.id){
          itemCart.quantity!++;
        }
      }
    }
    console.log(itemCarts);
    
    this.cartService.set(itemCarts);
  }

  showDetail(product: Product): void{
    let categoryOfProduct: string = this.productService.getCategoryOfProduct(product);
    
    this.router.navigate(['productions/'+categoryOfProduct, product.id]);
  }

}
