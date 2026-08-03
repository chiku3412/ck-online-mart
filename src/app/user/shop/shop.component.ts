import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductFilterComponent } from "./product-filter/product-filter.component";

@Component({
    selector: 'app-shop',
    standalone: true,
    imports: [RouterModule, ProductFilterComponent],
    templateUrl: './shop.component.html'
})
export class ShopComponent {
    isFilterOpen = false;
}
