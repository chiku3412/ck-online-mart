import { Routes } from "@angular/router";

export const shopRoutes: Routes  = [
    {
        path: "",
        redirectTo: 'active',
        pathMatch: 'full'
    },
    {
        path: '',
        loadComponent: () => import('./shop.component').then((m) => m.ShopComponent),
        children: [
            {
                path: 'product',
                loadComponent: () => import('./product/product.component').then((m) => m.ProductComponent)
            },
            {
                path: 'product-details',
                loadComponent: () => import('./product-details/product-details.component').then((m) => m.ProductDetailsComponent)
            },
        ]
    },
]
