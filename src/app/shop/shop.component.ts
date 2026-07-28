import { Component } from '@angular/core';
import { ProductComponent } from "./product/product.component";

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [ProductComponent],
  templateUrl: './shop.component.html'
})
export class ShopComponent {

}
