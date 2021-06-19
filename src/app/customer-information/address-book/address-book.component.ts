import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { AddressModifyComponent } from '../../sharing/modal/address-modify/address-modify.component';
import { ConfirmActionComponent } from 'src/app/sharing/modal/confirm-action/confirm-action.component';

//Model
import { Address } from '../../models/Address';

import { AuthService } from 'src/app/services/auth.service';
import { CustomerAddressService, ResponseAddress } from 'src/app/services/api/customer-address.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ResponseLogin } from 'src/app/services/api/login.service';
import { ToastService } from 'src/app/services/toast.service';
import { AddressModificationService } from 'src/app/services/address-modification.service';

import { Subscription } from 'rxjs';

const tokenStoragedKey = 'carota-token';
@Component({
  selector: 'app-address-book',
  templateUrl: './address-book.component.html',
  styleUrls: ['./address-book.component.scss']
})
export class AddressBookComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription;
  addresses: Array<Address>;
  constructor(
    private dialog: MatDialog,
    private authService: AuthService,
    private customerAddressService: CustomerAddressService,
    private localStorageService: LocalStorageService,
    private toastService: ToastService,
    public addressModificationService: AddressModificationService
  ) { }

  ngOnInit(): void {
    this.listenUserInformation();
    // this.addAnAddress('insert', null);
  }

  listenUserInformation(){
    this.subscription.add(
      this.authService.getUserInformation().subscribe(userInfo=>{
        if(userInfo){
          this.addresses = userInfo!.address;
          console.log(this.addresses);
        }
      })
    )
  }

  deleteAddress(address: Address){
    console.log(address);
    const dialogRef = this.dialog.open(ConfirmActionComponent,{
      panelClass: 'confirm-modal',
      data: 'Bạn chắc chắn xóa?'
    });

    dialogRef.afterClosed().subscribe(result=>{
      console.log('Dialog result: '+result);
      if(result){
        let tokenStoraged: ResponseLogin = <ResponseLogin>this.localStorageService.get(tokenStoragedKey);
        if(tokenStoraged){
          this.customerAddressService.remove(tokenStoraged.accessToken, address).subscribe(res=>{
            if(res.status === 200){
              let resBody: ResponseAddress = <ResponseAddress>res.body;
              if(resBody.accessToken){
                this.authService.updateAccessToken(resBody.accessToken);
                this.toastService.shortToastSuccess('Đã xóa địa chỉ thành công', 'Thành công');
              }
            }else if(res.status){
              this.toastService.shortToastWarning('Không có gì thay đổi', '');
            }
          })
        }
      }else{

      }
    })
  }

  ngOnDestroy(){
    this.subscription.unsubscribe()
  }
}
