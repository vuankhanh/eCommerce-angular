import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Order } from 'src/app/models/Order';
import { PaginationParams } from 'src/app/models/PaginationParams';

import { ResponseLogin } from 'src/app/services/api/login.service';
import { ConfigService } from 'src/app/services/api/config.service';
import { OrderResponse, OrderService } from 'src/app/services/api/order.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

import { Subscription } from 'rxjs';

const tokenStoragedKey = 'carota-token';
@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {
  displayedColumns: string[] = ['orderCode', 'createdAt', 'name', 'totalValue', 'status'];

  orderResponse: OrderResponse;
  configPagination: PaginationParams;
  orders: Array<Order>;
  
  subscription: Subscription = new Subscription();

  count: number = 0;
  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
    private orderService: OrderService,
    public configService: ConfigService
  ) { }

  ngOnInit(): void {
    this.listenOrder();
  }

  listenOrder(paginationParams?: PaginationParams){
    let tokenStoraged: ResponseLogin = <ResponseLogin>this.localStorageService.get(tokenStoragedKey);
    if(tokenStoraged && tokenStoraged.accessToken){
      this.subscription.add(
        this.orderService.get(tokenStoraged.accessToken, paginationParams).subscribe(res=>{
          this.orderResponse = res;
          this.configPagination = {
            totalItems: this.orderResponse.totalItems,
            page: this.orderResponse.page,
            size: this.orderResponse.size,
            totalPages: this.orderResponse.totalPages
          };
          this.orders = this.orderResponse.data;
          console.log(this.orders);
        })
      )
    }
  }

  showDetail(order: Order){
    console.log(order);
    this.router.navigate(['/customer/order-history', order._id]);
  }

}
