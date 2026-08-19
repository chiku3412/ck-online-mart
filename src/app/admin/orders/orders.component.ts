import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { OrderService } from 'src/assets/services/order.service';

@Component({
    selector: 'app-orders',
    standalone: true,
    imports: [CommonModule, MatTableModule],
    templateUrl: './orders.component.html'
})
export class OrdersComponent implements OnInit {
    orders: any[] = [];
    displayedColumns: string[] = [ 'order', 'customer', 'address', 'contact', 'product', 'amount', 'qty', 'totalProduct', 'status', 'action'];

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
