import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ResetPasswordService } from 'src/app/services/api/reset-password.service';
import { ToastService } from 'src/app/services/toast.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
  @Output() valueChange= new EventEmitter();
  
  forgotPasswordForm: FormGroup;

  subscription: Subscription = new Subscription()
  constructor(
    private formBuilder: FormBuilder,
    private resetPasswordService: ResetPasswordService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    let emailRegEx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', { validators: [Validators.required, Validators.pattern(emailRegEx)], updateOn: 'blur' }]
    })
  }

  checkEmail(){
    if(this.forgotPasswordForm.valid){
      console.log(this.forgotPasswordForm.value);
      this.subscription.add(
        this.resetPasswordService.checkEmail(this.forgotPasswordForm.value.email).subscribe(res=>{
          this.valueChange.emit('forgotPasswordSuccessful');
        },err=>{
          this.toastService.shortToastError('Email không hợp lệ','');
        })
      )
    }
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
