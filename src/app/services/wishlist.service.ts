import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class WishlistService {

    private wishlistItems: any[] = [];
    private wishlistSubject = new BehaviorSubject<any[]>([]);

    wishlist$ = this.wishlistSubject.asObservable();

    constructor() {
        const data = localStorage.getItem('wishlist');

        if (data) {
            this.wishlistItems = JSON.parse(data);
            this.wishlistSubject.next(this.wishlistItems);
        }
    }

    addToWishlist(product: any): void {
        const exists = this.wishlistItems.find(x => x.id === product.id);

        if (!exists) {
            this.wishlistItems.push(product);
            this.saveWishlist();
        }
    }

    removeFromWishlist(id: number): void {
        this.wishlistItems = this.wishlistItems.filter(x => x.id !== id);
        this.saveWishlist();
    }

    clearWishlist(): void {
        this.wishlistItems = [];
        this.saveWishlist();
    }

    getWishlist() {
        return this.wishlistItems;
    }

    getWishlistCount(): number {
        return this.wishlistItems.length;
    }

    isInWishlist(id: number): boolean {
        return this.wishlistItems.some(x => x.id === id);
    }

    toggleWishlist(product: any): void {
        if (this.isInWishlist(product.id)) {
            this.removeFromWishlist(product.id);
        } else {
            this.addToWishlist(product);
        }
    }

    private saveWishlist(): void {
        localStorage.setItem('wishlist', JSON.stringify(this.wishlistItems));
        this.wishlistSubject.next([...this.wishlistItems]);
    }
}