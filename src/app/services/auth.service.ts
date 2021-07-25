import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

//Component
import { MainComponent, TypeLogin } from '../sharing/modal/main/main.component';

//Model
import { UserInformation, JwtDecoded } from '../models/UserInformation';

//Service
import { JwtDecodedService } from './jwt-decoded.service';
import { LocalStorageService } from './local-storage.service';
import { ResponseLogin } from './api/login.service';
import { ConfigService } from './api/config.service';

import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError , map } from 'rxjs/operators'

const tokenStoragedKey = 'carota-token';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userInformation: BehaviorSubject<UserInformation | null> = new BehaviorSubject<UserInformation | null>(null);
  constructor(
    private router: Router,
    private dialog: MatDialog,
    private jwtDecodedService: JwtDecodedService,
    private localStorageService: LocalStorageService,
    private configService: ConfigService
  ) {
    this.getUserInfoFromTokenStoraged();
  }

  login(type: string){
    if(type === 'login' || type === 'register' || type === 'forgotPassword'){
      let data: TypeLogin = { type: type };
      const dialogRef = this.dialog.open(MainComponent,{
        panelClass: 'login-modal',
        data: data,
      });
  
      dialogRef.afterClosed().subscribe(result=>{
        console.log('Dialog result: ');
        if(result){
          let tokenInformation: JwtDecoded = <JwtDecoded>this.jwtDecodedService.jwtDecoded(result.accessToken);
          this.localStorageService.set(tokenStoragedKey, result);
          console.log(tokenInformation);
          if(tokenInformation){
            this.setUserInformation(tokenInformation.data);
          }
        }
      })
    }else{
      console.log('Không đúng Modal Login')
    }
  }

  updateAccessToken(newAccessToken: string){
    let tokenStoraged: ResponseLogin = <ResponseLogin>this.localStorageService.get(tokenStoragedKey);
    if(tokenStoraged){
      tokenStoraged.accessToken = newAccessToken;
      let tokenInformation: JwtDecoded = <JwtDecoded>this.jwtDecodedService.jwtDecoded(tokenStoraged.accessToken);
      if(tokenInformation){
        this.localStorageService.set(tokenStoragedKey, tokenStoraged);
        this.setUserInformation(tokenInformation.data);
      }
    }
  }

  checkTokenValidation(): Observable<boolean>{
    let tokenStoraged: ResponseLogin = <ResponseLogin>this.localStorageService.get(tokenStoragedKey);
    if(tokenStoraged && tokenStoraged.accessToken){
      let accessToken = tokenStoraged.accessToken;
      return this.configService.getConfig(accessToken).pipe(
        map(res=>{
          this.configService.set(res);
          return true;
        })
      );
    }else{
      this.logout().then(_=>{
        this.login('login');
      });
      return of(false);
    }
  }

  getUserInfoFromTokenStoraged(){
    let tokenStoraged: ResponseLogin = <ResponseLogin>this.localStorageService.get(tokenStoragedKey);
    if(tokenStoraged){
      let tokenInformation: JwtDecoded = <JwtDecoded>this.jwtDecodedService.jwtDecoded(tokenStoraged.accessToken);
        if(tokenInformation){
          this.setUserInformation(tokenInformation.data);
        }
    }
  }

  logout(){
    this.userInformation.next(null);
    this.localStorageService.remove(tokenStoragedKey);
    return this.router.navigate(['']);
  }

  setUserInformation(userInformation: UserInformation | null){
    this.userInformation.next(userInformation);
  }

  getUserInformation():Observable<UserInformation | null>{
    return this.userInformation.asObservable()
  }
}
