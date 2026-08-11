import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class WishlistService {

    private wishlist: any[] = [];
    private wishlistSubject = new BehaviorSubject<any[]>([]);
    wishlist$ = this.wishlistSubject.asObservable();

    constructor() {
        const data = localStorage.getItem('wishlist');

        if (data) {
            this.wishlist = JSON.parse(data);
            this.wishlistSubject.next(this.wishlist);
        }
    }

    toggleWishlist(product: any): void {
        const index = this.wishlist.findIndex(x => x.id === product.id);

        if (index > -1) {
            // Remove
            this.wishlist.splice(index, 1);
        } else {
            // Add
            this.wishlist.push(product);
        }

        this.saveWishlist();
    }

    isInWishlist(id: string | number): boolean {
        return this.wishlist.some(x => String(x.id) === String(id));
    }

    getWishlist(): any[] {
        return this.wishlist;
    }

    private saveWishlist(): void {
        localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
        this.wishlistSubject.next([...this.wishlist]);
    }
}