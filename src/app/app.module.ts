import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/es';
registerLocaleData(localeFr);

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { AppComponent } from './app.component';
import { HomePageComponent } from './main/home-page/home-page.component';
import { MapsComponent } from './maps/maps.component';

//Pipe
import { ReplaceProtocolNamePipe } from './pipes/replace-protocol-name.pipe';
import { ReplaceSpacePipe } from './pipes/replace-space.pipe';

//Directive
import { InputOnlyNumberDirective } from './directives/input-only-number.directive';
import { ClickOutsideDirective } from './directives/click-outside.directive';

import { SlideShowComponent } from './main/slide-show/slide-show.component';
import { HeaderComponent } from './header/header.component';
import { ProductionsComponent } from './main/product/product.component';
import { AboutUsComponent } from './main/about-us/about-us.component';
import { ProductDetailComponent } from './main/product-detail/product-detail.component';
import { CartComponent } from './main/cart/cart.component';
import { ContactComponent } from './main/contact/contact.component';
import { ProductCategoryComponent } from './main/product-category/product-category.component';

//Sharing
import { SkeletonComponent } from './sharing/loading/skeleton/skeleton.component';

import { MainComponent } from './sharing/modal/main/main.component';
import { LoginComponent } from './sharing/modal/login/login.component';
import { RegisterComponent } from './sharing/modal/register/register.component';
import { ForgotPasswordComponent } from './sharing/modal/forgot-password/forgot-password.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    MapsComponent,

    ReplaceProtocolNamePipe,
    ReplaceSpacePipe,

    InputOnlyNumberDirective,
    ClickOutsideDirective,

    SlideShowComponent,

    HeaderComponent,

    ProductionsComponent,

    AboutUsComponent,

    ProductDetailComponent,

    CartComponent,

    ContactComponent,

    ProductCategoryComponent,

    SkeletonComponent,

    MainComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatCardModule,
    MatBadgeModule,
    MatTabsModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
