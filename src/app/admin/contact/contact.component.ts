import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/assets/services/contact.service';

@Component({
    selector: 'app-contact',
    standalone: true,
    imports: [],
    templateUrl: './contact.component.html'
})
export class ContactComponent implements OnInit {
    contacts: any[] = [];
    
    constructor(
        private contactService: ContactService
    ) {}

    loadContactData() {
        this.contactService.getContacts().subscribe({
            next: (res) => {
                this.contacts = res;
            },
            error: (err) => {
                console.log(err);
            }
        });
    }

    ngOnInit(): void {
        this.loadContactData();
    }
}
