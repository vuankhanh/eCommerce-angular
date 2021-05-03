import { Component, OnInit } from '@angular/core';

import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cart: Array<any>;

  constructor(
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.localStorageService.listenCartStoragedChange.subscribe((value: any)=>{
      this.cart = value;
      console.log(this.cart);
      
    });
  }

}
