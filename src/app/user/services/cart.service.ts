import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CartService {
    private cartItems: any[] = [];
    private cartSubject = new BehaviorSubject<any[]>([]);
    cart$ = this.cartSubject.asObservable();

    constructor() {
        const data = localStorage.getItem('cart');

        if (data) {
            this.cartItems = JSON.parse(data);
            this.cartSubject.next(this.cartItems);
        }
    }

    getCartItems(): any[] {
        return this.cartItems;
    }

    addToCart(product: any) {
        const existing = this.cartItems.find(x => x.id === product.id);

        if (existing) {
            existing.quantity++;
        } else {
            this.cartItems.push({
                ...product,
                quantity: 1
            });
        }
        this.saveCart();
    }

    removeFromCart(id: number): void {
        this.cartItems = this.cartItems.filter(item => item.id !== id);
        this.saveCart();
    }

    updateQuantity(id: number, change: number): void {
        const item = this.cartItems.find(p => p.id === id);
        if (item) {
            item.quantity += change;
            if (item.quantity < 1) {
                item.quantity = 1;
            }
            this.saveCart();
        }
    }

    clearCart(): void {
        this.cartItems = [];
        this.saveCart();
    }

    getCart(): any[] {
        return this.cartItems;
    }

    getTotal(): number {
        return this.cartItems.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );
    }

    getCartCount(): number {
        return this.cartItems.reduce(
            (sum, item) => sum + item.quantity,
            0
        );
    }

    private saveCart(): void {
        localStorage.setItem('cart', JSON.stringify(this.cartItems));
        this.cartSubject.next([...this.cartItems]); // emit a new array reference
    }
}