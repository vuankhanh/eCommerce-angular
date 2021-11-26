import { Injectable } from '@angular/core';

import { Socket } from 'ngx-socket-io';

import { Product } from 'src/app/models/Product';

import { merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SocketIoService {

  constructor(
    private socket: Socket
  ) {
    
  }

  connect(){
    this.socket.connect();
  }

  //on from server

  socketStatus$(){
    return merge(
      this.socket.fromEvent('connect').pipe(map(_=>this.socket.ioSocket)),
      this.socket.fromEvent('disconnect').pipe(map(_=>this.socket.ioSocket))
    );
  }

  theRemainingAmoutChange$(): Observable<SocketDataProduct>{
    return this.socket.fromEvent('product-quantity');
  }

  theRemainingAmountProductsAfterRefresh$(): Observable<Array<Product>>{
    return this.socket.fromEvent('the-remaining-amount-products-after-refresh');
  }

  //emit to Server
  refreshTheRemainingAmountProducts$(ids: Array<string>){
    this.socket.emit('refresh-the-remaining-amount-products', ids);
  }
}

export interface SocketDataProduct{
  sender: string,
  product: Product
}
