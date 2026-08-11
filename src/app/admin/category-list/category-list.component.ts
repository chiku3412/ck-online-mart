import { Component, OnInit } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { Category, CategoryService } from 'src/assets/services/category.service';

@Component({
    selector: 'app-category-list',
    standalone: true,
    imports: [RouterModule, MatMenuModule],
    templateUrl: './category-list.component.html'
})
export class CategoryListComponent implements OnInit {
    categories: Category[] = [];
    constructor(
        private categoryService: CategoryService
    ) {}
    
    loadCategory() {
        this.categoryService.getCategories().subscribe({
            next: (res) => {
                this.categories = res;
            },
            error: (err) => console.error(err)
        });
    }

    ngOnInit(): void {
        this.loadCategory();
    }

    deleteCategory(category: Category): void {
        const confirmed = confirm(`Delete category "${category.name}"?`);

        if (!confirmed) {
            return;
        }

        this.categoryService.deleteCategory(category.id).subscribe({
            next: () => {
                this.categories = this.categories.filter(
                    item => item.id !== category.id
                );
            },
            error: (err) => console.error(err)
        });
    }
}
