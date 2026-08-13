import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/assets/services/category.service';
import { OrderService } from 'src/assets/services/order.service';
import { ProductService } from 'src/assets/services/product-service';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [],
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
    totalOrders = 0;
    totalIncome = 0;
    totalCategories = 0;
    totalProducts = 0;

    constructor(
        private orderService: OrderService,
        private productService: ProductService,
        private categoryService: CategoryService
    ) {}

    loadDashboardData(): void {
        // Orders
        this.orderService.getOrders().subscribe((orders: any[]) => {
            this.totalOrders = orders.length;

            this.totalIncome = orders.reduce(
            (sum, order) => sum + Number(order.totalAmount || 0),
            0
            );
        });

        // Products
        this.productService.getProducts().subscribe((products: any[]) => {
            this.totalProducts = products.length;
        });

        // Categories
        this.categoryService.getCategories().subscribe((categories: any[]) => {
            this.totalCategories = categories.length;
        });
    }

    ngOnInit(): void {
        this.loadDashboardData()
    }
}
