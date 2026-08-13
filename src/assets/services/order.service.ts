import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    private apiUrl = 'http://localhost:5000/orders';
    constructor(private http: HttpClient) { }

    // Place Order
    placeOrder(order: any) {
        return this.http.post(this.apiUrl, order);
    }

    // Get Order
    getOrders() {
        return this.http.get<any[]>(this.apiUrl);
    }
}