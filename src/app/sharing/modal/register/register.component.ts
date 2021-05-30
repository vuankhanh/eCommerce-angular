import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

//Validation Form
import { tiengVietKhongDau, safePassword, isSameInConfirmPassword } from '../../../services/formCustom/validators'

import { RegisterService, Register } from '../../../services/api/register.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @Output() valueChange = new EventEmitter();
  registerGroup: FormGroup;
  fieldTextType: boolean = false;
  repeatFieldTextType: boolean = false;
  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.formInit();
  }

  formInit(){
    let emailRegEx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let phoneNumberRegEx = /((0)+([0-9]{9})\b)/g;
    this.registerGroup = this.formBuilder.group({
      userName: ['', { validators: [Validators.required, tiengVietKhongDau()] }],
      password: ['', { validators: [Validators.required, safePassword()], updateOn: 'blur' }],
      confirmPassword: ['', { validators: [Validators.required, isSameInConfirmPassword()], updateOn: 'blur' }],
      name: ['', Validators.required],
      emailAddress: ['', { validators: [Validators.required, Validators.pattern(emailRegEx)], updateOn: 'blur' }],
      phoneNumber: ['', { validators: [Validators.required, , Validators.pattern(phoneNumberRegEx)], updateOn: 'blur' }],
    });

    this.registerGroup.valueChanges.subscribe(value=>{
      console.log(this.registerGroup.controls['userName'].hasError('tiengviet'))
    })
  }

  passwordValid(){
    return this.registerGroup.controls['password'].valid && this.registerGroup.controls['confirmPassword'].valid;
  }

  register(){
    if(this.registerGroup.valid){
      console.log(this.registerGroup.value)
    }
  }

}
