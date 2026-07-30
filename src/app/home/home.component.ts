import { Component } from '@angular/core';
import { HomeBannerComponent } from "../home-banner/home-banner.component";
import { ProductCategoryComponent } from "../product-category/product-category.component";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ProductComponent } from "../shop/product/product.component";

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [HomeBannerComponent, ProductCategoryComponent, MatFormFieldModule, MatInputModule, ProductComponent],
    templateUrl: './home.component.html'
})
export class HomeComponent {
}
