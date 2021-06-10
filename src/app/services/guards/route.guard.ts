import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

import { LocalStorageService } from '../local-storage.service';
import { ConfigService } from '../api/config.service';
import { ResponseLogin } from '../api/login.service';

import { Observable } from 'rxjs';

const tokenStoragedKey = 'carota-token';
@Injectable({
  providedIn: 'root'
})
export class RouteGuard implements CanActivate {
  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
    private configService: ConfigService
  ){}

  canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      return new Promise(async(resolve, reject)=>{
        let tokenStoraged: ResponseLogin = <ResponseLogin>this.localStorageService.get(tokenStoragedKey);
        if(tokenStoraged && tokenStoraged.accessToken){
          let accessToken = tokenStoraged.accessToken;
          return await this.configService.getConfig(accessToken).toPromise().then(result=>{
            console.log(result);
            return resolve(true);
          }).catch(_=>{
            this.router.navigateByUrl('/');
            return reject;
          });
        }
        this.router.navigateByUrl('/');
        return reject;
      });
  }
  
}
