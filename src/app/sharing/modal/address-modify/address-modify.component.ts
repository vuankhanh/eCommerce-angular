import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';

import { ResponseLogin } from 'src/app/services/api/login.service';
import { AdministrativeUnitsService } from 'src/app/services/api/administrative-units.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';

import { Subscription } from 'rxjs';
import { UserInformation } from 'src/app/models/UserInformation';
import { Address, Province, District, Ward, Position } from 'src/app/models/Address';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomerAddressService, ResponseAddress } from 'src/app/services/api/customer-address.service';

const tokenStoragedKey = 'carota-token';
@Component({
  selector: 'app-address-modify',
  templateUrl: './address-modify.component.html',
  styleUrls: ['./address-modify.component.scss']
})
export class AddressModifyComponent implements OnInit, OnDestroy {
  addressForm: FormGroup;
  userInfo: UserInformation | null;

  provinces: Array<Province> = [];
  districts: Array<District> = [];
  wards: Array<Ward> = [];

  subscription: Subscription = new Subscription();
  constructor(
    public dialogRef: MatDialogRef<AddressModifyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DataInit,
    private formBuilder: FormBuilder,
    private administrativeUnitsService: AdministrativeUnitsService,
    private localStorageService: LocalStorageService,
    private customerAddressService: CustomerAddressService,
    private authService: AuthService,
    private toastService: ToastService
  ) {
    
  }

  ngOnInit(): void {
    this.formInit();
    this.getProvince();
    this.checkModalType(this.data);
    this.getUserInfo();
  }

  formInit(){
    console.log(this.data);
    this.addressForm = this.formBuilder.group({
      responsiblePerson: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      street: ['', Validators.required],
      ward: ['', Validators.required],
      district: ['', Validators.required],
      province: ['', Validators.required],
      position: this.formBuilder.group({
        lat: [''],
        lng: ['']
      }),
      isHeadquarters: [false, Validators.required],
    })
  }

  getUserInfo(){
    this.authService.getUserInformation().subscribe(userInfo=>{
      this.userInfo = userInfo;
    })
  }

  checkModalType(dataInit: DataInit){
    if(dataInit.type === 'insert'){
      
    }else if(dataInit.type === 'update' && dataInit.address){
      this.addressForm.controls['responsiblePerson'].setValue(dataInit.address.responsiblePerson);
      this.addressForm.controls['phoneNumber'].setValue(dataInit.address.phoneNumber);
      this.addressForm.controls['street'].setValue(dataInit.address.street);
      this.addressForm.controls['isHeadquarters'].setValue(dataInit.address.isHeadquarters);
      this.addressForm.get('position')?.get('lat')?.setValue(dataInit.address.position?.lat);
      this.addressForm.get('position')?.get('lng')?.setValue(dataInit.address.position?.lng);
      this.getDistrict(dataInit.address.province.code);
      this.getWard(dataInit.address.district.code);
    }
  }

  getProvince(){
    let tokenStoraged: ResponseLogin = <ResponseLogin>this.localStorageService.get(tokenStoragedKey);
    if(tokenStoraged){
      this.subscription.add(
        this.administrativeUnitsService.getProvince(tokenStoraged.accessToken).subscribe(res=>{
          this.provinces = res;
          if(this.data.type === 'update' && this.data.address){
            let index:number = this.findIndexOfObjectInArray(this.data.address.province._id, this.provinces)
            this.addressForm.controls['province'].setValue(index);
          }
        })
      )
    }
  }

  getDistrict(provinceCode: string, ){
    let tokenStoraged: ResponseLogin = <ResponseLogin>this.localStorageService.get(tokenStoragedKey);
    if(tokenStoraged){
      this.subscription.add(
        this.administrativeUnitsService.getDistrict(tokenStoraged.accessToken, provinceCode).subscribe(res=>{
          this.districts = res;
          // console.log()
          if(this.data.type === 'update' && this.data.address){
            let index:number = this.findIndexOfObjectInArray(this.data.address.district._id, this.districts)
            this.addressForm.controls['district'].setValue(index);
          }
        }, error=>{
          this.districts = [];
        })
      )
    }
  }

  getWard(districtCode: string){
    let tokenStoraged: ResponseLogin = <ResponseLogin>this.localStorageService.get(tokenStoragedKey);
    if(tokenStoraged){
      this.subscription.add(
        this.administrativeUnitsService.getWard(tokenStoraged.accessToken, districtCode).subscribe(res=>{
          this.wards = res;
          if(this.data.type === 'update' && this.data.address){
            let index:number = this.findIndexOfObjectInArray(this.data.address.ward._id, this.wards)
            this.addressForm.controls['ward'].setValue(index);
          }
          console.log(res);
        })
      )
    }
  }

  provinceChange(event: MatSelectChange){
    console.log(event);
    let index: number = event.value;
    let province: Province = this.provinces[index];
    this.getDistrict(province.code);
  }

  districtChange(event: MatSelectChange){
    console.log(event);
    let index: number = event.value;
    let district: District = this.districts[index];
    this.getWard(district.code);
  }

  submit(){
    if(this.data.type === 'insert'){
      this.insert();
    }else if(this.data.type === 'update'){
      this.update();
    }else{
      this.toastService.shortToastError('Đã có lỗi xảy ra', 'Lỗi ')
    }
  }

  update(){
    if(this.addressForm.valid){
      console.log(this.addressForm.value);

      let address: Address = {
        _id: this.data.address?._id,
        responsiblePerson: this.addressForm.value.responsiblePerson,
        phoneNumber: this.addressForm.value.phoneNumber,
        street: this.addressForm.value.street,
        province: this.provinces[this.addressForm.value.province],
        district: this.districts[this.addressForm.value.district],
        ward: this.wards[this.addressForm.value.ward],
        position: this.addressForm.value.position,
        isHeadquarters: this.addressForm.value.isHeadquarters,
      }
      
      let tokenStoraged: ResponseLogin = <ResponseLogin>this.localStorageService.get(tokenStoragedKey);
      if(tokenStoraged){
        this.subscription.add(
          this.customerAddressService.update(tokenStoraged.accessToken, address).subscribe(res=>{
            console.log(res);
            if(res.status === 200){
              let resBody: ResponseAddress = <ResponseAddress>res.body;
              if(resBody.accessToken){
                this.authService.updateAccessToken(resBody.accessToken);
                this.toastService.shortToastSuccess('Đã cập nhật thành công', 'Thành công');
              }
            }else if(res.status){
              this.toastService.shortToastWarning('Không có gì thay đổi', '');
            }
            this.dialogRef.close();
          })
        )
      }
      
    }
  }

  async insert(){
    if(this.addressForm.valid){
      console.log(this.addressForm.value);

      let address: Address = {
        street: this.addressForm.value.street,
        responsiblePerson: this.addressForm.value.responsiblePerson,
        phoneNumber: this.addressForm.value.phoneNumber,
        province: this.provinces[this.addressForm.value.province],
        district: this.districts[this.addressForm.value.district],
        ward: this.wards[this.addressForm.value.ward],
        position: this.addressForm.value.position,
        isHeadquarters: this.addressForm.value.isHeadquarters,
      };
      
      let tokenStoraged: ResponseLogin = <ResponseLogin>this.localStorageService.get(tokenStoragedKey);
      if(tokenStoraged){
        this.subscription.add(
          this.customerAddressService.insert(tokenStoraged.accessToken, address).subscribe(res=>{
            console.log(res);
            if(res.status === 200){
              let resBody: ResponseAddress = <ResponseAddress>res.body;
              if(resBody.accessToken){
                this.authService.updateAccessToken(resBody.accessToken);
                this.toastService.shortToastSuccess('Đã thêm địa điểm thành công', 'Thành công');
              }
            }else if(res.status){
              this.toastService.shortToastWarning('Không có gì thay đổi', '');
            }
            this.dialogRef.close();
          })
        )
      }
      
    }
  }

  findIndexOfObjectInArray(
    id: string,
    array: Array<Province> | Array<District> | Array<Ward>
  ){
    return array.findIndex(object=>object._id === id);
  }
  
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}

interface DataInit{
  type: string,
  address: Address | null
}
