import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService, ResponseLogin, ResponseRefreshToken } from './login.service';
import { LocalStorageService } from '../local-storage.service';

import { Observable, throwError, BehaviorSubject, of } from 'rxjs';
import { catchError, switchMap, filter, take } from 'rxjs/operators';

const tokenStoragedKey = 'carota-token';
@Injectable({
  providedIn: 'root'
})
export class RefreshTokenInterceptorService implements HttpInterceptor {
  
  constructor(
    private router: Router,
    private loginService: LoginService,
    private localStorageService: LocalStorageService
  ){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    return next.handle(req).pipe(catchError(error => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        let tokenStoraged: ResponseLogin = <ResponseLogin>this.localStorageService.get(tokenStoragedKey);
        if(tokenStoraged){
          return this.handle401Error(tokenStoraged, req, next);
        }else{
          this.router.navigate(['']);
          return throwError(error);
        }
      } else {
        return throwError(error);
      }
    }));
  }

  private handle401Error(tokenStoraged: ResponseLogin, request: HttpRequest<any>, next: HttpHandler) {
    return this.loginService.refreshToken(tokenStoraged.refreshToken).pipe(
      switchMap((token: ResponseRefreshToken) => {
        tokenStoraged.accessToken = token.accessToken;
        this.localStorageService.set(tokenStoragedKey, tokenStoraged);
        return next.handle(this.addToken(request, token.accessToken));
      }
    ));
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        'x-access-token': token
      }
    });
  }
}
