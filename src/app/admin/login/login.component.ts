import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [MatFormFieldModule, MatInputModule, MatIconModule, ReactiveFormsModule],
    templateUrl: './login.component.html'
})
export class LoginComponent {
    hidePassword = true;

    loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]]
    })

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private http: HttpClient
    ) {}


     login() {
        if (this.loginForm.invalid) {
            this.loginForm.markAllAsTouched();
            return;
        }
        this.http.get<any[]>('assets/data/adminUser.json').subscribe(users => {
            const user = users.find(u =>
                u.email === this.loginForm.value.email &&
                u.password === this.loginForm.value.password
            );
            if (user) {
                localStorage.setItem('user', JSON.stringify(user));
                alert('Login Successful');
                this.router.navigate(['admin/dashboard']);
            } else {
                alert('Invalid Email or Password');
            }
        });
    }
}
