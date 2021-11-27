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
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatExpansionModule } from '@angular/material/expansion';


//PipeModule
import { ReplaceProtocolNameModule } from '../../pipes/replace-protocol-name/replace-protocol-name.module';
import { ReplaceSpaceModule } from '../../pipes/replace-space/replace-space.module';
import { GalleryRouteModule } from '../../pipes/gallery-route/gallery-route.module';
import { SanitizeHtmlBindingModule } from '../../pipes/sanitize-html-binding/sanitize-html-binding.module';

import { MainCustomerComponent } from '../main-customer/main-customer.component';
import { PersonalInformationComponent } from '../personal-information/personal-information.component';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { AddressBookComponent } from '../address-book/address-book.component';
import { OrderHistoryComponent } from '../order-history/order-history.component';

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
        MatSelectModule,
        MatTableModule,
        MatPaginatorModule,
        MatExpansionModule,

        ReplaceProtocolNameModule,
        ReplaceSpaceModule,
        GalleryRouteModule,
        SanitizeHtmlBindingModule,
    ],
    declarations:[
        MainCustomerComponent,
        PersonalInformationComponent,
        ChangePasswordComponent,
        AddressBookComponent,
        OrderHistoryComponent,

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