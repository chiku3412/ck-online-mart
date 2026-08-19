import { Component, OnInit } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { Category, CategoryService } from 'src/assets/services/category.service';

@Component({
    selector: 'app-category-list',
    standalone: true,
    imports: [RouterModule, MatMenuModule, MatTableModule],
    templateUrl: './category-list.component.html'
})
export class CategoryListComponent implements OnInit {
    categories: Category[] = [];
    dataSource = new MatTableDataSource<any>([]);
    displayedColumns: string[] = ['id', 'name', 'action'];
    constructor(
        private categoryService: CategoryService
    ) {}
    
    loadCategory() {
    this.categoryService.getCategories().subscribe({
        next: (response) => {
            this.categories = response;
        },
        error: (error) => {
            console.error('Error loading categories:', error);
        }
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
