import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { AppComponent } from './app.component';
import { HomePageComponent } from './main/home-page/home-page.component';
import { MapsComponent } from './maps/maps.component';

import { ReplaceProtocolNamePipe } from './pipes/replace-protocol-name.pipe';
import { SlideShowComponent } from './main/slide-show/slide-show.component';
import { HeaderComponent } from './header/header.component';
import { ProductionsComponent } from './main/product/product.component';
import { AboutUsComponent } from './main/about-us/about-us.component';
import { ProductDetailComponent } from './main/product-detail/product-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    MapsComponent,

    ReplaceProtocolNamePipe,

    SlideShowComponent,

    HeaderComponent,

    ProductionsComponent,

    AboutUsComponent,

    ProductDetailComponent,
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
