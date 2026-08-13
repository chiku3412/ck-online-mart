import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-footer',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {
    isLogin = false;

    ngOnInit(): void {
        this.isLogin = !localStorage.getItem('user');
    }
}
