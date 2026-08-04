import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CartService } from 'src/assets/services/cart.service';
import { ProductService } from 'src/assets/services/product-service';
import { WishlistService } from 'src/assets/services/wishlist.service';
@Component({
    selector: 'app-product',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './product.component.html'
})
export class ProductComponent implements OnInit, OnChanges {

    @Input() limit: number | null = null;
    @Input() showSeeMore = false;
    @Input() gridCols = 4;
    @Input() customProducts: any[] = [];

    products: any[] = [];
    Math = Math;

    constructor(
        private productService: ProductService,
        private cartService: CartService,
        private router: Router,
        private wishlistService: WishlistService
    ) {}

    ngOnInit(): void {
        if (!this.customProducts.length) {
            this.loadProducts();
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['customProducts']) {
            this.products = [...this.customProducts];
        }
    }

    loadProducts(): void {
        this.productService.getProducts().subscribe({
            next: (res) => {
                this.products = res;
            },
            error: (err) => console.error(err)
        });
    }

    get displayProducts() {
        return this.limit
            ? this.products.slice(0, this.limit)
            : this.products;
    }

    addToCart(product: any) {
        this.cartService.addToCart(product);
        this.router.navigate(['/cart']);
    }

    toggleWishlist(product: any): void {
        this.wishlistService.toggleWishlist(product);
    }

    isWishlist(product: any): boolean {
        return this.wishlistService.isInWishlist(product.id);
    }
}