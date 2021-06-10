import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainCustomerRoutingModule } from './main-customer-routing.module';

import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { MainCustomerComponent } from '../main-customer/main-customer.component';
import { PersonalInformationComponent } from '../personal-information/personal-information.component';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { AddressBookComponent } from '../address-book/address-book.component';
import { PurchaseHistoryComponent } from '../purchase-history/purchase-history.component';

@NgModule({
    imports: [
        CommonModule,
        MainCustomerRoutingModule,

        MatListModule,
        MatIconModule,
        MatInputModule
    ],
    declarations:[
        MainCustomerComponent,
        PersonalInformationComponent,
        ChangePasswordComponent,
        AddressBookComponent,
        PurchaseHistoryComponent,
    ]
})
export class MainCustomerModule { }