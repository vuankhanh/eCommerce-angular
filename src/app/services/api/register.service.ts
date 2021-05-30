import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor() { }
}

export interface Register{
  userName: string,
  password: string,
  name: string,
  emailAddress: string,
  phoneNumber: string
}
