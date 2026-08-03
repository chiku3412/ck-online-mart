import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
    selector: 'app-add-category',
    standalone: true,
    imports: [MatFormFieldModule, MatInputModule, FormsModule, MatIconModule],
    templateUrl: './add-category.component.html'
})
export class AddCategoryComponent {
    categoryName: string = '';

    onSubmit() {
        if (this.categoryName.trim()) {
        console.log('Category added:', this.categoryName);
        // API call here
        this.categoryName = '';
        }
    }
}
