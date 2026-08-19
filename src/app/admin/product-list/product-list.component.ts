import { Component, OnInit } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { Router, RouterModule } from '@angular/router';
import { Product, ProductService } from 'src/assets/services/product-service';

@Component({
    selector: 'app-product-list',
    standalone: true,
    imports: [RouterModule, MatMenuModule, MatTableModule],
    templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {
    products: Product[] = [];
    displayedColumns: string[] = ['productId', 'name', 'category', 'oldPrice', 'price', 'stock', 'action'];

    constructor(
        private productService: ProductService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.loadProducts();
    }

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

    // Delete Product
    deleteProduct(product: Product) {
        if (!product.id) {
            return;
        }
        const confirmDelete = confirm(
            `Are you sure you want to delete "${product.name}"?`
        );
        if (!confirmDelete) {
            return;
        }
        this.productService.deleteProduct(product.id).subscribe({
            next: () => {
                alert('Product deleted successfully');
                // Remove product from screen
                this.products = this.products.filter(
                    p => p.id !== product.id
                );
            },
            error: (err) => {
                console.error('Delete product error:', err);
            }
        });
    }
}