import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../services/wishlist.service';
import { ProductComponent } from "../shop/product/product.component";

@Component({
    selector: 'app-wish-list',
    standalone: true,
    imports: [ProductComponent],
    templateUrl: './wish-list.component.html'
})
export class WishListComponent implements OnInit {
    wishlistItems: any[] = [];

    constructor(
        private wishlistService: WishlistService
    ) {}

    ngOnInit(): void {
        this.wishlistService.wishlist$.subscribe(items => {
            this.wishlistItems = items;
        });
    }
}
