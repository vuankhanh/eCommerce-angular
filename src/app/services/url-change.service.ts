import { Injectable } from '@angular/core';
import { Router, Event } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UrlChangeService {

  constructor(
    private router: Router
  ) {}
  urlChange(): Observable<Event>{
    return this.router.events;
  }
}
