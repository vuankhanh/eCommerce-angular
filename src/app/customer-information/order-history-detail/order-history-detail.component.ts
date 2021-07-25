import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Order } from 'src/app/models/Order';
import { Product } from 'src/app/models/Product';
import { ConfigService } from 'src/app/services/api/config.service';
import { ResponseLogin } from 'src/app/services/api/login.service';

import { OrderService } from 'src/app/services/api/order.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

const tokenStoragedKey = 'carota-token';
@Component({
  selector: 'app-order-history-detail',
  templateUrl: './order-history-detail.component.html',
  styleUrls: ['./order-history-detail.component.scss']
})
export class OrderHistoryDetailComponent implements OnInit, OnDestroy {
  orderId: string;

  order: Order;

  displayedColumns: string[] = ['name', 'price', 'quantity'];

  subscription: Subscription = new Subscription();
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService,
    private localStorageService: LocalStorageService,
    public configService: ConfigService
  ) {
    this.orderId = this.activatedRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    this.listenOrderHistoryDetail(this.orderId);
  }

  listenOrderHistoryDetail(orderId: string){
    let tokenStoraged: ResponseLogin = <ResponseLogin>this.localStorageService.get(tokenStoragedKey);
    if(tokenStoraged && tokenStoraged.accessToken){
      this.subscription.add(
        this.orderService.getDetail(tokenStoraged.accessToken, orderId).subscribe(res=>{
          this.order = res;
          console.log(this.order);
          
        })
      )
    }
  }

  showDetail(product: Product){
    console.log(product);
    this.router.navigate(['productions/'+product.category.route, product._id]);
  }

  revoke(id: string){
    let tokenStoraged: ResponseLogin = <ResponseLogin>this.localStorageService.get(tokenStoragedKey);
    if(tokenStoraged && tokenStoraged.accessToken && this.order._id != 'revoke'){
      this.subscription.add(
        this.orderService.revoke(tokenStoraged.accessToken, id).subscribe(res=>{
          this.order = res;
        })
      )
    }
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
