import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Component({
    selector: 'app-admin-header',
    standalone: true,
    imports: [],
    templateUrl: './admin-header.component.html'
})
export class AdminHeaderComponent {
  	activeDropdown: string | null = null;
    @Output() menuClick = new EventEmitter<void>();

	// Sidebar Toggle
	toggleSidebar(): void {
        this.menuClick.emit();
	}


	// Dropdown Toggle
	toggleDropdown(id: string): void {
		this.activeDropdown = this.activeDropdown === id ? null : id;
	}

	// Close dropdown when clicking outside
	@HostListener('document:click', ['$event'])
	onDocumentClick(event: MouseEvent): void {
		const target = event.target as HTMLElement;
		if (!target.closest('.dropdown-container')) {
			this.activeDropdown = null;
		}
	}
}
