import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ContactService } from 'src/assets/services/contact.service';

@Component({
    selector: 'app-contact',
    standalone: true,
    imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, FormsModule],
    templateUrl: './contact.component.html'
})
export class ContactComponent {
    contactForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private contactService: ContactService
    ) {
        this.contactForm = this.fb.group({
            name: ['', Validators.required],
            email: ['', Validators.required],
            subject: ['', Validators.required],
            message: ['', Validators.required]
        })
    }

    submitForm(): void {
        if (this.contactForm.invalid) {
            this.contactForm.markAllAsTouched();
            return;
        }

        this.contactService
            .submitContact(this.contactForm.value)
            .subscribe({
            next: (res) => {
                // Reset Form
                this.contactForm.reset();
                // Remove validation errors
                Object.keys(this.contactForm.controls).forEach(key => {
                    this.contactForm.get(key)?.setErrors(null);
                    this.contactForm.get(key)?.markAsPristine();
                    this.contactForm.get(key)?.markAsUntouched();
                });
                alert('Message submitted successfully');
            },
            error: (err) => {
                console.error(err);
            }
        });
    }
}
