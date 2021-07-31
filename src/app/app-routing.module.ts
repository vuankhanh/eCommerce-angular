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
  { path: 'homepage', component: HomePageComponent },
  { path: 'cart', component: CartComponent },
  { path: 'payment-confirm', component: PaymentPageComponent },
  { path: 'about-us', component: AboutUsComponent },
  {
    path: 'productions',
    component: ProductionsComponent,
    children: [
      { path: '', redirectTo: 'hai-san', pathMatch: 'full' },
      {
        path: ':category', component: ProductCategoryComponent },
      { path: ':category/:detail', component: ProductDetailComponent },
    ]
  },
  { path: 'contact', component: ContactComponent },
  { path: 'verify-email', component: VerificationEmailComponent },
  { path: 'reset-password', component: ResetPasswordComponent }
  // { path: '**', redirectTo: '/homepage' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
