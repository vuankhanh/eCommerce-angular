import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

//Service
import { LoginService } from 'src/app/services/api/login.service';
import { ToastService } from 'src/app/services/toast.service';

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
    private toastService: ToastService
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
      this.subscription.add(
        this.loginService.login(this.loginGroup.value).subscribe(res=>{
          console.log(res);
          if(res.status===205){
            alert('Tài khoản chưa kích hoạt')
          }else if(res.status === 200){
            this.closeModal.emit(res.body);
          }
        },error=>{
          if(error.status === 403){
            this.toastService.shortToastError('Tài khoản hoặc Mật khẩu không đúng', 'Lỗi đăng nhập')
          }
          console.log(error);
        })
      );
      console.log(this.loginGroup.value);
    }
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
