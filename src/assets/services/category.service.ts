import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

export interface Category {
    id: string;
    name: string;
}

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    private apiUrl = 'http://localhost:5000/categories';

    constructor(private http: HttpClient) { }
    // Get All Category
    getCategories(): Observable<Category[]> {
        return this.http.get<Category[]>(this.apiUrl);
    }

    getCategoryById(id: string): Observable<Category> {
        return this.http.get<Category>(
            `${this.apiUrl}/${encodeURIComponent(id)}`
        );
    }

    // Add Category
    addCategory(category: Category) {
        return this.http.post<Category>(this.apiUrl, category);
    }

    updateCategory(id: string, category: Category): Observable<Category> {
        return this.http.put<Category>(
            `${this.apiUrl}/${encodeURIComponent(id)}`,
            category
        );
    }

    deleteCategory(id: string): Observable<any> {
        return this.http.delete(
            `${this.apiUrl}/${encodeURIComponent(id)}`
        );
    }
}
