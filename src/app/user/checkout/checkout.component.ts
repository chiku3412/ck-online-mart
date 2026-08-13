import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { CartService } from 'src/assets/services/cart.service';
import { OrderService } from 'src/assets/services/order.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-checkout',
    standalone: true,
    imports: [MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule, ReactiveFormsModule],
    templateUrl: './checkout.component.html'
})
export class CheckoutComponent implements OnInit {
    checkoutForm: FormGroup;
    cartItem: any[] = [];
    subtotal: number = 0;
    shipping: number = 0;
    tax: number = 0;
    discount: number = 0;
    totalAmount: number = 0;
    promoCode = '';
    promoApplied = false;
    promoMessage = '';
    promoCodeApplied: string = '';
    totalProducts: number = 0;

    constructor(
        private fb: FormBuilder,
        private cartService: CartService,
        private orderService: OrderService,
        private router: Router
    ) {
        this.checkoutForm = this.fb.group({
            country: ['india', Validators.required],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            address: ['', Validators.required],
            city: ['', Validators.required],
            postalCode: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
            phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
            email: ['', [Validators.required, Validators.email]],
        })
    }

    // Apply PromoCode
    applyPromo() {
        const code = this.promoCode.trim().toUpperCase();
        switch (code) {
            case 'SAVE10':
            this.discount = this.subtotal * 0.10;
            this.promoCodeApplied = code;
            this.promoApplied = true;
            this.promoMessage = 'Promo code applied successfully!';
            break;

            case 'SAVE20':
            this.discount = this.subtotal * 0.20;
            this.promoCodeApplied = code;
            this.promoApplied = true;
            this.promoMessage = '20% discount applied!';
            break;

            case 'WELCOME':
            this.discount = 500;
            this.promoCodeApplied = code;
            this.promoApplied = true;
            this.promoMessage = '₹500 discount applied!';
            break;

            default:
            this.discount = 0;
            this.promoCodeApplied = '';
            this.promoApplied = false;
            this.promoMessage = 'Invalid promo code.';
        }
    }

    // Total Calculator
    calculateTotal(): void {
        this.subtotal = this.cartService.getTotal();
        // Free shipping above ₹500
        // this.shipping = this.subtotal >= 500 ? 0 : 50;
        // 18% Tax
        this.tax = this.subtotal * 0.18;
        this.totalAmount = this.subtotal + this.tax - this.discount;
    }

    // Place Order
    placeOrder(): void {
        if (this.checkoutForm.invalid) {
            this.checkoutForm.markAllAsTouched();
            return;
        }

        const orderData = {
            orderId: `ORD-${Date.now()}`,
            customer: this.checkoutForm.value,
            items: this.cartItem.map(item => ({
                productId: item.productId,
                productName: item.name,
                quantity: item.quantity
            })),
            subtotal: this.subtotal,
            shipping: this.shipping,
            tax: this.tax,
            discount: this.discount,
            promoCode: this.promoCodeApplied,
            totalAmount: this.totalAmount,
            orderDate: new Date().toISOString(),
            status: 'Pending'
        };

        console.log(orderData);

        // Send to API
        this.orderService.placeOrder(orderData).subscribe({
            next: (res) => {
            console.log('Order placed successfully', res);

            this.cartService.clearCart();

            this.router.navigate(['/order-success']);
            },
            error: (err) => {
            console.error(err);
            }
        });
    }

    ngOnInit(): void {
        this.cartItem = this.cartService.getCartItems();
        this.totalProducts = this.cartService.getCartCount();
        this.calculateTotal();
    }
}
