import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [MatFormFieldModule, MatInputModule, MatIconModule, CommonModule, RouterModule],
    templateUrl: './register.component.html'
})
export class RegisterComponent {
    hidePassword = true;
}
