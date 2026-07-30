import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { ProductService } from '../services/product-service';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [CommonModule, RouterModule, MatFormFieldModule, MatInputModule, MatIconModule, MatSelectModule],
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
    @ViewChild('userMenu') userMenu!: ElementRef<HTMLElement>;
    sidebarOpen: boolean = false;
    isMegaOpen: boolean = false;
    isCategoryOpen: boolean = false;
    isUserMenuOpen: boolean = false;
    selectedCategory = 'all';
    activeTab = 0;
    categories: any[] = [];
    groupedProducts: any[] = [];
    isSticky = false;

    constructor (private productService: ProductService) {}

    loadCategories() {
        this.productService.getProducts().subscribe({
            next: (res) => {
                // All categories
                this.categories = [...new Set(res.map((item: any) => item.category))]
                    .map(category => ({ category }));

                // All grouped products
                const grouped = res.reduce((acc: any, product: any) => {
                    (acc[product.category] ??= []).push(product);
                    return acc;
                }, {});

                this.groupedProducts = Object.keys(grouped).map(category => ({
                    category,
                    products: grouped[category]
                }));
            },
            error: (err) => console.error(err)
        });
    }
    
    @HostListener('window:scroll')
    onWindowScroll() {
        this.isSticky = window.scrollY > 120; // Adjust this value to match the height of your top bar
    }

    selectCategory(index: number, event: MouseEvent) {
        event.stopPropagation();
        this.activeTab = index;
    }
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

    ngOnInit(): void {
        this.loadCategories();
    }
}
