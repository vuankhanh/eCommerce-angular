import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MainCustomerRoutingModule } from './main-customer-routing.module';

import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';

import { MainCustomerComponent } from '../main-customer/main-customer.component';
import { PersonalInformationComponent } from '../personal-information/personal-information.component';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { AddressBookComponent } from '../address-book/address-book.component';
import { PurchaseHistoryComponent } from '../purchase-history/purchase-history.component';

//Component
import { AddressModifyComponent } from '../../sharing/modal/address-modify/address-modify.component';

import { RefreshTokenInterceptorService } from '../../services/api/refresh-token-interceptor.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MainCustomerRoutingModule,

        MatListModule,
        MatIconModule,
        MatInputModule,
        MatButtonModule,
        MatCheckboxModule,
        MatDialogModule,
        MatSelectModule
    ],
    declarations:[
        MainCustomerComponent,
        PersonalInformationComponent,
        ChangePasswordComponent,
        AddressBookComponent,
        PurchaseHistoryComponent,

        AddressModifyComponent
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: RefreshTokenInterceptorService,
            multi: true
        }
    ]
})
export class MainCustomerModule { }