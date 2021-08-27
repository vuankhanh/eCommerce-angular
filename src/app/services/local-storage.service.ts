import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  tokenStoragedKey = 'carota-token';
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
  }
}
