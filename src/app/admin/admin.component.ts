import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { SideBarComponent } from "./side-bar/side-bar.component";

@Component({
	selector: 'app-admin',
	standalone: true,
	imports: [RouterModule, AdminHeaderComponent, SideBarComponent],
	templateUrl: './admin.component.html'
})
export class AdminComponent {
	isSidebarOpen = false;
	
	// Sidebar Toggle
	toggleSidebar(): void {
		if (window.innerWidth >= 1024) {
			return;
		}
		this.isSidebarOpen = !this.isSidebarOpen;
	}
}
