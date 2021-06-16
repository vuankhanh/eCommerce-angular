import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';

//Model
import { UserInformation, JwtDecoded } from '../../models/UserInformation';

//Service
import { AuthService } from 'src/app/services/auth.service';
import { UpdatePersonalInformationService, ResponseUpdate } from 'src/app/services/api/update-personal-information.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ResponseLogin } from 'src/app/services/api/login.service';
import { JwtDecodedService } from 'src/app/services/jwt-decoded.service';
import { ToastService } from 'src/app/services/toast.service';

//Validation Form
import { tiengVietKhongDau, safePassword, isSameInConfirmPassword } from '../../services/formCustom/validators'

import { Subscription } from 'rxjs';


const tokenStoragedKey = 'carota-token';
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
  private emailRegEx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  private phoneNumberRegEx = /((0)+([0-9]{9})\b)/g;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private updatePersonalInformationService: UpdatePersonalInformationService,
    private localStorageService: LocalStorageService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.listenUserInformation();
  }

  listenUserInformation(){
    this.subscription.add(
      this.authService.getUserInformation().subscribe(userInfo=>{
        this.formInit(userInfo);
        this.setDisablePasswordControls(this.checkedChangePassword);
      })
    )
  }

  formInit(userInformation: UserInformation | null){
    if(userInformation){
      
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
            validators: [Validators.required, Validators.pattern(this.emailRegEx)],
            updateOn: 'blur'
          }
        ],
        phoneNumber: [userInformation?.phoneNumber, { validators: [Validators.required, , Validators.pattern(this.phoneNumberRegEx)], updateOn: 'blur' }],
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
      this.informationGroup.controls['confirmPassword'].disable();
      let tokenStoraged: ResponseLogin = <ResponseLogin>this.localStorageService.get(tokenStoragedKey);
      if(tokenStoraged){
        this.updatePersonalInformationService.update(tokenStoraged.accessToken, this.informationGroup.value).subscribe(res=>{
          this.informationGroup.controls['confirmPassword'].enable();
          this.informationGroup.controls['oldPassword'].setErrors(null);
          if(res.status === 200){
            let resBody: ResponseUpdate = <ResponseUpdate>res.body;
            if(resBody.accessToken){
              this.authService.updateAccessToken(resBody.accessToken);
              this.toastService.shortToastSuccess('Đã cập nhật thành công', 'Thành công')
            }
          }else if(res.status){
            this.toastService.shortToastWarning('Không có gì thay đổi', '');
          }
        },error=>{
          console.log(error);
          this.informationGroup.controls['confirmPassword'].enable();
          if(error.status === 400){
            this.informationGroup.controls['oldPassword'].setErrors({ passwordIsIncorrect: true });
          }else{
            this.toastService.shortToastError('Đã có lỗi xảy ra', '');
          }
        })
      }
    }
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
