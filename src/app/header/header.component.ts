import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
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
    selectedCategory = 'all';

    @ViewChild('userMenu') userMenu!: ElementRef<HTMLElement>;


    categories = [
        { value:'all', viewValue: 'All Categories' },    
        { value:'electronics', viewValue: 'Electronics' },    
        { value:'grocery', viewValue: 'Grocery' },    
        { value:'fashion', viewValue: 'Fashion' },    
        { value:'clothing', viewValue: 'Clothing' },    
        { value:'food', viewValue: 'Food' }    
    ]

    openNavigation() {
        this.sidebarOpen = !this.sidebarOpen;
    }
    toggleMegaMenu(event: MouseEvent): void {
        event.stopPropagation();
        this.isMegaOpen = !this.isMegaOpen;
        this.isUserMenuOpen = false;
        this.isCategoryOpen = false;
    }
    toggleCategoryMenu(event: MouseEvent): void {
        event.stopPropagation();
        this.isCategoryOpen = !this.isCategoryOpen;
        this.isUserMenuOpen = false;
        this.isMegaOpen = false;
    }
    toggleUserMenu(event: MouseEvent): void {
        event.stopPropagation();
        this.isUserMenuOpen = !this.isUserMenuOpen;
        this.isMegaOpen = false;
        this.isCategoryOpen = false;
    }

    @HostListener('document:click')
    closeAllMenus(): void {
        this.isUserMenuOpen = false;
        this.isMegaOpen = false;
        this.isCategoryOpen = false;
    }
}
