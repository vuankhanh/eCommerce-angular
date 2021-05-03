import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  public cartKey = 'addToCart';

  cartStoragedChange$: BehaviorSubject<any> = new BehaviorSubject([]);
  listenCartStoragedChange: Observable<Array<any>> = this.cartStoragedChange$.asObservable();
  constructor() {
    this.cartStoragedChange$.next(this.get(this.cartKey));
  }

  get(key: string){
    return JSON.parse(localStorage.getItem(key) || "[]");
  }

  set(key: string, value: any){
    return localStorage.setItem(key, JSON.stringify(value));
  }

  remove(key: string){
    localStorage.removeItem(key);
  }
}
