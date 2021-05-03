import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';

import { ProductList } from '../../mock-data/products';

import { animationSlide } from '../../animation/slide-show';

import { interval } from 'rxjs';
import { Router } from '@angular/router';

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
  @ViewChildren('imgBanner', {read: ElementRef}) imgBanner: QueryList<ElementRef>;

  parentContainerHeight: number;
  products: Array<any>;
  private source$ = interval(5000);
  counter: number = 0;
  constructor(
    private ren: Renderer2,
    private router: Router
  ) {
    this.products = ProductList.filter(product=>product.highlight);
  }

  ngOnInit(): void {
    this.source$.subscribe(val=>{
      this.counter++;
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
    }, 1000);
  }

  addToCart(id: number) :void{
    console.log(id);
    this.router.navigate(['cart']);
  }

}
