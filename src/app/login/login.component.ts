import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [MatFormFieldModule, MatInputModule, MatIconModule, RouterModule],
    templateUrl: './login.component.html'
})
export class LoginComponent {
    hidePassword = true;
}
