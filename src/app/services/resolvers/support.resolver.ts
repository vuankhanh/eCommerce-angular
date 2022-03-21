import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';

import { SupportService } from '../api/support.service';

import { Observable, of } from 'rxjs';
import { SupportDetail } from 'src/app/models/Support';

@Injectable({
  providedIn: 'root'
})
export class SupportResolver implements Resolve<SupportDetail> {
  constructor(
    private supportService: SupportService
  ){}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<SupportDetail> {
    const supportRoute = route.paramMap.get('route') || '';
    return this.supportService.getDetail(supportRoute);
  }
}
