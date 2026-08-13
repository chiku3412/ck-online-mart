import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CartService } from 'src/assets/services/cart.service';

@Component({
    selector: 'app-cart',
    standalone: true,
    imports: [FormsModule, CommonModule, RouterModule],
    templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit {
    cartItems: any[] = [];
    subtotal = 0;

    constructor(
        private cartService: CartService,
        private router: Router
    ) {}

    loadCartItems(): void {
        this.cartService.cart$.subscribe(cart => {
            this.cartItems = cart;
            this.subtotal = this.cartService.getTotal();
        });
    }

    // Remove Product From Cart
    removeItem(id: string | number): void {
        this.cartService.removeFromCart(id);
    }

    // Update Quantity IN Cart
    updateQty(id: string | number, change: number): void {
        this.cartService.updateQuantity(id, change);
    }

    // Clear Full Cart
    clearCart(): void {
        this.cartService.clearCart();
    }

    // Total Calculation
    get total(): number {
        return this.subtotal + this.gst;
    }

    // GST
    get gst(): number {
        return this.subtotal * 0.18;
    }

    // Product Checkout
    checkout() {
        const user = localStorage.getItem('user'); // or token
        if (user) {
            this.router.navigate(['/checkout']);
        } else {
            this.router.navigate(['/login']);
        }
    }

    // get subtotal(): number {
    //     return this.cartItems.reduce(
    //         (total, item) => total + item.price * item.quantity,
    //         0
    //     );
    // }

    ngOnInit(): void {
        this.loadCartItems();
    }
}
