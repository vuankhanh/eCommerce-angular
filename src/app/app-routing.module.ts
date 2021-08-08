import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePageComponent } from './main/home-page/home-page.component';
import { AboutUsComponent } from './main/about-us/about-us.component';
import { CartComponent } from './main/cart/cart.component';
import { PaymentPageComponent } from './main/payment-page/payment-page.component';
import { ProductionsComponent } from './main/product/product.component';
import { ProductCategoryComponent } from './main/product-category/product-category.component';
import { ProductDetailComponent } from './main/product-detail/product-detail.component';
import { ContactComponent } from './main/contact/contact.component';
import { VerificationEmailComponent } from './main/verification-email/verification-email.component';
import { ResetPasswordComponent } from './main/reset-password/reset-password.component';

const routes: Routes = [
  { path: '', redirectTo: 'homepage', pathMatch: 'full' },
  { path: 'homepage', component: HomePageComponent, data: { title: 'Thủy Hải Sản Carota' } },
  { path: 'cart', component: CartComponent, data: { title: 'Giỏ Hàng' } },
  { path: 'payment-confirm', component: PaymentPageComponent, data: { title: 'Xác nhận thanh toán' } },
  // { path: 'about-us', component: AboutUsComponent },
  {
    path: 'productions',
    component: ProductionsComponent,
    data: { title: 'Sản phẩm' },
    children: [
      { path: '', redirectTo: 'hai-san', pathMatch: 'full' },
      {
        path: ':category', component: ProductCategoryComponent, data: { title: 'Sản phẩm' } },
      { path: ':category/:detail', component: ProductDetailComponent, data: { title: 'Sản phẩm' } },
    ]
  },
  // { path: 'contact', component: ContactComponent },
  { path: 'verify-email', component: VerificationEmailComponent, data: { title: 'Kích hoạt Email' } },
  { path: 'reset-password', component: ResetPasswordComponent, data: { title: 'Quên mật khẩu' } },
  // { path: '**', redirectTo: '/homepage' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
