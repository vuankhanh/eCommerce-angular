import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

import { LocalStorageService } from '../local-storage.service';
import { ConfigService } from '../api/config.service';
import { ResponseLogin } from '../api/login.service';
import { AuthService } from '../auth.service';


import { Observable, of } from 'rxjs';
import { catchError , map } from 'rxjs/operators'

const tokenStoragedKey = 'carota-token';
@Injectable({
  providedIn: 'root'
})
export class RouteGuard implements CanActivate {
  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
    private configService: ConfigService,
    private authService: AuthService
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let tokenStoraged: ResponseLogin = <ResponseLogin>this.localStorageService.get(tokenStoragedKey);
    if(tokenStoraged && tokenStoraged.accessToken){
      let accessToken = tokenStoraged.accessToken;
      return this.configService.getConfig(accessToken).pipe(map(res=>true), catchError(error=>{
        this.authService.logout().then(_=>{
          this.authService.login('login');
        });
        return of(false);
      }));
    }else{
      this.authService.logout().then(_=>{
        this.authService.login('login');
      });
      return false;
    }
  }
  
}
