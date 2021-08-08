import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainCustomerComponent } from './main-customer.component';
import { PersonalInformationComponent } from '../personal-information/personal-information.component';
import { OrderHistoryComponent } from '../order-history/order-history.component';
import { OrderHistoryDetailComponent } from '../order-history-detail/order-history-detail.component';
import { AddressBookComponent } from '../address-book/address-book.component';

import { RouteGuard } from '../../services/guards/route.guard';

const routes: Routes = [
  {
    path: 'customer',
    component: MainCustomerComponent,
    canActivate: [RouteGuard],
    children:[
      { path: '', redirectTo: 'personal', pathMatch: 'full'},
      { path: 'personal', component: PersonalInformationComponent, data: { title: 'Tài khoản của tôi' } },
      { path: 'order-history', component: OrderHistoryComponent, data: { title: 'Lịch sử mua hàng' } },
      { path: 'order-history/:id', component: OrderHistoryDetailComponent, data: { title: 'Lịch sử mua hàng' } },
      { path: 'address-book', component: AddressBookComponent, data: { title: 'Sổ địa chỉ' } },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainCustomerRoutingModule { }
