import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
    selector: 'app-contact',
    standalone: true,
    imports: [MatFormFieldModule, MatInputModule],
    templateUrl: './contact.component.html'
})
export class ContactComponent {

}
