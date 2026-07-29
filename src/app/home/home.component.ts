import { Component } from '@angular/core';
import { HomeBannerComponent } from "../home-banner/home-banner.component";
import { ProductCategoryComponent } from "../product-category/product-category.component";
import { ShopComponent } from "../shop/shop.component";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [HomeBannerComponent, ProductCategoryComponent, ShopComponent, MatFormFieldModule, MatInputModule],
    templateUrl: './home.component.html'
})
export class HomeComponent {
}
