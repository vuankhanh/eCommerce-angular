import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ResetPasswordService } from 'src/app/services/api/reset-password.service';
import { ToastService } from 'src/app/services/toast.service';

//Validation Form
import { tiengVietKhongDau, safePassword, isSameInConfirmPassword } from '../../services/formCustom/validators'

import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
  newPasswordForm: FormGroup;
  passwordToken: string;
  subscription: Subscription = new Subscription();

  countDown: number;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private resetPasswordService: ResetPasswordService,
    private toastService: ToastService,
    private authSerivce: AuthService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params=>{
      this.passwordToken = params['passwordToken'];
      this.subscription.add(
        this.resetPasswordService.checkToken(this.passwordToken).subscribe(res=>{
          console.log(res);
          this.initForm();
        },err=>{this.router.navigate(['/'])})
      )
    })
  }

  initForm(){
    this.newPasswordForm = this.formBuilder.group({
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
    })
  }

  resetPassword(){
    console.log('Vẫn chạy');
    if(this.newPasswordForm.valid){
      this.subscription.add(
        this.resetPasswordService.newPassword(this.passwordToken, this.newPasswordForm.value.confirmPassword).subscribe(res=>{
          this.toastService.shortToastSuccess('Đã đổi mật khẩu thành công', 'Thành công');
          this.countDown = 3;
          let interval = setInterval(()=>{
            this.countDown--;
            console.log(this.countDown);
            if(this.countDown === 0){
              this.authSerivce.logout().then(_=>{
                this.authSerivce.login('login');
              });
              clearInterval(interval);
            }
          }, 1000);
        },err=>{
          this.toastService.shortToastError('Đã có lỗi xảy ra', 'Thất bại');
        })
      )
    }
    
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
