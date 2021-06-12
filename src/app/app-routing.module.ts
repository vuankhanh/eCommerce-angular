import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePageComponent } from './main/home-page/home-page.component';
import { AboutUsComponent } from './main/about-us/about-us.component';
import { CartComponent } from './main/cart/cart.component';
import { ProductionsComponent } from './main/product/product.component';
import { ProductCategoryComponent } from './main/product-category/product-category.component';
import { ProductDetailComponent } from './main/product-detail/product-detail.component';
import { ContactComponent } from './main/contact/contact.component';

const routes: Routes = [
  { path: '', redirectTo: 'homepage', pathMatch: 'full' },
  { path: 'homepage', component: HomePageComponent },
  { path: 'cart', component: CartComponent },
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
  // { path: '**', redirectTo: '/homepage' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
