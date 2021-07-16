import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainContainerScrollService {
  private bScrollTop: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  bScrollTop$: Observable<number> = this.bScrollTop.asObservable();
  constructor() { }

  setPosition(position: number){
    return this.bScrollTop.next(position);
  }
}
