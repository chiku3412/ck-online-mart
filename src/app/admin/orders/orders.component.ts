import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/assets/services/order.service';

@Component({
    selector: 'app-orders',
    standalone: true,
    imports: [],
    templateUrl: './orders.component.html'
})
export class OrdersComponent implements OnInit {
    orders: any[] = [];

    constructor(
        private orderService: OrderService
    ) {}

    loadOrders(): void {
        this.orderService.getOrders().subscribe({
            next: (res) => {
                this.orders = res;
            },
            error: (err) => {
                console.log(err);
            }
        });
    }

    ngOnInit(): void {
        this.loadOrders();
    }
}
