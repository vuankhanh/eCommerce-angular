import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

//Validation Form
import { tiengVietKhongDau } from '../../services/formCustom/validators'

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.scss']
})
export class PersonalInformationComponent implements OnInit {
  informationGroup: FormGroup;
  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  formInit(){
    let emailRegEx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let phoneNumberRegEx = /((0)+([0-9]{9})\b)/g;
    this.informationGroup = this.formBuilder.group({
      userName: ['', { validators: [Validators.required, tiengVietKhongDau()], updateOn: 'blur' }],
      name: ['', Validators.required],
      email: ['', { validators: [Validators.required, Validators.pattern(emailRegEx)], updateOn: 'blur' }],
      phoneNumber: ['', { validators: [Validators.required, , Validators.pattern(phoneNumberRegEx)], updateOn: 'blur' }],
    });
  }

}
