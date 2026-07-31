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
        this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
            const hideRoutes = ['/login', '/register'];
            this.hideLayout = hideRoutes.includes(this.router.url);

            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}
