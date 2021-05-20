import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProductDetailsService } from 'src/app/services/product-details.service';
import { CartService } from 'src/app/services/cart.service';

import { Product } from '../../mock-data/products';
import { Item } from '../../mock-data/gallery';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit, AfterViewInit {
  @ViewChild('elementTest', { read: ElementRef }) elementTest: QueryList<ElementRef
  >;
  imgMain: Item;
  indexImgMain: number = 0;
  product: Product | null;

  loggedIn: boolean = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private productDetailsService: ProductDetailsService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    let detailId: number = parseInt(this.activatedRoute.snapshot.params.detail);
    console.log(detailId);
    this.product = this.productDetailsService.getProductInformation(detailId);

    if(this.product && this.product.albumImg){
      this.setImgMain(this.product.albumImg, this.indexImgMain);
    }
    console.log(this.product);
    
  }

  ngAfterViewInit(){
    console.log(this.elementTest);
  }

  setImgMain(album: Array<Item>, index: number){
    if(index){
      this.indexImgMain = index;
      return this.imgMain = album[index];
    }else{
      for(let item of album){
        if(item.isMain) return this.imgMain = item;
      }
      return this.imgMain = album[0];
    }
  }

  setImgMainDirection(direction: string){
    if(direction === 'toLeft'){
      if(this.imgMain.id != this.product?.albumImg[0].id){
        this.indexImgMain--;
        this.product?.albumImg[this.indexImgMain] ? this.imgMain = this.product?.albumImg[this.indexImgMain] : this.product?.albumImg[0];
        const elementId = window.document.getElementById("list-item-"+this.indexImgMain)! as HTMLDivElement;
        elementId.scrollIntoView({behavior: "smooth", block: "start"});
      }
    }else if(direction === 'toRight'){
      if(this.imgMain.id != this.product?.albumImg[this.product?.albumImg.length-1].id){
        this.indexImgMain++;
        this.product?.albumImg[this.indexImgMain] ? this.imgMain = this.product?.albumImg[this.indexImgMain] : this.product?.albumImg[0];
        const elementId = window.document.getElementById("list-item-"+this.indexImgMain)! as HTMLDivElement;
        elementId.scrollIntoView({behavior: "smooth"});
      }
    }else{
      console.log('Hướng không xác định');
    }
  }

  addToCart(product: Product | null){
    let itemCarts: Array<Product> = this.cartService.get();
  
    let checkExist = itemCarts.some((itemCart: Product) => itemCart.id === product!.id);

    console.log(checkExist);

    if(!checkExist){
      product!.quantity = 1;
      itemCarts.push(product!);
    }else{
      for(let itemCart of itemCarts){
        if(itemCart.id === product!.id){
          itemCart.quantity!++;
        }
      }
    }
    console.log(itemCarts);
    
    this.cartService.set(itemCarts);
  }

}
