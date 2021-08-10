import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Address } from 'src/app/models/Address';

import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { AddressModificationService } from 'src/app/services/address-modification.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-address-choose',
  templateUrl: './address-choose.component.html',
  styleUrls: ['./address-choose.component.scss']
})
export class AddressChooseComponent implements OnInit, OnDestroy {
  addresses: Array<Address>;
  addressSelected: Address = this.data.defaultAddress;

  subscription: Subscription = new Subscription();
  constructor(
    public dialogRef: MatDialogRef<AddressChooseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DefaultAddressData,
    public authService: AuthService,
    private cartService: CartService,
    public addressModificationService: AddressModificationService,

  ) {}

  ngOnInit(): void {
    this.listenUserInformation();
  }

  listenUserInformation(){
    this.subscription.add(
      this.authService.getUserInformation().subscribe(userInfo=>{
        this.addresses = userInfo!.address;
        if(this.addresses){
          let index = this.findIndexOfObjectInArray(this.data.defaultAddress._id!, this.addresses);
          if(this.addresses[index]){
            this.addressSelected = this.addresses[index]; 
          }else{
            this.addressSelected = this.cartService.getDefaultAddress(this.addresses);
          }
        }
      })
    )
  }

  deliveryTo(){
    this.dialogRef.close(
      {
        deliverTo: this.addressSelected
      }
    );
  }

  findIndexOfObjectInArray(
    id: string,
    array: Array<Address>
  ){
    return array.findIndex(object=>object._id === id);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}

interface DefaultAddressData{
  defaultAddress: Address
}
