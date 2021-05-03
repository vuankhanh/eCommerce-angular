import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  public cartKey = 'addToCart';

  constructor() { }

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
