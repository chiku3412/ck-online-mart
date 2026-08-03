import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [MatFormFieldModule, MatInputModule, MatIconModule, CommonModule, RouterModule, ReactiveFormsModule],
    templateUrl: './register.component.html'
})
export class RegisterComponent {
    hidePassword = true;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService
    ) { }

    registerForm = this.fb.group({
        fullName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        mobileNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        terms: [false, Validators.requiredTrue]
    })

    register() {
        if (this.registerForm.invalid) {
            this.registerForm.markAllAsTouched();
            return;
        }

        this.authService.getUserByEmail(this.registerForm.value.email!).subscribe((users: any) => {

            if (users.length > 0) {
                alert('Email already exists');
                return;
            }

            const user = {
                ...this.registerForm.value,
                createdAt: new Date()
            };

            this.authService.register(user).subscribe({
                next: () => {
                    alert('Registration Successful');
                    this.registerForm.reset();
                },
                error: () => {
                    alert('Something went wrong');
                }
            });

        });
    }
}
