import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

//Service
import { LoginService } from 'src/app/services/api/login.service';
import { ToastService } from 'src/app/services/toast.service';
import { SocialAuthenticationService } from 'src/app/services/api/social-login/social-authentication';
import { InProgressSpinnerService } from 'src/app/services/in-progress-spinner.service';

import { Subscription } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  @Output() valueChange = new EventEmitter();
  @Output() closeModal = new EventEmitter();
  loginGroup: FormGroup;
  fieldTextType: boolean = false;

  private subscription: Subscription = new Subscription();
  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private toastService: ToastService,
    private socialAuthenticationService: SocialAuthenticationService,
    private inProgressSpinnerService: InProgressSpinnerService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(){
    this.loginGroup = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login(){
    if(this.loginGroup.valid){
      this.inProgressSpinnerService.progressSpinnerStatus(true);
      this.subscription.add(
        this.loginService.login(this.loginGroup.value).subscribe(res=>{
          this.inProgressSpinnerService.progressSpinnerStatus(false);
          
          if(res.status===205){
            this.toastService.shortToastWarning('Tài khoản chưa kích hoạt', 'Đăng nhập');
          }else if(res.status === 200){
            this.closeModal.emit(res.body);
            this.toastService.shortToastSuccess('Đăng nhập thành công', '');
          }
        },error=>{
          
          this.inProgressSpinnerService.progressSpinnerStatus(false);
          if(error.status === 403){
            this.toastService.shortToastError('Tài khoản hoặc Mật khẩu không đúng', 'Lỗi đăng nhập');
          }else{
            this.toastService.shortToastError('Đã xảy ra lỗi không xác định', 'Lỗi đăng nhập');
          }
        })
      );
    }
  }

  googleLogin(){
    this.socialAuthenticationService.signInWithGoogle().then(userInfo=>{
      this.closeModal.emit(userInfo);
      this.toastService.shortToastSuccess('Đăng nhập thành công', '');
    }).catch(error=>{
      this.toastService.shortToastError('Đã có lỗi xảy ra', 'Lỗi đăng nhập');
    });
  }

  facebookLogin(){
    this.socialAuthenticationService.signInWithFB().then(userInfo=>{
      this.closeModal.emit(userInfo);
      this.toastService.shortToastSuccess('Đăng nhập thành công', '');
    }).catch(error=>{
      this.toastService.shortToastError('Đã có lỗi xảy ra', 'Lỗi đăng nhập')
    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
