import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from 'src/app/services/product-service';

@Component({
    selector: 'app-product-filter',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './product-filter.component.html'
})
export class ProductFilterComponent implements OnInit {
    categories: any[] = [];
    minPrice = 0;
    maxPrice = 10000;
    selectedMinPrice = 2000;
    selectedMaxPrice = 7000;

    constructor(
        private productService: ProductService
    ) {}

    get rangeLeft(): number {
        return (this.selectedMinPrice / this.maxPrice) * 100;
    }

    get rangeWidth(): number {
        return ((this.selectedMaxPrice - this.selectedMinPrice) / this.maxPrice) * 100;
    }

    onMinChange() {
        if (this.selectedMinPrice > this.selectedMaxPrice) {
            this.selectedMinPrice = this.selectedMaxPrice;
        }
    }

    onMaxChange() {
        if (this.selectedMaxPrice < this.selectedMinPrice) {
            this.selectedMaxPrice = this.selectedMinPrice;
        }
    }

    loadCategories() {
        this.productService.getProducts().subscribe({
            next: (res) => {

            const grouped = res.reduce((acc: any, item: any) => {
                if (!acc[item.category]) {
                acc[item.category] = [];
                }
                acc[item.category].push(item);
                return acc;
            }, {});

            this.categories = Object.keys(grouped).map(category => ({
                category,
                total: grouped[category].length
            }));
            },
            error: (err) => console.error(err)
        });
    }

    ngOnInit(): void {
        this.loadCategories();
    }
}
