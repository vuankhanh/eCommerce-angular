import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

//Service
import { LoginService } from 'src/app/services/api/login.service';

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
    private loginService: LoginService
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
          this.closeModal.emit(res);
        },error=>{
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
