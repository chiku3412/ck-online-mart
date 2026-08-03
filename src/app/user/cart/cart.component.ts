import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../services/cart.service';

@Component({
    selector: 'app-cart',
    standalone: true,
    imports: [FormsModule, CommonModule, RouterModule],
    templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit {
    cartItems:any[]=[];
    promoCode = '';
    promoApplied = false;
    promoMessage = '';
    discount = 0;
    subtotal = 0;

    constructor(
        private cartService: CartService
    ) {}

    loadCartItems() {
        this.cartService.cart$.subscribe(cart=>{
            this.cartItems = cart;
            this.subtotal = this.cartService.getTotal();
        });
    }

    // Remove Product From Cart
    removeItem(id: number): void {
        this.cartService.removeFromCart(id);
        this.loadCartItems();
    }

    // Update Quantity IN Cart
    updateQty(id: number, change: number): void {
        this.cartService.updateQuantity(id, change);
    }

    // Apply PromoCode
    applyPromo() {
        const code = this.promoCode.trim().toUpperCase();
        switch (code) {
            case 'SAVE10':
            this.discount = this.subtotal * 0.10;
            this.promoApplied = true;
            this.promoMessage = 'Promo code applied successfully!';
            break;

            case 'SAVE20':
            this.discount = this.subtotal * 0.20;
            this.promoApplied = true;
            this.promoMessage = '20% discount applied!';
            break;

            case 'WELCOME':
            this.discount = 500;
            this.promoApplied = true;
            this.promoMessage = '₹500 discount applied!';
            break;

            default:
            this.discount = 0;
            this.promoApplied = false;
            this.promoMessage = 'Invalid promo code.';
        }
    }

    // Clear Full Cart
    clearCart() {
        this.cartService.clearCart();
        this.loadCartItems();
    }

    // Total Calculation
    get total(): number {
        return this.subtotal + this.gst - this.discount;
    }

    // GST
    get gst(): number {
        return this.subtotal * 0.18;
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
