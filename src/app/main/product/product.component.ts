import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProductList } from '../../mock-data/products';

import { LocalStorageService } from 'src/app/services/local-storage.service';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductionsComponent implements OnInit {
  products: Array<any>;

  public href: string = "";
  constructor(
    private router: Router,
    private localStorageService: LocalStorageService
  ) {
    this.products = ProductList;
  }

  ngOnInit(): void {
    this.href = this.router.url;
    this.localStorageService.remove(this.localStorageService.cartKey);
  }

  addToCart(id: number): void{
    console.log(id);
    let productStoraged = this.localStorageService.get(this.localStorageService.cartKey);

    let product = this.products.find(product=>product.id === id);

    console.log(productStoraged);
    console.log(product);

    let checkExist = productStoraged.some((animal: { id: number; }) => animal.id === product.id);

    if(checkExist){
      this.localStorageService.set(this.localStorageService.cartKey, [product])
    }else{
      console.log('Đã có rồi');
    }
    
  }

  showDetail(id: number): void{
    this.router.navigate(['productions-detail', id]);
  }

  toProducts(): void{
    this.router.navigate(['/productions'])
  }

}
