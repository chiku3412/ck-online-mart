import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [CommonModule, RouterModule, MatFormFieldModule, MatInputModule, MatIconModule, MatSelectModule],
    templateUrl: './header.component.html'
})
export class HeaderComponent {
    activeTab: string = 'tab1';
    sidebarOpen: boolean = false;
    isMegaOpen: boolean = false;
    isCategoryOpen: boolean = false;
    isUserMenuOpen: boolean = false;

    openNavigation() {
        this.sidebarOpen = !this.sidebarOpen;
    }
    toggleMegaMenu() {
        this.isMegaOpen = !this.isMegaOpen;
    }
    toggleCategoryMenu() {
        this.isCategoryOpen = !this.isCategoryOpen;
    }
    toggleUserMenu() {
        this.isUserMenuOpen = !this.isUserMenuOpen;
    }
}
