import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductService } from 'src/app/services/product-service';

@Component({
    selector: 'app-product',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './product.component.html'
})
export class ProductComponent implements OnInit {
    @Input() limit: number | null = null;
    @Input() showSeeMore = false;
    @Input() gridCols = 4;
    products: any[] = [];
    Math = Math;

    constructor(private productService: ProductService) {}

    loadProducts(): void {
        this.productService.getProducts().subscribe({
            next: (res) => {
                this.products = res;
            },
            error: (err) => {
                console.error(err);
            }
        });
    }

    get displayProducts() {
        return this.limit ? this.products.slice(0, this.limit) : this.products;
    }

    ngOnInit(): void {
        this.loadProducts();
    }

}
