import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

export interface Product {
    id: number;
    name: string;
    category: string;
    image: string;
    images?: string[];
    price: number;
    oldPrice: number;
    rating: number;
    description: string;
}

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    constructor(private http: HttpClient) { }

    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>('assets/data/products.json');
    }

    getProductById(id: number) {
        return this.getProducts().pipe(
            map(products => products.find(product => product.id === id))
        );
    }
}