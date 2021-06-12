import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

//Model
import { UserInformation, JwtDecoded } from '../../models/UserInformation';

import { AuthService } from 'src/app/services/auth.service';

//Validation Form
import { tiengVietKhongDau } from '../../services/formCustom/validators'

import { Subscription } from 'rxjs';
@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.scss']
})
export class PersonalInformationComponent implements OnInit, OnDestroy {
  informationGroup: FormGroup;
  private subscription: Subscription = new Subscription();
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.listenUserInformation();
  }

  listenUserInformation(){
    this.subscription.add(
      this.authService.getUserInformation().subscribe(userInfo=>{
        console.log(userInfo);
        this.formInit(userInfo)
      })
    )
  }

  formInit(userInformation: UserInformation | null){
    if(userInformation){
      let emailRegEx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      let phoneNumberRegEx = /((0)+([0-9]{9})\b)/g;
      this.informationGroup = this.formBuilder.group({
        userName: [
          {
            value: userInformation?.userName,
            disabled: true
          },
          {
            validators: [Validators.required, tiengVietKhongDau()],
            updateOn: 'blur'
          }
        ],
        name: [userInformation?.name, Validators.required],
        email: [
          {
            value: userInformation?.email,
            disabled: true
          },
          {
            validators: [Validators.required, Validators.pattern(emailRegEx)],
            updateOn: 'blur'
          }
        ],
        phoneNumber: [userInformation?.phoneNumber, { validators: [Validators.required, , Validators.pattern(phoneNumberRegEx)], updateOn: 'blur' }],
      });
    }
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
