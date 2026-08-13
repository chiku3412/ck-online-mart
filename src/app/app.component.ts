import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { every, filter } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent {
    title = 'online-mart';
    hideLayout = true;

    constructor(private router: Router) {

    this.router.events
        .pipe(
            filter(event => event instanceof NavigationEnd)
        )
        .subscribe(() => {
            const hideRoutes = [
                '/login',
                '/register',
                // Admin
                '/admin',
                '/admin/dashboard',
                '/admin/products',
                '/admin/products/add-product',
                '/admin/categories',
                '/admin/categories/add-category',
                '/admin/orders',
                '/admin/users',
                '/admin/contact'
            ];
            const currentUrl = this.router.url;
            this.hideLayout = hideRoutes.includes(currentUrl) || currentUrl.startsWith('/admin/products/edit-product/') || currentUrl.startsWith('/admin/categories/edit-category/');
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}
