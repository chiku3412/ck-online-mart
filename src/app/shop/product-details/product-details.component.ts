import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product-service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-product-details',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './product-details.component.html'
})
export class ProductDetailsComponent implements OnInit {
    product: any;
    images: string[] = [];
    currentIndex = 0;
    showToast = false;

    constructor(
        private productService : ProductService,
        private route: ActivatedRoute
    ) {}

    // Get All Products From JSON
    loadProducts(): void {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        this.productService.getProductById(id).subscribe(product => {
            if (!product) {
                return;
            }

            this.product = product;
            this.images = product.images ?? [product.image];
            this.currentIndex = 0;
        });
    }

    get currentImage(): string {
        return this.images[this.currentIndex];
    }

    setImage(index: number): void {
        this.currentIndex = index;
    }

    // Prev Image Slide
    prevImage(): void {
        this.currentIndex = this.currentIndex > 0 ? this.currentIndex - 1 : this.images.length - 1;
    }

    // Next Image Slide
    nextImage(): void {
        this.currentIndex = this.currentIndex < this.images.length - 1 ? this.currentIndex + 1 : 0;
    }

    // Add To Cart
    addToCart(): void {
        this.showToast = true;

        setTimeout(() => {
            this.showToast = false;
        }, 2000);
    }

    ngOnInit(): void {
        this.loadProducts();
    }
}
