import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/es';
registerLocaleData(localeFr);
import { hostConfiguration } from '../environments/environment';

//Module
import { AppRoutingModule } from './app-routing.module';
import { MainCustomerModule } from './customer-information/main-customer/main-customer.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxEditorModule } from 'ngx-editor';
import { ToastrModule } from 'ngx-toastr';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatExpansionModule } from '@angular/material/expansion';

import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';

import { NgxYoutubePlayerModule } from 'ngx-youtube-player';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
const config: SocketIoConfig = { url: hostConfiguration.webSocket, options: { autoConnect: false} };

//PipeModule
import { ReplaceProtocolNameModule } from './pipes/replace-protocol-name/replace-protocol-name.module';
import { ReplaceSpaceModule } from './pipes/replace-space/replace-space.module';
import { GalleryRouteModule } from './pipes/gallery-route/gallery-route.module';
import { SanitizeHtmlBindingModule } from './pipes/sanitize-html-binding/sanitize-html-binding.module';
import { TheDayOfWeekModule } from './pipes/the-day-of-week-format/the-day-of-week-format.module';
import { IsMainModule } from './pipes/is-main/is-main.module';
import { YoutubeIdModule } from './pipes/youtube-id/youtube-id.module';

import { AppComponent } from './app.component';
import { HomePageComponent } from './main/home-page/home-page.component';
import { MapsComponent } from './maps/maps.component';

//Directive
import { InputOnlyNumberDirective } from './directives/input-only-number.directive';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { CapsLockDirective } from './directives/caps-lock.directive';
import { SetBackgroundParentElementColorDirective } from './directives/set-background-parent-element-color.directive';

import { DrawerComponent } from './drawer/drawer.component';
import { SlideShowComponent } from './main/slide-show/slide-show.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ProductionsComponent } from './main/product/product.component';
import { ProductDetailComponent } from './main/product-detail/product-detail.component';
import { CartComponent } from './main/cart/cart.component';
import { PaymentPageComponent } from './main/payment-page/payment-page.component';
import { ProductCategoryComponent } from './main/product-category/product-category.component';
import { ProductCategoryHomePageComponent } from './main/product-category-home-page/product-category-home-page.component';
import { AboutUsComponent } from './main/support/about-us/about-us.component';
import { ReturnPolicyComponent } from './main/support/return-policy/return-policy.component';
import { PrivacyPolicyComponent } from './main/support/privacy-policy/privacy-policy.component';
import { TermsOfServiceComponent } from './main/support/terms-of-service/terms-of-service.component';
import { ShippingPolicyComponent } from './main/support/shipping-policy/shipping-policy.component';
import { PaymentPolicyComponent } from './main/support/payment-policy/payment-policy.component';

//App Providers
import { AppServicesService } from './services/app-services.service';

//Sharing
import { SkeletonComponent } from './sharing/component/skeleton/skeleton.component';
import { PaginationComponent } from './sharing/component/pagination/pagination.component';
import { EmptyCartComponent } from './sharing/component/empty-cart/empty-cart.component';

import { MainComponent } from './sharing/modal/main/main.component';
import { LoginComponent } from './sharing/modal/login/login.component';
import { RegisterComponent } from './sharing/modal/register/register.component';
import { ForgotPasswordComponent } from './sharing/modal/forgot-password/forgot-password.component';
import { ConfirmActionComponent } from './sharing/modal/confirm-action/confirm-action.component';
import { AddressChooseComponent } from './sharing/modal/address-choose/address-choose.component';
import { PostsComponent } from './sharing/component/posts/posts.component';
import { OrderHistoryDetailComponent } from './customer-information/order-history-detail/order-history-detail.component';
import { PaymentSuccessfulComponent } from './sharing/modal/payment-successful/payment-successful.component';
import { VerificationEmailComponent } from './main/verification-email/verification-email.component';
import { RegisterSuccessfulComponent } from './sharing/modal/register-successful/register-successful.component';
import { ResetPasswordComponent } from './main/reset-password/reset-password.component';
import { ForgotPasswordSuccessfulComponent } from './sharing/modal/forgot-password-successful/forgot-password-successful.component';
import { AlertTitleComponent } from './sharing/component/alert-title/alert-title.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    MapsComponent,

    InputOnlyNumberDirective,
    ClickOutsideDirective,
    CapsLockDirective,
    SetBackgroundParentElementColorDirective,

    DrawerComponent,
    SlideShowComponent,
    HeaderComponent,
    FooterComponent,
    ProductionsComponent,
    ProductDetailComponent,
    CartComponent,
    PaymentPageComponent,
    ProductCategoryComponent,
    ProductCategoryHomePageComponent,
    AboutUsComponent,
    ReturnPolicyComponent,
    PrivacyPolicyComponent,
    TermsOfServiceComponent,
    ShippingPolicyComponent,
    PaymentPolicyComponent,

    SkeletonComponent,
    PaginationComponent,
    EmptyCartComponent,

    MainComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    ConfirmActionComponent,
    AddressChooseComponent,
    PostsComponent,
    OrderHistoryDetailComponent,
    PaymentSuccessfulComponent,
    VerificationEmailComponent,
    RegisterSuccessfulComponent,
    ResetPasswordComponent,
    ForgotPasswordSuccessfulComponent,
    AlertTitleComponent,
    
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    HttpClientModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MainCustomerModule,
    BrowserAnimationsModule,
    NgxEditorModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-center',
      preventDuplicates: true,
    }),
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatCardModule,
    MatBadgeModule,
    MatTabsModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatRadioModule,
    MatTableModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatBottomSheetModule,
    MatExpansionModule,

    SocketIoModule.forRoot(config),

    SocialLoginModule,
    NgxYoutubePlayerModule.forRoot(),

    ReplaceProtocolNameModule,
    ReplaceSpaceModule,
    GalleryRouteModule,
    SanitizeHtmlBindingModule,
    TheDayOfWeekModule,
    IsMainModule,
    YoutubeIdModule,
  ],
  providers: [
    AppServicesService,
    { provide: LOCALE_ID, useValue: 'es'},
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '594503809918-0e4urn5uacs50j8ejbj0f887t76et12c.apps.googleusercontent.com'
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('583183603050614')
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
