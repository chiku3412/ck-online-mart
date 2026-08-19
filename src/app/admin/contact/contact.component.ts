import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { ContactService } from 'src/assets/services/contact.service';

@Component({
    selector: 'app-contact',
    standalone: true,
    imports: [MatTableModule],
    templateUrl: './contact.component.html'
})
export class ContactComponent implements OnInit {
    contacts: any[] = [];
    displayedColumns: string[] = ['id', 'name', 'email', 'subject', 'message', 'action'];
    
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
