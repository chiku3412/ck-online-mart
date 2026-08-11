import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface Product {
    id: string;
    productId: string;
    name: string;
    category: string;
    image: string;
    images: string[];
    price: number;
    oldPrice: number;
    rating: number;
    description: string;
    stock?: number;
}

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    private apiUrl = 'http://localhost:5000/products';

    constructor(private http: HttpClient) { }

    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(this.apiUrl);
    }

    // IMPORTANT: id is string
    getProductById(id: string): Observable<Product> {
        return this.getProducts().pipe(
            map(products => {
                const product = products.find(
                    product =>
                        String(product.id) === id ||
                        String(product.productId) === id
                );

                if (!product) {
                    throw new Error(`Product not found: ${id}`);
                }

                return product;
            })
        );
    }

    addProducts(formData: FormData): Observable<any> {
        return this.http.post(this.apiUrl, formData);
    }

    updateProduct(id: string, formData: FormData): Observable<any> {
        return this.http.put(
            `${this.apiUrl}/${encodeURIComponent(id)}`,
            formData
        );
    }

    deleteProduct(id: string): Observable<any> {
        return this.http.delete(
            `${this.apiUrl}/${encodeURIComponent(id)}`
        );
    }

    getRelatedProducts(
        category: string,
        productId: string
    ): Observable<Product[]> {

        return this.getProducts().pipe(
            map(products =>
                products
                    .filter(product =>
                        product.category === category &&
                        String(product.id) !== String(productId)
                    )
                    .slice(0, 4)
            )
        );
    }
}
