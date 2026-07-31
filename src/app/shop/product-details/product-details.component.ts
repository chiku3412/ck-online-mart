import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductService } from 'src/app/services/product-service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from '@angular/material/select';
import { CartService } from 'src/app/services/cart.service';

@Component({
    selector: 'app-product-details',
    standalone: true,
    imports: [CommonModule, RouterModule, MatFormFieldModule, MatSelectModule],
    templateUrl: './product-details.component.html'
})
export class ProductDetailsComponent implements OnInit {
    product: any;
    images: string[] = [];
    currentIndex = 0;
    showToast = false;
    relatedProducts: any[] = [];
    Math = Math;
    ratingBreakdown = [
        { star: 5, percent: 78 },
        { star: 4, percent: 14 },
        { star: 3, percent: 5 },
        { star: 2, percent: 2 },    
        { star: 1, percent: 1 }
    ];

    constructor(
        private productService : ProductService,
        private route: ActivatedRoute,
        private cartService: CartService,
        private router: Router
    ) {}

    loadRelatedProducts() {
        this.productService.getRelatedProducts(this.product.category, this.product.id).subscribe(products => {
            this.relatedProducts = products;
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
        this.cartService.addToCart(this.product);
        this.showToast = true;

        setTimeout(() => {
            this.showToast = false;
            this.router.navigate(['/cart']);
        }, 2000);
    }

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            const id = Number(params.get('id'));
            this.productService.getProductById(id).subscribe(product => {
            if (!product) return;
                this.product = product;
                this.images = product.images ?? [product.image];
                this.currentIndex = 0;

                this.loadRelatedProducts();
            });
        });
    }
}
