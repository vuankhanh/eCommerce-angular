import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/es';
registerLocaleData(localeFr);

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

import { AppComponent } from './app.component';
import { HomePageComponent } from './main/home-page/home-page.component';
import { MapsComponent } from './maps/maps.component';

//Pipe
import { ReplaceProtocolNamePipe } from './pipes/replace-protocol-name.pipe';
import { ReplaceSpacePipe } from './pipes/replace-space.pipe';
import { GalleryRoutePipe } from './pipes/gallery-route.pipe';
import { SanitizeHtmlBindingPipe } from './pipes/sanitize-html-binding.pipe';

//Directive
import { InputOnlyNumberDirective } from './directives/input-only-number.directive';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { CapsLockDirective } from './directives/caps-lock.directive';

import { SlideShowComponent } from './main/slide-show/slide-show.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ProductionsComponent } from './main/product/product.component';
import { AboutUsComponent } from './main/about-us/about-us.component';
import { ProductDetailComponent } from './main/product-detail/product-detail.component';
import { CartComponent } from './main/cart/cart.component';
import { ContactComponent } from './main/contact/contact.component';
import { ProductCategoryComponent } from './main/product-category/product-category.component';

//App Providers
import { AppServicesService } from './services/app-services.service';

//Sharing
import { SkeletonComponent } from './sharing/component/skeleton/skeleton.component';
import { PaginationComponent } from './sharing/component/pagination/pagination.component';

import { MainComponent } from './sharing/modal/main/main.component';
import { LoginComponent } from './sharing/modal/login/login.component';
import { RegisterComponent } from './sharing/modal/register/register.component';
import { ForgotPasswordComponent } from './sharing/modal/forgot-password/forgot-password.component';
import { ConfirmActionComponent } from './sharing/modal/confirm-action/confirm-action.component';
import { AddressChooseComponent } from './sharing/modal/address-choose/address-choose.component';
import { PostsComponent } from './sharing/component/posts/posts.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    MapsComponent,

    ReplaceProtocolNamePipe,
    ReplaceSpacePipe,
    GalleryRoutePipe,
    SanitizeHtmlBindingPipe,

    InputOnlyNumberDirective,
    ClickOutsideDirective,
    CapsLockDirective,

    SlideShowComponent,
    HeaderComponent,
    FooterComponent,
    ProductionsComponent,
    AboutUsComponent,
    ProductDetailComponent,
    CartComponent,
    ContactComponent,
    ProductCategoryComponent,

    SkeletonComponent,
    PaginationComponent,

    MainComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    ConfirmActionComponent,
    AddressChooseComponent,
    PostsComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
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
    MatRadioModule
  ],
  providers: [
    AppServicesService,
    { provide: LOCALE_ID, useValue: 'es'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
