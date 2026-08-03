import { Component } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [RouterModule, MatMenuModule],
  templateUrl: './category-list.component.html'
})
export class CategoryListComponent {

}
