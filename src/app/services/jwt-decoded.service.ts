import { Injectable } from '@angular/core';

import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class JwtDecodedService {

  constructor() { }

  jwtDecoded(token: string){
    try {
      return jwt_decode(token);
    } catch (error) {
      console.log(error)
    }
  }
}
