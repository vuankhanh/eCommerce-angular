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
import { SupportComponent } from './main/support/support.component';

import { PageNotFoundComponent } from './main/page-not-found/page-not-found.component';

import { RouteGuard } from './services/guards/route.guard';
import { PaymentConfirmGuard } from './services/guards/payment-confirm.guard';

import { ProductCategoryResolver } from './services/resolvers/product-category.resolver';
import { ProductDetailResolver } from './services/resolvers/product-detail.resolver';
import { SupportResolver } from './services/resolvers/support.resolver';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    data: {
      title: 'Thủy Hải Sản Carota',
      breadcrumb: 'Trang chủ'
    }
  }, {
    path: 'cart',
    component: CartComponent,
    data: {
      title: 'Giỏ Hàng',
      breadcrumb: 'Giỏ Hàng'
    }
  }, {
    path: 'payment-confirm',
    component: PaymentPageComponent,
    data: {
      title: 'Xác nhận thanh toán',
      breadcrumb: 'Xác nhận thanh toán'
    },
    canActivate: [PaymentConfirmGuard]
  }, {
    path: 'san-pham',
    component: ProductionsComponent,
    data: {
      title: 'Sản phẩm',
      breadcrumb: 'Sản phẩm'
    },
    children: [
      {
        path: ':category',
        component: ProductCategoryComponent,
        data: {
          breadcrumb: (data: any) => {
            return data.productCategory ? data.productCategory.name : ''
          },
        },
        resolve: {
          productCategory: ProductCategoryResolver
        }
      }, {
        path: ':category/:route',
        component: ProductDetailComponent,
        data: {
          breadcrumb: (data: any) => {
            return data.product ? data.product.name : ''
          },
        },
        resolve: {
          product: ProductDetailResolver
        }
      }
    ]
  }, {
    path: 'verify-email',
    component: VerificationEmailComponent,
    data: {
      title: 'Kích hoạt Email',
      breadcrumb: 'Kích hoạt Email'
    }
  }, {
    path: 'reset-password',
    component: ResetPasswordComponent,
    data: {
      title: 'Quên mật khẩu',
      breadcrumb: 'Quên mật khẩu'
    }
  }, {
    path: 'support/:route',
    component: SupportComponent,
    data: {
      breadcrumb: (data: any) => {
        return data.support ? data.support.name : ''
      },
    },
    resolve: {
      support: SupportResolver
    }
    
  },
  {
    path: 'customer',
    loadChildren: () => import('./customer-information/main-customer/main-customer.module').then(m => m.MainCustomerModule),
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
