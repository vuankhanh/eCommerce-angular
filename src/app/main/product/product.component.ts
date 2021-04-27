import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProductList } from './products';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductionsComponent implements OnInit {
  products: Array<any>;

  public href: string = "";
  constructor(
    private router: Router
  ) {
    this.products = ProductList;
  }

  ngOnInit(): void {
    this.href = this.router.url;
    console.log(this.href);
  }

  bookNow(id: number): void{
    console.log(id);
    this.router.navigate(['productions-detail', id]);
  }

  toProducts(): void{
    this.router.navigate(['/productions'])
  }

}
