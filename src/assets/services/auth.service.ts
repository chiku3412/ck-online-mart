import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private api = 'http://localhost:5000/user';

    constructor(private http: HttpClient) { }

    // USER REGISTER
    register(user: any) {
        return this.http.post(this.api, user);
    }

    // GET ALL USERS
    getUsers() {
        return this.http.get(this.api);
    }

    // GET USER BY EMAIL FOR CHECKING IF EMAIL ALREADY EXISTS
    getUserByEmail(email: string) {
        return this.http.get(`${this.api}?email=${encodeURIComponent(email)}`);
    }

    // LOGIN
    login(mobileNumber: string, password: string) {
        return this.http.get(
            `${this.api}?mobileNumber=${encodeURIComponent(mobileNumber)}&password=${encodeURIComponent(password)}`
        );
    }

    // GET CURRENT USER
    getCurrentUser() {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    }
}
