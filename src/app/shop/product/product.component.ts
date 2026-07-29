import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product-service';

@Component({
    selector: 'app-product',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './product.component.html'
})
export class ProductComponent implements OnInit {
    products: any[] = [];
    Math = Math;

    constructor(private productService: ProductService) {}

    loadProducts(): void {
        this.productService.getProducts().subscribe({
            next: (res) => {
                this.products = res;
                console.log(this.products);
            },
            error: (err) => {
                console.error(err);
            }
        });
    }

    ngOnInit(): void {
        this.loadProducts();
    }

}
