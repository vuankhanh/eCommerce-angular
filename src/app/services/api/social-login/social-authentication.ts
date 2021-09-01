import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hostConfiguration } from 'src/environments/environment';

import { SocialAuthService, SocialUser } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";

import { ResponseLogin } from '../login.service';

@Injectable({
  providedIn: 'root'
})
export class SocialAuthenticationService {
  private urlGoogle: string = hostConfiguration.host+'/auth-google';
  private urlFacebook: string = hostConfiguration.host+'/auth-facebook';
  constructor(
    private httpClient: HttpClient,
    private socialAuthService: SocialAuthService
  ) { }

  async signInWithGoogle(): Promise<ResponseLogin> {
    return new Promise(async(resolve, reject)=>{
      try {
        let socialUser: SocialUser = await this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
        
        let access_token = socialUser.authToken;
        this.httpClient.post<ResponseLogin>(this.urlGoogle, { access_token }).subscribe(result=>{
          resolve(result);
        },error=>{
          reject(error);
        });
      } catch (error) {
        reject(error);
      }
    })
  }

  signInWithFB(): Promise<ResponseLogin> {
    return new Promise(async(resolve, reject)=>{
      try {
        let socialUser: SocialUser = await this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
        
        let access_token = socialUser.authToken;
        this.httpClient.post<ResponseLogin>(this.urlFacebook, { access_token }).subscribe(result=>{
          resolve(result);
        },error=>{
          reject(error);
        });
      } catch (error) {
        reject(error);
      }
    })
  }

  signOut(): void {
    this.socialAuthService.signOut();
  }
}
