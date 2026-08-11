import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Category, CategoryService } from 'src/assets/services/category.service';

@Component({
    selector: 'app-add-category',
    standalone: true,
    imports: [
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatIconModule,
        RouterModule
    ],
    templateUrl: './add-category.component.html'
})
export class AddCategoryComponent implements OnInit {

    categoryName: string = '';
    categories: Category[] = [];
    isEditMode = false;
    categoryId = '';

    constructor(
        private categoryService: CategoryService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            const id = params.get('id');

            this.isEditMode = !!id;
            this.categoryId = id || '';
            this.loadCategories();
        });
    }

    loadCategories() {
        this.categoryService.getCategories().subscribe({
            next: (res) => {
                this.categories = res;
                if (this.isEditMode) {
                    const category = this.categories.find(
                        item => item.id === this.categoryId
                    );
                    this.categoryName = category?.name || '';
                }
            },
            error: (err) => {
                console.log(err);
            }
        });
    }

    generateCategoryId(): string {
        if (this.categories.length === 0) {
            return '#CAT101';
        }
        const maxId = Math.max(
            ...this.categories.map(category =>
                Number(category.id.replace('#CAT', ''))
            )
        );
        return `#CAT${maxId + 1}`;
    }

    onSubmit() {
        if (!this.categoryName.trim()) {
            return;
        }
        const category: Category = {
            id: this.isEditMode ? this.categoryId : this.generateCategoryId(),
            name: this.categoryName.trim()
        };

        if (this.isEditMode) {
            this.categoryService.updateCategory(this.categoryId, category).subscribe({
                next: () => {
                    alert('Category Updated Successfully');
                    this.router.navigate(['/admin/categories']);
                },
                error: (err) => {
                    console.log(err);
                }
            });

            return;
        }

        this.categoryService.addCategory(category).subscribe({
            next: () => {
                alert('Category Added Successfully');
                this.categoryName = '';
                this.router.navigate(['/admin/categories']);
            },
            error: (err) => {
                console.log(err);
            }
        });

    }

}
