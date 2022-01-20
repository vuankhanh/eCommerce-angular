import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePageComponent } from './main/home-page/home-page.component';
import { CartComponent } from './main/cart/cart.component';
import { PaymentPageComponent } from './main/payment-page/payment-page.component';
import { ProductionsComponent } from './main/product/product.component';
import { ProductCategoryComponent } from './main/product-category/product-category.component';
import { ProductDetailComponent } from './main/product-detail/product-detail.component';
import { VerificationEmailComponent } from './main/verification-email/verification-email.component';
import { ResetPasswordComponent } from './main/reset-password/reset-password.component';

import { AboutUsComponent } from './main/support/about-us/about-us.component';
import { ReturnPolicyComponent } from './main/support/return-policy/return-policy.component';
import { PrivacyPolicyComponent } from './main/support/privacy-policy/privacy-policy.component';
import { TermsOfServiceComponent } from './main/support/terms-of-service/terms-of-service.component';
import { ShippingPolicyComponent } from './main/support/shipping-policy/shipping-policy.component';
import { PaymentPolicyComponent } from './main/support/payment-policy/payment-policy.component';
import { PageNotFoundComponent } from './main/page-not-found/page-not-found.component';
import { MainCustomerComponent } from './customer-information/main-customer/main-customer.component';

import { RouteGuard } from './services/guards/route.guard';
import { PaymentConfirmGuard } from './services/guards/payment-confirm.guard';

const routes: Routes = [
  { path: '', component: HomePageComponent, data: { title: 'Thủy Hải Sản Carota' } },
  { path: 'cart', component: CartComponent, data: { title: 'Giỏ Hàng' } },
  { path: 'payment-confirm', component: PaymentPageComponent, data: { title: 'Xác nhận thanh toán' }, canActivate: [PaymentConfirmGuard] },
  {
    path: 'san-pham',
    component: ProductionsComponent,
    data: { title: 'Sản phẩm' },
    children: [
      { path: '', redirectTo: 'hai-san', pathMatch: 'full' },
      { path: ':category', component: ProductCategoryComponent },
      { path: ':category/:route', component: ProductDetailComponent },
    ]
  },
  { path: 'verify-email', component: VerificationEmailComponent, data: { title: 'Kích hoạt Email' } },
  { path: 'reset-password', component: ResetPasswordComponent, data: { title: 'Quên mật khẩu' } },
  {
    path: 'support',
    children: [
      { path: '', redirectTo: 'about-us', pathMatch: 'full' },
      { path: 'about-us', component: AboutUsComponent, data: { title: 'Giới thiệu' } },
      { path: 'return-policy', component: ReturnPolicyComponent, data: { title: 'Chính sách đổi trả' } },
      { path: 'privacy-policy', component: PrivacyPolicyComponent, data: { title: 'Chính sách bảo mật' } },
      { path: 'terms-of-service', component: TermsOfServiceComponent, data: { title: 'Điều khoản dịch vụ' } },
      { path: 'shipping-policy', component: ShippingPolicyComponent, data: { title: 'Chính sách vận chuyển' } },
      { path: 'payment-policy', component: PaymentPolicyComponent, data: { title: 'Chính sách thanh toán' } }
    ]
  },
  {
    path: 'customer',
    loadChildren: ()=> import('./customer-information/main-customer/main-customer.module').then( m => m.MainCustomerModule),
    canActivate: [RouteGuard],
  },
  { path: '404', component: PageNotFoundComponent },
  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
