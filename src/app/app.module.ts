import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
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

import { AppComponent } from './app.component';
import { HomePageComponent } from './main/home-page/home-page.component';
import { MapsComponent } from './maps/maps.component';

//Pipe
import { ReplaceProtocolNamePipe } from './pipes/replace-protocol-name.pipe';
import { ReplaceSpacePipe } from './pipes/replace-space.pipe';

//Directive
import { InputOnlyNumberDirective } from './directive/input-only-number.directive';

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

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    MapsComponent,

    ReplaceProtocolNamePipe,
    ReplaceSpacePipe,

    InputOnlyNumberDirective,

    SlideShowComponent,

    HeaderComponent,

    ProductionsComponent,

    AboutUsComponent,

    ProductDetailComponent,

    CartComponent,

    ContactComponent,

    ProductCategoryComponent,

    SkeletonComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatCardModule,
    MatBadgeModule,
    MatTabsModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
