import { Component } from '@angular/core';
import { AppRoutingModule } from "../app-routing.module";
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-footer',
    standalone: true,
    imports: [CommonModule, AppRoutingModule],
    templateUrl: './footer.component.html'
})
export class FooterComponent {

}
