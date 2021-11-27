<<<<<<< HEAD
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

=======
import { Injectable } from '@angular/core';
>>>>>>> eb644a7f4fa094aaf7ca075300a9b1dcac009f60
@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  tokenStoragedKey = 'carota-token';
  carotaCartKey = 'carota-cart';
<<<<<<< HEAD
  isBrowser: boolean;
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  get(key: string){
    if (this.isBrowser) {
      return JSON.parse(localStorage.getItem(key) || "null");
    }
  }

  set(key: string, value: any){
    if (this.isBrowser) {
      return localStorage.setItem(key, JSON.stringify(value));
    }
  }

  remove(key: string){
    if (this.isBrowser) {
      localStorage.removeItem(key);
    }
=======
  constructor() {
    
  }

  get(key: string){
    return JSON.parse(localStorage.getItem(key) || "null");
  }

  set(key: string, value: any){
    return localStorage.setItem(key, JSON.stringify(value));
  }

  remove(key: string){
    localStorage.removeItem(key);
>>>>>>> eb644a7f4fa094aaf7ca075300a9b1dcac009f60
  }
}
