import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private api = 'http://localhost:3000/register';

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
        return this.http.get(`${this.api}?email=${email}`);
    }

    // LOGIN
    login(mobileNumber: string, password: string) {
        return this.http.get(
            `${this.api}?mobileNumber=${mobileNumber}&password=${password}`
        );
    }

    // GET CURRENT USER
    getCurrentUser() {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    }
}