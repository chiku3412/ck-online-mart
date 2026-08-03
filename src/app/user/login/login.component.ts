import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [MatFormFieldModule, MatInputModule, MatIconModule, RouterModule, ReactiveFormsModule, CommonModule],
    templateUrl: './login.component.html'
})
export class LoginComponent {
    hidePassword = true;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) { }

    loginForm = this.fb.group({
        mobileNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        termsAccepted: [false, Validators.requiredTrue]
    })

    login() {
        if (this.loginForm.invalid) {
            this.loginForm.markAllAsTouched();
            return;
        }
        const { mobileNumber, password } = this.loginForm.value;

        this.authService.login(mobileNumber!, password!).subscribe((users: any) => {
            if (users.length === 0) {
                alert('Invalid Mobile Number or Password');
                return;
            }
            // Save logged-in user
            localStorage.setItem('user', JSON.stringify(users[0]));
            alert('Login Successful');
            this.router.navigate(['/home']);
        });
    }
}
