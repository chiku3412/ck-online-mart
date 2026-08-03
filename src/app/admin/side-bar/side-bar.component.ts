import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-side-bar',
    standalone: true,
    imports: [RouterModule],
    templateUrl: './side-bar.component.html'
})
export class SideBarComponent {
    @Input() isSidebarOpen = false;
    @Output() sidebarToggle = new EventEmitter<void>();

    // Sidebar Toggle
	toggleSidebar(): void {
		this.sidebarToggle.emit();
	}

    // Window Resize
	@HostListener('window:resize', ['$event'])
	onResize(event: UIEvent): void {
		if (window.innerWidth >= 1024) {
			this.isSidebarOpen = false;
		}
	}

    sideBarLinks = [
        { icons: 'fa-solid fa-grid-2', name: 'Dashboard', route: '/admin/dashboard' },
        { icons: 'fa-solid fa-tags', name: 'Categories', route: '/admin/categories' },
        { icons: 'fa-solid fa-box', name: 'Products', route: '/admin/products' },
        { icons: 'fa-solid fa-shopping-cart', name: 'Orders', route: '/admin/orders' }
    ]
}
