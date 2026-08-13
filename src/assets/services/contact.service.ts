import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ContactService {

    private apiUrl = 'http://localhost:5000/contact';

    constructor(private http: HttpClient) { }

    // Submit Contact Data
    submitContact(data: any) {
        return this.http.post(this.apiUrl, data);
    }

    // Get Contact Data
    getContacts() {
        return this.http.get<any[]>(
            'http://localhost:5000/contact'
        );
    }
}