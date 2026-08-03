import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './user/header/header.component';
import { FooterComponent } from './user/footer/footer.component';
import { AboutComponent } from './user/about/about.component';
import { ContactComponent } from './user/contact/contact.component';
import { ProductComponent } from './user/shop/product/product.component';
import { ProductDetailsComponent } from './user/shop/product-details/product-details.component';
import { HomeComponent } from './user/home/home.component';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        MatFormFieldModule,
        MatInputModule,
        HeaderComponent,
        FooterComponent,
        AboutComponent,
        ContactComponent,
        ProductComponent,
        ProductDetailsComponent,
        HomeComponent,
        HttpClientModule
    ],
    providers: [
    provideAnimationsAsync()
  ],
    bootstrap: [AppComponent]
})
export class AppModule { }
