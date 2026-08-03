import { Component } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [RouterModule, MatMenuModule],
  templateUrl: './product-list.component.html'
})
export class ProductListComponent {

}
