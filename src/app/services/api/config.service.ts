import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { hostConfiguration } from '../../../environments/environment';

import { OrderStatus, ServerConfig } from 'src/app/models/ServerConfig';

import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private url: string = hostConfiguration.host+'/config';

  private orderStatus: Array<OrderStatus>;
  private bConfig: BehaviorSubject<ServerConfig | null> = new BehaviorSubject<ServerConfig | null>(null);
  private config$: Observable<ServerConfig | null> = this.bConfig.asObservable();
  constructor(
    private httpClient: HttpClient
  ) { }
  
  getConfig(token: string){
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token
    });
    return this.httpClient.get<ServerConfig>(this.url, { headers: headers })
  }

  set(config: ServerConfig){
    this.orderStatus = config.orderStatus;
    this.bConfig.next(config);
  }

  get(){
    return this.config$;
  }

  filterNameOrderStatus(code: string){
    let index: number = this.orderStatus.findIndex(status=>status.code === code);
    return index >=0 ? this.orderStatus[index].name : null
  }
}
