import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Blog {
    id: string;
    title: string;
    otherTitle: string;
    blockQuote: string;
    category: string;
    author: string;
    content: string;
    contentOne: string;
    shortDescription: string;
    readingTime: string;
    featuredImage: string;
}

@Injectable({
    providedIn: 'root'
})
export class BlogService {

    private apiUrl = 'http://localhost:5000/blogs';

    constructor(private http: HttpClient) {}

    // Add Blog
    addBlog(formData: FormData) {
        return this.http.post(this.apiUrl, formData);
    }

    // Get Blog Data
    getBlogs() {
        return this.http.get<any[]>(this.apiUrl);
    }

    getBlogById(id: string): Observable<Blog> {
        return this.http.get<Blog>(
            `${this.apiUrl}/${encodeURIComponent(id)}`
        );
    }

    updateBlog(id: string, formData: FormData) {
        return this.http.put(
            `${this.apiUrl}/${encodeURIComponent(id)}`,
            formData
        );
    }

    deleteBlog(id: string): Observable<any> {
        return this.http.delete(
            `${this.apiUrl}/${encodeURIComponent(id)}`
        );
    }
}