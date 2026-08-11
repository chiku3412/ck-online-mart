import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { ProductComponent } from '../product/product.component';
import {
    ProductService,
    Product
} from 'src/assets/services/product-service';

import { CartService } from 'src/assets/services/cart.service';
import { WishlistService } from 'src/assets/services/wishlist.service';

@Component({
    selector: 'app-product-details',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        MatFormFieldModule,
        MatSelectModule,
        ProductComponent
    ],
    templateUrl: './product-details.component.html'
})
export class ProductDetailsComponent implements OnInit {

    product: Product | null = null;
    images: string[] = [];
    currentIndex = 0;
    showToast = false;
    relatedProducts: Product[] = [];
    Math = Math;
    ratingBreakdown = [
        { star: 5, percent: 78 },
        { star: 4, percent: 14 },
        { star: 3, percent: 5 },
        { star: 2, percent: 2 },
        { star: 1, percent: 1 }
    ];

    constructor(
        private productService: ProductService,
        private route: ActivatedRoute,
        private cartService: CartService,
        private router: Router,
        private wishlistService: WishlistService
    ) { }

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            // Angular route params are ALWAYS strings
            const id: string | null = params.get('id');
            if (!id) {
                console.error('Product ID is missing');
                return;
            }
            // id is definitely string here
            this.productService.getProductById(id).subscribe({
                next: (product: Product) => {
                    this.product = product;
                    if (product.images && product.images.length > 0) {
                        this.images = product.images;
                    } else if (product.image) {
                        this.images = [product.image];
                    } else {
                        this.images = [];
                    }
                    this.currentIndex = 0;
                    this.loadRelatedProducts();
                },
                error: (error) => {
                    console.error('Error loading product:', error);
                }
            });
        });
    }

    loadRelatedProducts(): void {
        if (!this.product) {
            return;
        }
        this.productService
        .getRelatedProducts(this.product.category, this.product.id)
        .subscribe({
            next: (products) => {
                this.relatedProducts = products;
            },
            error: (error) => {
                console.error('Related products error:', error);
            }
        });
    }

    get currentImage(): string {
        return this.images[this.currentIndex] || '';
    }

    setImage(index: number): void {
        this.currentIndex = index;
    }

    prevImage(): void {
        if (this.images.length === 0) {
            return;
        }
        this.currentIndex = this.currentIndex > 0 ? this.currentIndex - 1 : this.images.length - 1;
    }

    nextImage(): void {
        if (this.images.length === 0) {
            return;
        }
        this.currentIndex = this.currentIndex < this.images.length - 1 ? this.currentIndex + 1 : 0;
    }

    addToCart(): void {
        if (!this.product) {
            return;
        }
        this.cartService.addToCart(this.product);
        this.showToast = true;
        setTimeout(() => {
            this.showToast = false;
            this.router.navigate(['/cart']);
        }, 2000);
    }
    toggleWishlist(product: Product): void {
        this.wishlistService.toggleWishlist(product);
    }
    isWishlist(product: Product): boolean {
        return this.wishlistService.isInWishlist(product.id);
    }
}