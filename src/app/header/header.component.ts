import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AppRoutingModule } from "../app-routing.module";

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [CommonModule, AppRoutingModule],
    templateUrl: './header.component.html'
})
export class HeaderComponent {
    activeTab: string = 'tab1';
}
