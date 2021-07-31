import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hostConfiguration } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VerifyEmailService {
  private urlVerifyEmail: string = hostConfiguration.host+'/verify-email'
  constructor(
    private httpClient: HttpClient
  ) { }

  verify(userId: string, emailToken: string){
    let params: HttpParams = new HttpParams();
    params = params.append('userId', userId);
    params = params.append('emailToken', emailToken);

    return this.httpClient.get(this.urlVerifyEmail, {params});
  }
}
