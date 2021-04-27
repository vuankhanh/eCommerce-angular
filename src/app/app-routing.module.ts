import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePageComponent } from './main/home-page/home-page.component';
import { ProductionsComponent } from './main/product/product.component';
import { ProductDetailComponent } from './main/product-detail/product-detail.component';

const routes: Routes = [
  { path: '', redirectTo: 'homepage', pathMatch: 'full' },
  { path: 'homepage', component: HomePageComponent },
  { path: 'productions', component: ProductionsComponent },
  { path: 'productions-detail/:id', component: ProductDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
