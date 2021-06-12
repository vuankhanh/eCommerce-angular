import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';

//Model
import { UserInformation, JwtDecoded } from '../../models/UserInformation';

import { AuthService } from 'src/app/services/auth.service';

//Validation Form
import { tiengVietKhongDau, safePassword, isSameInConfirmPassword } from '../../services/formCustom/validators'

import { Subscription } from 'rxjs';
@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.scss']
})
export class PersonalInformationComponent implements OnInit, OnDestroy {
  @ViewChild('oldPassword') oldPassword: ElementRef;
  informationGroup: FormGroup;
  checkedChangePassword: boolean = false;
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
        this.formInit(userInfo);
        this.setDisablePasswordControls(this.checkedChangePassword);
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
        oldPassword: ['', Validators.required],
        password: ['',
          { 
            validators: [Validators.required, safePassword()],
            updateOn: 'blur'
          }
        ],
        confirmPassword: ['',
          {
            validators: [Validators.required, isSameInConfirmPassword()],
            updateOn: 'blur'
          }
        ],
      });
    }
  }

  changePassword(event: MatCheckboxChange){
    this.checkedChangePassword = event.checked;
    this.setDisablePasswordControls(this.checkedChangePassword);
  }

  setDisablePasswordControls(checkedChangePassword: boolean){
    if(!checkedChangePassword){
      this.informationGroup.controls['oldPassword'].disable();
      this.informationGroup.controls['password'].disable();
      this.informationGroup.controls['confirmPassword'].disable();
    }else{
      this.informationGroup.controls['oldPassword'].enable();
      this.informationGroup.controls['password'].enable();
      this.informationGroup.controls['confirmPassword'].enable();
      setTimeout(() => {
        this.oldPassword.nativeElement.focus();
      }, 150);
    }
  }

  update(){
    if(this.informationGroup.valid){
      console.log(this.informationGroup.value);
    }
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
